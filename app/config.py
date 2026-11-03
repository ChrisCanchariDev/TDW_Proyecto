import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    SECRET_KEY = os.getenv('SECRET_KEY', 'yalpa_secret_key_2026')

    # MySQL (contenedor Docker "yalpa", puerto 3308)
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'mysql+pymysql://root:12345678@localhost:3308/yalpa?charset=utf8mb4'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Sesion de usuario (cookie firmada con SECRET_KEY)
    SESSION_COOKIE_HTTPONLY = True        # el JavaScript de la pagina no puede leer la cookie
    SESSION_COOKIE_SAMESITE = 'Lax'       # no se envia en peticiones POST desde otros sitios
    # Poner SESSION_COOKIE_SECURE=1 en produccion (HTTPS); en local con http:// debe quedar en 0
    SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE', '0') == '1'
    PERMANENT_SESSION_LIFETIME = timedelta(days=int(os.getenv('SESSION_DAYS', '30')))

    # Zona horaria de la sesion MySQL (Peru = UTC-5) para que la hora de registro sea la real
    DB_TIMEZONE = os.getenv('DB_TIMEZONE', '-05:00')

    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,    # reconecta si MySQL cerro la conexion
        'pool_recycle': 280,
        'connect_args': {
            'init_command': f"SET time_zone='{DB_TIMEZONE}'",
            'connect_timeout': 5,
        } if SQLALCHEMY_DATABASE_URI.startswith('mysql') else {},
    }