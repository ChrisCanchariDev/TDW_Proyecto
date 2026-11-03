from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.sql import func

from app.database import db

# Mismo script que se uso en MySQL Workbench / la aplicacion de escritorio.
DDL_CONTACTOS = '''
CREATE TABLE IF NOT EXISTS contactos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NULL,
    asunto VARCHAR(100) NOT NULL DEFAULT 'Consultas generales',
    mensaje TEXT NOT NULL,
    leido TINYINT(1) NOT NULL DEFAULT 0,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha DATE GENERATED ALWAYS AS (DATE(creado_en)) STORED,
    hora TIME GENERATED ALWAYS AS (TIME(creado_en)) STORED,
    INDEX idx_correo (correo),
    INDEX idx_creado_en (creado_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
'''


class Contacto(db.Model):
    """Formulario "Ponte en contacto". Misma tabla que lee la aplicacion de escritorio."""
    __tablename__ = 'contactos'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    nombre_completo = db.Column(db.String(150), nullable=False)
    correo = db.Column(db.String(255), nullable=False, index=True)
    telefono = db.Column(db.String(20), nullable=True)
    asunto = db.Column(db.String(100), nullable=False, default='Consultas generales',
                       server_default='Consultas generales')
    mensaje = db.Column(db.Text, nullable=False)
    leido = db.Column(db.Boolean, nullable=False, default=False, server_default='0')
    creado_en = db.Column(db.TIMESTAMP, nullable=False, server_default=func.current_timestamp(), index=True)

    # Columnas generadas por MySQL a partir de creado_en (la app no las escribe)
    fecha = db.Column(db.Date, db.Computed('DATE(creado_en)', persisted=True))
    hora = db.Column(db.Time, db.Computed('TIME(creado_en)', persisted=True))

    def __repr__(self):
        return f'<Contacto {self.id} {self.nombre_completo}>'
