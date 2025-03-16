from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS



# Inicialización de la aplicación Flask
app = Flask(__name__)
CORS(app)

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

class Pedidos(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100))
    tipo_prenda = db.Column(db.String(100))
    cantidad = db.Column(db.Integer)
    fecha_entrega= db.Column(db.String)
    precio = db.Column(db.Float)
    total = db.Column(db.Float)
    estado_pedido = db.Column(db.String(100))

    

    def __init__(self, cliente, tipo_prenda, cantidad, fecha_entrega,precio,estado_pedido):
        self.cliente = cliente
        self.tipo_prenda = tipo_prenda
        self.cantidad= cantidad
        self.fecha_entrega= fecha_entrega
        self.precio = precio
        self.total = float(precio)*int(cantidad)
        self.estado_pedido = estado_pedido

class Clientes(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    direccion = db.Column(db.String(100))
    telefono = db.Column(db.String(100))

    def __init__(self, nombre,direccion,telefono):
        self.nombre= nombre
        self.direccion = direccion
        self.telefono= telefono
    

# Esquema de Marshmallow para serializar y deserializar
class PlayeraSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Playera
        fields = ('id', 'titulo', 'descripcion', 'precio', 'imagen')

class PedidosSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Pedidos
        fields = ('id', 'cliente', 'tipo_prenda', 'cantidad', 'fecha_entrega', 'precio', 'total', 'estado_pedido')

class ClientesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Clientes
        fields = ('id','nombre','direccion','telefono')

        



# Crear una instancia del esquema
playera_schema = PlayeraSchema()
playeras_schema = PlayeraSchema(many=True)

pedido_schema = PedidosSchema()
pedidos_schema = PedidosSchema(many=True)

cliente_schema = ClientesSchema()
clientes_schema = ClientesSchema(many=True)

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

# PEDIDOS
@app.route('/pedido', methods=['POST'])
def crear_pedido():
    
    cliente = request.json['cliente']
    tipo_prenda = request.json['tipo_prenda']
    cantidad = request.json['cantidad']
    fecha_entrega= request.json['fecha_entrega']
    precio= request.json['precio']
    estado_pedido= request.json['estado_pedido']

    nuevo_pedido = Pedidos(cliente, tipo_prenda, cantidad, fecha_entrega,precio,estado_pedido)

    db.session.add(nuevo_pedido)
    db.session.commit()

    return jsonify(pedido_schema.dump(nuevo_pedido)), 201

@app.route('/pedidos', methods=['GET'])
def obtener_pedidos():
    
    pedidos = Pedidos.query.all()

    return jsonify(pedidos_schema.dump(pedidos)), 200

#CLIENTES

@app.route('/cliente', methods=['POST'])
def crear_cliente():
    # Obtener los datos del JSON
    nombre = request.json['nombre']
    direccion = request.json['direccion']
    telefono = request.json['telefono']
    
    nuevo_cliente = Clientes(nombre, direccion, telefono,)

    db.session.add(nuevo_cliente)
    db.session.commit()

    return jsonify(cliente_schema.dump(nuevo_cliente)), 201

@app.route('/clientes', methods=['GET'])

def obtener_clientes():

    clientes = Clientes.query.all()

    return jsonify(clientes_schema.dump(clientes)),200






# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)
