import hmac
import logging
import secrets
from urllib.parse import urlsplit

from flask import Blueprint, flash, g, redirect, render_template, request, session, url_for
from sqlalchemy.exc import SQLAlchemyError

from app.services.auth_service import AuthError, AuthService

log = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)

SESSION_USER = 'user_id'
SESSION_CSRF = '_csrf'
_SIN_CARGAR = object()

# Rutas a las que nunca se vuelve tras autenticarse (evita rebotar entre login y registro).
_RUTAS_EXCLUIDAS = ('/login', '/registro', '/logout')


# ---------------------------------------------------------------------------
# Utilidades de sesion
# ---------------------------------------------------------------------------
def csrf_token():
    """Token CSRF de la sesion; se crea la primera vez que se pide."""
    token = session.get(SESSION_CSRF)
    if not token:
        token = secrets.token_urlsafe(32)
        session[SESSION_CSRF] = token
    return token


def _csrf_valido():
    esperado = session.get(SESSION_CSRF, '')
    recibido = request.form.get('csrf_token', '')
    return bool(esperado) and hmac.compare_digest(esperado, recibido)


def _destino_seguro(destino):
    """Devuelve `destino` solo si es una ruta interna del sitio (evita open redirect)."""
    if not destino or not destino.startswith('/') or destino.startswith('//') or '\\' in destino:
        return None
    partes = urlsplit(destino)
    if partes.scheme or partes.netloc or partes.path.startswith(_RUTAS_EXCLUIDAS):
        return None
    return destino


def iniciar_sesion(usuario):
    """Abre la sesion del usuario. `session.clear()` primero evita la fijacion de sesion."""
    session.clear()
    session[SESSION_USER] = usuario.id
    session.permanent = True        # la cookie dura PERMANENT_SESSION_LIFETIME, no solo hasta cerrar el navegador


def usuario_actual():
    """Usuario autenticado de esta peticion (o None). Se consulta una sola vez por peticion."""
    cacheado = getattr(g, '_usuario_actual', _SIN_CARGAR)
    if cacheado is not _SIN_CARGAR:
        return cacheado

    usuario = None
    usuario_id = session.get(SESSION_USER)
    if usuario_id is not None:
        try:
            usuario = AuthService.obtener(usuario_id)
            if usuario is not None and usuario.bloqueado:
                # Bloqueada despues de iniciar sesion: se cierra la sesion abierta de inmediato.
                usuario = None
                session.pop(SESSION_USER, None)
            elif usuario is None:           # la cuenta ya no existe: se descarta la sesion
                session.pop(SESSION_USER, None)
        except SQLAlchemyError:
            # Con MySQL caido el sitio debe seguir mostrando sus paginas; se ve como visitante.
            log.exception('No se pudo cargar al usuario de la sesion')
    g._usuario_actual = usuario
    return usuario


@auth_bp.app_context_processor
def inyectar_usuario():
    """`current_user` y `csrf_token()` quedan disponibles en todas las plantillas (barra de navegacion)."""
    return {'current_user': usuario_actual(), 'csrf_token': csrf_token}


# ---------------------------------------------------------------------------
# Rutas
# ---------------------------------------------------------------------------
@auth_bp.route('/registro', methods=['GET', 'POST'])
def registro():
    destino = _destino_seguro(request.values.get('next'))
    if usuario_actual():
        return redirect(destino or url_for('clientes.index'))

    error = None
    if request.method == 'POST':
        if not _csrf_valido():
            error = 'El formulario expiró. Inténtalo de nuevo.'
        else:
            try:
                usuario = AuthService.registrar(
                    nombre=request.form.get('nombre'),
                    correo=request.form.get('correo'),
                    telefono=request.form.get('telefono'),
                    password=request.form.get('password'),
                )
            except AuthError as e:
                error = str(e)
            else:
                # Auto-login: la persona queda autenticada sin volver a escribir sus datos.
                iniciar_sesion(usuario)
                flash(f'¡Bienvenido/a, {usuario.primer_nombre}! Tu cuenta fue creada y ya iniciaste sesión.', 'success')
                return redirect(destino or url_for('clientes.index'))

    # La contrasena nunca se devuelve al formulario: solo nombre, correo y telefono.
    return render_template('auth/registro.html', form=request.form if error else {}, error=error, next_url=destino)


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    destino = _destino_seguro(request.values.get('next'))
    if usuario_actual():
        return redirect(destino or url_for('clientes.index'))

    error = None
    if request.method == 'POST':
        if not _csrf_valido():
            error = 'El formulario expiró. Inténtalo de nuevo.'
        else:
            try:
                usuario = AuthService.autenticar(
                    correo=request.form.get('correo'),
                    password=request.form.get('password'),
                )
            except AuthError as e:
                error = str(e)
            else:
                iniciar_sesion(usuario)
                flash(f'¡Hola de nuevo, {usuario.primer_nombre}!', 'success')
                return redirect(destino or url_for('clientes.index'))

    return render_template('auth/login.html', form=request.form if error else {}, error=error, next_url=destino)


@auth_bp.route('/logout', methods=['POST'])
def logout():
    # Solo POST + CSRF: un enlace o imagen de otro sitio no puede cerrar la sesion.
    if _csrf_valido():
        session.clear()
        flash('Cerraste sesión correctamente.', 'success')
    return redirect(url_for('clientes.index'))
