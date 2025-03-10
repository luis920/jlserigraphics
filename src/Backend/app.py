from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Inicialización de la aplicación Flask
app = Flask(__name__)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/flaskmysql'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Desactivar modificaciones de seguimiento

# Inicialización de SQLAlchemy y Marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Definición del modelo de la base de datos
class Playera(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100))
    descripcion = db.Column(db.String(100))
    precio = db.Column(db.Integer)
    imagen= db.Column(db.String(100))

    def __init__(self, titulo, descripcion, precio, imagen):
        self.titulo = titulo
        self.descripcion = descripcion
        self.precio = precio
        self.imagen= imagen

# Esquema de Marshmallow para serializar y deserializar
class PlayeraSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Playera
        fields = ('id', 'titulo', 'descripcion', 'precio', 'imagen')

# Crear una instancia del esquema
playera_schema = PlayeraSchema()
playeras_schema = PlayeraSchema(many=True)

# Crear las tablas de la base de datos (mejor hacerlo solo una vez)
with app.app_context():
    db.create_all()

# Endpoint para crear una nueva playera
@app.route('/playera', methods=['POST'])
def crear_playera():
    # Obtener los datos del JSON
    titulo = request.json['titulo']
    descripcion = request.json['descripcion']
    precio = request.json['precio']
    imagen= request.json['imagen']

    # Crear una nueva instancia de Playera
    nueva_playera = Playera(titulo, descripcion, precio, imagen)

    # Agregar la nueva playera a la base de datos
    db.session.add(nueva_playera)
    db.session.commit()

    # Serializar la nueva playera y devolverla en la respuesta
    return jsonify(playera_schema.dump(nueva_playera)), 201

# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)
