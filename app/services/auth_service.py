import logging
import re

from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from werkzeug.security import check_password_hash, generate_password_hash

from app.database import db
from app.models.usuario import Usuario

log = logging.getLogger(__name__)

_CORREO = re.compile(r'^[\w.+-]+@[\w-]+(\.[\w-]+)+$')
_TELEFONO = re.compile(r'^[0-9+()\s-]{6,20}$')

PASSWORD_MIN = 8
PASSWORD_MAX = 128

# Hash de relleno: si el correo no existe igual se calcula un hash, para que el tiempo de
# respuesta no delate que correos tienen cuenta.
_HASH_RELLENO = generate_password_hash('relleno-para-igualar-tiempos')


class AuthError(Exception):
    """Error de validacion o de acceso, con un mensaje apto para mostrar al visitante."""


class AuthService:
    @staticmethod
    def registrar(nombre, correo, telefono, password):
        nombre = ' '.join((nombre or '').split())          # recorta y colapsa espacios
        correo = (correo or '').strip().lower()
        telefono = (telefono or '').strip()
        password = password or ''                           # la contrasena no se recorta

        if not nombre or not correo or not telefono or not password:
            raise AuthError('Completa tu nombre, correo, teléfono y contraseña.')
        if len(nombre) < 2 or len(nombre) > 150:
            raise AuthError('El nombre debe tener entre 2 y 150 caracteres.')
        if len(correo) > 255 or not _CORREO.match(correo):
            raise AuthError('Ingresa un correo electrónico válido.')
        digitos = re.sub(r'\D', '', telefono)
        if not _TELEFONO.match(telefono) or not 7 <= len(digitos) <= 15:
            raise AuthError('Ingresa un teléfono válido (7 a 15 dígitos; puedes usar +, espacios, guiones o paréntesis).')
        if len(password) < PASSWORD_MIN:
            raise AuthError(f'La contraseña debe tener al menos {PASSWORD_MIN} caracteres.')
        if len(password) > PASSWORD_MAX:
            raise AuthError(f'La contraseña no puede superar los {PASSWORD_MAX} caracteres.')

        ya_existe = 'Ya existe una cuenta con este correo. Inicia sesión.'
        try:
            if Usuario.query.filter_by(correo=correo).first():
                raise AuthError(ya_existe)
            usuario = Usuario(nombre=nombre, correo=correo, telefono=telefono)
            usuario.set_password(password)
            db.session.add(usuario)
            db.session.commit()
        except AuthError:
            raise
        except IntegrityError:
            # Otro registro con el mismo correo se colo entre la consulta y el INSERT.
            db.session.rollback()
            raise AuthError(ya_existe)
        except SQLAlchemyError:
            db.session.rollback()
            log.exception('No se pudo registrar al usuario')
            raise AuthError('No pudimos crear tu cuenta en este momento. Inténtalo de nuevo en unos minutos.')
        return usuario

    @staticmethod
    def autenticar(correo, password):
        correo = (correo or '').strip().lower()
        password = password or ''
        if not correo or not password:
            raise AuthError('Ingresa tu correo y tu contraseña.')

        try:
            usuario = Usuario.query.filter_by(correo=correo).first()
        except SQLAlchemyError:
            log.exception('No se pudo consultar al usuario para iniciar sesion')
            raise AuthError('No pudimos iniciar tu sesión en este momento. Inténtalo de nuevo en unos minutos.')

        if usuario is None:
            check_password_hash(_HASH_RELLENO, password)
            raise AuthError('Correo o contraseña incorrectos.')
        if not usuario.check_password(password):
            raise AuthError('Correo o contraseña incorrectos.')
        # Se avisa del bloqueo solo cuando la contrasena es correcta: asi no se revela a terceros
        # que correos tienen cuenta ni cuales estan bloqueados.
        if usuario.bloqueado:
            raise AuthError('Tu cuenta está bloqueada. Comunícate con la cooperativa YALPA para más información.')
        return usuario

    @staticmethod
    def obtener(usuario_id):
        return db.session.get(Usuario, usuario_id)
