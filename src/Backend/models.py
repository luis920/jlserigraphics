from flask_sqlalchemy import SQLAlchemy
from datetime import date
db = SQLAlchemy()

class Usuarios(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(15), nullable=False, unique=True) 
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    rol = db.Column(db.String(20), nullable=False)


    def __init__(self, nombre_completo,telefono,email,password,rol):
        self.nombre_completo= nombre_completo
        self.telefono = telefono
        self.email= email
        self.password= password
        self.rol=rol
        
class Compras(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    proveedor = db.Column(db.String(100))
    fecha = db.Column(db.String(100))
    producto = db.Column(db.String(100))
    precio_unitario = db.Column(db.Float)
    cantidad = db.Column(db.Integer)
    total = db.Column(db.Float)
    factura = db.Column(db.String(100))

    def __init__(self, proveedor, fecha, producto, precio_unitario,cantidad,factura):
        self.proveedor = proveedor
        self.fecha = fecha
        self.producto= producto
        self.precio_unitario= precio_unitario
        self.cantidad = cantidad
        self.total = float(precio_unitario)*int(cantidad)
        self.factura = factura

class Pedidos(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100))
    tipo_prenda = db.Column(db.String(100))
    cantidad = db.Column(db.Integer)
    fecha_entrega = db.Column(db.String(100))
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

class Cotizaciones(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    nombre_del_cliente = db.Column(db.String(100))
    direccion_cliente = db.Column(db.String(100))
    telefono_cliente = db.Column(db.String(100))
    tipo_de_prenda= db.Column(db.String(100))
    cantidad_piezas = db.Column(db.String(100))
    precio= db.Column(db.Float)
    subtotal = db.Column(db.Float)
    total = db.Column(db.Float)
    pdf_url = db.Column(db.String(255))
   

    def __init__(self, nombre_del_cliente,direccion_cliente,telefono_cliente,tipo_de_prenda,cantidad_piezas,precio,pdf_url):
        self.nombre_del_cliente= nombre_del_cliente
        self.direccion_cliente = direccion_cliente
        self.telefono_cliente= telefono_cliente
        self.tipo_de_prenda= tipo_de_prenda
        self.cantidad_piezas= int(cantidad_piezas)
        self.precio=float(precio)
        self.subtotal= self.cantidad_piezas*self.precio
        self.total= self.subtotal*1.16
        self.pdf_url=pdf_url


class Proveedores(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    nombre_del_proveedor = db.Column(db.String(100))
    telefono = db.Column(db.String(100))
    correo_electronico = db.Column(db.String(100))
    suministros_otorgados = db.Column(db.String(100))

    def __init__(self, nombre_del_proveedor,telefono,correo_electronico,suministros_otorgados):
        self.nombre_del_proveedor= nombre_del_proveedor
        self.telefono = telefono
        self.correo_electronico= correo_electronico
        self.suministros_otorgados= suministros_otorgados

class Mensajes(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    email = db.Column(db.String(100))
    fecha = db.Column(db.Date, default=date.today)
    mensaje = db.Column(db.String(100))

   





