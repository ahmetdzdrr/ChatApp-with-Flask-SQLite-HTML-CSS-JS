import os

class Config:
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'your_mail_adress'
    MAIL_PASSWORD = 'your_password'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    SECRET_KEY = os.urandom(32).hex()
    



