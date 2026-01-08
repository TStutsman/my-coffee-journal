import os

class Config():
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL").replace('postgres://', 'postgresql://') #type:ignore
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_COOKIE_PATH = '/'
    SESSION_COOKIE_DOMAIN = '127.0.0.1' if os.getenv('FLASK_DEBUG') is True else None
    SESSION_COOKIE_SAMESITE = 'Lax'