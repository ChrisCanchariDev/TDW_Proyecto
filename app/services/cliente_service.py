from app.database import db
from app.models.cliente import Cliente

class ClienteService:
    @staticmethod
    def registrar_cliente(nombres, apellidos, correo, mensaje=None):
        cliente = Cliente(
            nombres=nombres,
            apellidos=apellidos,
            correo=correo,
            mensaje=mensaje
        )
        db.session.add(cliente)
        db.session.commit()
        return cliente