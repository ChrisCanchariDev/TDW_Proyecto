import logging
import re

from sqlalchemy.exc import SQLAlchemyError

from app.database import db
from app.models.contacto import Contacto

log = logging.getLogger(__name__)

_CORREO = re.compile(r'^[\w.+-]+@[\w-]+(\.[\w-]+)+$')
_TELEFONO = re.compile(r'^[0-9+()\s-]{6,20}$')


class ContactoError(Exception):
    """Error de validacion o de guardado, con un mensaje apto para mostrar al visitante."""


class ContactoService:
    @staticmethod
    def registrar(nombre, correo, telefono, asunto, mensaje, asuntos_validos):
        nombre = (nombre or '').strip()
        correo = (correo or '').strip()
        telefono = (telefono or '').strip()
        mensaje = (mensaje or '').strip()

        if not nombre or not correo or not mensaje or asunto not in asuntos_validos:
            raise ContactoError('Completa tu nombre, correo, asunto y mensaje.')
        if len(nombre) > 150:
            raise ContactoError('El nombre no puede superar los 150 caracteres.')
        if len(correo) > 255 or not _CORREO.match(correo):
            raise ContactoError('Ingresa un correo electronico valido.')
        if telefono and not _TELEFONO.match(telefono):
            raise ContactoError('El telefono solo puede tener numeros, +, -, parentesis y espacios (6 a 20 caracteres).')

        contacto = Contacto(
            nombre_completo=nombre,
            correo=correo,
            telefono=telefono or None,
            asunto=asunto,
            mensaje=mensaje,
        )
        try:
            db.session.add(contacto)
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            log.exception('No se pudo guardar el contacto en la base de datos')
            raise ContactoError('No pudimos enviar tu mensaje en este momento. Intentalo de nuevo en unos minutos.')
        return contacto
