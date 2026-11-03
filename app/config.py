
import os
import ssl
from datetime import timedelta

from dotenv import load_dotenv
from sqlalchemy.engine import make_url

load_dotenv()


DATABASE_URL = os.environ.get("DATABASE_URL")
SECRET_KEY = os.environ.get("SECRET_KEY")

if not DATABASE_URL:
    raise RuntimeError(
        "Falta configurar DATABASE_URL"
    )

if not SECRET_KEY:
    raise RuntimeError(
        "Falta configurar SECRET_KEY"
    )


class Config:
    SECRET_KEY = SECRET_KEY

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Seguridad de sesiones
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = (
        os.getenv("SESSION_COOKIE_SECURE", "0") == "1"
    )

    PERMANENT_SESSION_LIFETIME = timedelta(
        days=int(os.getenv("SESSION_DAYS", "30"))
    )

    # Zona horaria de Perú
    DB_TIMEZONE = os.getenv("DB_TIMEZONE", "-05:00")

    # Opciones de conexión
    connect_args = {}

    if DATABASE_URL.startswith("mysql"):
        connect_args = {
            "init_command": (
                f"SET time_zone='{DB_TIMEZONE}'"
            ),
            "connect_timeout": 10,
        }

        # Aiven requiere conexión segura
        db_host = make_url(DATABASE_URL).host or ""

        if db_host.endswith(".aivencloud.com"):
            ca_pem = os.getenv("AIVEN_CA_PEM")

            if not ca_pem:
                raise RuntimeError(
                    "Falta configurar AIVEN_CA_PEM"
                )

            ca_pem = ca_pem.replace("\\n", "\n")

            ssl_context = ssl.create_default_context(
                cadata=ca_pem
            )

            connect_args["ssl"] = ssl_context

    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 280,
        "connect_args": connect_args,
    }
