from dotenv import load_dotenv

load_dotenv()

from flask import Flask
from flask_cors import CORS
from Backend.models import db
from Backend.schemas import ma
from Backend.routes import routes
from Backend.config import Config
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)

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