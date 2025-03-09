from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///playeras.db'  # Usamos SQLite para simplificar
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de Playera
class Playera(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    colores = db.Column(db.String(200), nullable=False)  # Almacenaremos los colores como una cadena separada por comas
    precio = db.Column(db.Float, nullable=False)
    imagen_url = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f'<Playera {self.nombre}>'

# Crear la base de datos
@app.before_first_request
def create_tables():
    db.create_all()

# Endpoint para obtener todas las playeras
@app.route('/api/playeras', methods=['GET'])
def get_playeras():
    playeras = Playera.query.all()
    result = []
    for playera in playeras:
        result.append({
            'id': playera.id,
            'nombre': playera.nombre,
            'colores': playera.colores,
            'precio': playera.precio,
            'imagen_url': playera.imagen_url
        })
    return jsonify(result)

# Endpoint para agregar una nueva playera
@app.route('/api/playeras', methods=['POST'])
def add_playera():
    data = request.get_json()
    new_playera = Playera(
        nombre=data['nombre'],
        colores=data['colores'],
        precio=data['precio'],
        imagen_url=data['imagen_url']
    )
    db.session.add(new_playera)
    db.session.commit()
    return jsonify({'message': 'Playera creada'}), 201

if __name__ == '__main__':
    app.run(debug=True)
