from dotenv import load_dotenv
import os

load_dotenv()

from flask import Flask,jsonify,request,current_app
from flask_cors import CORS
from Backend.models import db
from Backend.schemas import ma
from Backend.routes import routes
from Backend.config import Config
from flask_migrate import Migrate

from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required,JWTManager
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config.from_object(Config)

jwt = JWTManager(app)

bcrypt = Bcrypt(app)

CORS(app)
db.init_app(app)
ma.init_app(app)

migrate = Migrate(app, db)

app.register_blueprint(routes)



# Crear tablas en la base de datos
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)