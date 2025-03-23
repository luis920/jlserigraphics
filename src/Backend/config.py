import os

class Config:
    JWT_SECRET_KEY = "jlserigraphics$2312" 
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root@localhost/flaskmysql'
    SQLALCHEMY_TRACK_MODIFICATIONS = False