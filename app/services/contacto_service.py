
import logging
import re
import unicodedata

from sqlalchemy.exc import SQLAlchemyError

from app.database import db
from app.models.contacto import Contacto

log = logging.getLogger(__name__)


# ==========================================
# EXPRESIONES REGULARES
# ==========================================

# Letras Unicode, incluyendo ñ y tildes.
# Solo permite un espacio entre palabras.
_NOMBRE = re.compile(
    r'^[^\W\d_]+(?: [^\W\d_]+)*$',
    re.UNICODE
)

# Correo con dominio completo.
_CORREO = re.compile(
    r'^[A-Za-z0-9]+(?:[._+-][A-Za-z0-9]+)*@'
    r'[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*'
    r'(?:\.[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)+$'
)

# Teléfono peruano: comienza con 9 y tiene 9 dígitos.
_TELEFONO = re.compile(r'^9[0-9]{8}$')


# ==========================================
# EXCEPCIÓN PERSONALIZADA
# ==========================================

class ContactoError(Exception):
    """Error de validación o de guardado del contacto."""


# ==========================================
# SERVICIO DE CONTACTOS
# ==========================================

class ContactoService:

    @staticmethod
    def registrar(nombre, correo, telefono, asunto, mensaje, asuntos_validos):

        # Normalizar caracteres Unicode sin eliminar espacios.
        nombre = unicodedata.normalize('NFC', nombre or '')
        correo = correo or ''
        telefono = telefono or ''
        mensaje = (mensaje or '').strip()

        # ----------------------------------
        # 1. CAMPOS OBLIGATORIOS
        # ----------------------------------

        if not nombre or not correo or not mensaje:
            raise ContactoError(
                'Completa tu nombre, correo y mensaje.'
            )

        # ----------------------------------
        # 2. VALIDAR ASUNTO
        # ----------------------------------

        if not asunto or asunto not in asuntos_validos:
            raise ContactoError(
                'Debes seleccionar un asunto de la lista disponible.'
            )

        # ----------------------------------
        # 3. VALIDAR NOMBRE
        # ----------------------------------

        if not 3 <= len(nombre) <= 100:
            raise ContactoError(
                'El nombre debe contener entre 3 y 100 caracteres.'
            )

        if not _NOMBRE.fullmatch(nombre):
            raise ContactoError(
                'El nombre solo admite letras, tildes, ñ y un espacio entre palabras. No se permiten números, signos ni espacios al inicio o al final.'
            )

        # ----------------------------------
        # 4. VALIDAR CORREO
        # ----------------------------------

        if len(correo) > 255 or not _CORREO.fullmatch(correo):
            raise ContactoError(
                'Ingresa un correo electrónico válido con dominio completo. Ejemplo: usuario@gmail.com.'
            )

        # ----------------------------------
        # 5. VALIDAR TELÉFONO (OPCIONAL)
        # ----------------------------------

        if telefono and not _TELEFONO.fullmatch(telefono):
            raise ContactoError(
                'El teléfono debe comenzar con 9 y contener exactamente 9 dígitos, sin espacios, letras ni signos.'
            )

        # ----------------------------------
        # 6. CREAR CONTACTO
        # ----------------------------------

        contacto = Contacto(
            nombre_completo=nombre,
            correo=correo,
            telefono=telefono or None,
            asunto=asunto,
            mensaje=mensaje
        )

        # ----------------------------------
        # 7. GUARDAR EN BASE DE DATOS
        # ----------------------------------

        try:
            db.session.add(contacto)
            db.session.commit()

        except SQLAlchemyError:
            db.session.rollback()

            log.exception(
                'No se pudo guardar el contacto en la base de datos.'
            )

            raise ContactoError(
                'No pudimos enviar tu mensaje en este momento. '
                'Inténtalo de nuevo en unos minutos.'
            )

        return contacto
