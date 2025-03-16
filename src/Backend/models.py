from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Pedidos(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100))
    tipo_prenda = db.Column(db.String(100))
    cantidad = db.Column(db.Integer)
    fecha_entrega = db.Column(db.String)
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