from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Playera(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100))
    descripcion = db.Column(db.String(100))
    precio = db.Column(db.Integer)
    imagen = db.Column(db.String(100))

class Pedidos(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100))
    tipo_prenda = db.Column(db.String(100))
    cantidad = db.Column(db.Integer)
    fecha_entrega = db.Column(db.String)
    precio = db.Column(db.Float)
    total = db.Column(db.Float)
    estado_pedido = db.Column(db.String(100))

class Clientes(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    direccion = db.Column(db.String(100))
    telefono = db.Column(db.String(100))