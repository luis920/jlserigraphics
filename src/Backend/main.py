from flask import Flask
from flask_cors import CORS
from Backend.models import db
from Backend.schemas import ma
from Backend.routes import routes
from Backend.config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
ma.init_app(app)

app.register_blueprint(routes)

# Crear tablas en la base de datos
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)