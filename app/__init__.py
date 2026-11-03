import logging

import app
from flask import Flask
from app.config import Config
from app.database import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # <-- Esta línea es necesaria

    if app.config['SECRET_KEY'] == 'yalpa_secret_key_2026':
        # Las sesiones de usuario van firmadas con esta clave: si es la del codigo, cualquiera podria falsificarlas.
        logging.getLogger(__name__).warning(
            'SECRET_KEY usa el valor por defecto del codigo. Define una propia en .env '
            '(python -c "import secrets; print(secrets.token_hex(32))") antes de publicar el sitio.')
        
    db.init_app(app)

    from sqlalchemy import text
    from app.models.contacto import DDL_CONTACTOS
    from app.models.usuario import DDL_USUARIOS, SQL_COLUMNA_BLOQUEADO_EXISTE, DDL_USUARIOS_BLOQUEADO
    with app.app_context():
        try:
            db.session.execute(text(DDL_CONTACTOS))
            db.session.execute(text(DDL_USUARIOS))
            if not db.session.execute(text(SQL_COLUMNA_BLOQUEADO_EXISTE)).scalar():
                db.session.execute(text(DDL_USUARIOS_BLOQUEADO))
            db.session.commit()
        except Exception:
            logging.getLogger(__name__).exception('No se pudo conectar a MySQL al iniciar')
            
    from app.routes.clientes import clientes_bp
    app.register_blueprint(clientes_bp)

    from app.routes.nosotros import nosotros_bp
    app.register_blueprint(nosotros_bp)

    from app.routes.chatbot import chatbot_bp
    app.register_blueprint(chatbot_bp)

    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    return app