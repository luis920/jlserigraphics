from flask import Blueprint, request, jsonify ,send_from_directory,current_app
from werkzeug.utils import secure_filename
from Backend.models import db, Pedidos, Clientes,Cotizaciones,Compras,Proveedores,Usuarios
from Backend.schemas import  pedido_schema, pedidos_schema, cliente_schema, clientes_schema,cotizacion_schema,cotizaciones_schema,compra_schema,compras_schema,proveedor_schema,proveedores_schema,usuario_schema,usuarios_schema
import os
from flask_jwt_extended import create_access_token

routes = Blueprint('routes', __name__)

#ENDPOINTS PEDIDOS
# Obtener pedidos
@routes.route('/pedidos', methods=['GET'])
def obtener_pedidos():
    pedidos = Pedidos.query.all()
    return jsonify(pedidos_schema.dump(pedidos)), 200
# crear pedidos
@routes.route('/pedido', methods=['POST'])
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

# Crear cliente
@routes.route('/cliente', methods=['POST'])
def crear_cliente():
    data = request.json
    nuevo_cliente = Clientes(**data)
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify(cliente_schema.dump(nuevo_cliente)), 201

# Obtener cliente
@routes.route("/clientes", methods=['GET'])
def obtener_clientes():

  clientes = Clientes.query.all()
  return jsonify(clientes_schema.dump(clientes)),200

#ENDPOINTS COTIZACIONES 
  
  #Generar cotizacion
# @routes.route('/cotizacion', methods=['POST'])
# def generar_cotizacion():
#     data = request.json
#     nueva_cotizacion= Cotizaciones(**data)
#     db.session.add(nueva_cotizacion)
#     db.session.commit()
#     return jsonify(cotizacion_schema.dump(nueva_cotizacion)),201
   
   #obtener cotizaciones
# @routes.route('/cotizaciones', methods=['GET'])
# def obtener_cotizaciones():

#   cotizaciones = Cotizaciones.query.all()
#   return jsonify(cotizaciones_schema.dump(cotizaciones))

# #DESCARGAR Y GUARDAR PDF DE COTIZACIONES
# @routes.route("/guardar_cotizacion", methods=["POST"])
# def guardar_cotizacion():
#     try:
#         nombre = request.form.get("nombre_del_cliente")
#         direccion = request.form.get("direccion_cliente")
#         telefono = request.form.get("telefono_cliente")
#         tipo_prenda = request.form.get("tipo_de_prenda")
#         cantidad = int(request.form.get("cantidad_piezas"))
#         precio = float(request.form.get("precio"))
#         pdf_file = request.files["pdf"]

#         if pdf_file:
#             filename = secure_filename(f"Cotizacion-{nombre}.pdf")
#             filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
#             pdf_file.save(filepath)
#             pdf_url = f"http://localhost:5000/uploads/{filename}"

#             nueva_cotizacion = Cotizaciones(
#                 nombre_del_cliente=nombre,
#                 direccion_cliente=direccion,
#                 telefono_cliente=telefono,
#                 tipo_de_prenda=tipo_prenda,
#                 cantidad_piezas=cantidad,
#                 precio=precio,
#                 pdf_url=pdf_url,
#             )

#             db.session.add(nueva_cotizacion)
#             db.session.commit()

#             return jsonify({"message": "Cotización guardada correctamente", "pdf_url": pdf_url}), 201

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @routes.route("/uploads/<filename>")
# def descargar_pdf(filename):
#     return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)

#ENDPOINTS COMPRAS

@routes.route('/compra', methods=['POST'])
def crear_compra():
    data = request.json
    nueva_compra = Compras(**data)
    db.session.add(nueva_compra)
    db.session.commit()

    return jsonify(compra_schema.dump(nueva_compra)),201

@routes.route('/compras',methods=['GET'])
def obtener_compras():
   
   compras= Compras.query.all()
   return jsonify(compras_schema.dump(compras)),200

@routes.route('/compras/<int:id>', methods=['DELETE'])
def eliminar_compra(id):
    compras = Compras.query.get(id)
    if not compras:
        return jsonify({"error": "no se encontr el id de la compra"}), 404

    db.session.delete(compras)
    db.session.commit()
    return jsonify(compra_schema.dump(compras)), 200

@routes.route('/compra/<int:id>', methods=['PUT'])
def editar_compra(id):
    compra = Compras.query.get(id) 
    if not compra:
        return jsonify({"error": "Compra no encontrada"}), 404

    data = request.json

   
    compra.proveedor = data.get("proveedor", compra.proveedor)
    compra.fecha = data.get("fecha", compra.fecha)
    compra.producto = data.get("producto", compra.producto)
    compra.precio_unitario = data.get("precio_unitario", compra.precio_unitario)
    compra.cantidad = data.get("cantidad", compra.cantidad)
    compra.total = float(compra.precio_unitario) * int(compra.cantidad)  
    compra.factura = data.get("factura", compra.factura)

    db.session.commit()  

    return jsonify(compra_schema.dump(compra)), 200  

#ENDPOINT PROVEEDORES

@routes.route('/proveedor', methods=['POST'])
def crear_proveedor():
    data = request.json
    nuevo_proveedor = Proveedores(**data)
    db.session.add(nuevo_proveedor)
    db.session.commit()

    return jsonify(proveedor_schema.dump(nuevo_proveedor)),201

@routes.route('/proveedores',methods=['GET'])
def obtener_proveedores():
    proveedores= Proveedores.query.all()

    return jsonify(proveedores_schema.dump(proveedores)),200

@routes.route('/proveedor/<int:id>', methods=['DELETE'])
def eliminar_proveedor(id):
    proveedor = Proveedores.query.get(id)
    if not proveedor:
        return jsonify({"error": "no se encontro el id del proveedor"}), 404

    db.session.delete(proveedor)
    db.session.commit()
    return jsonify(proveedor_schema.dump(proveedor)), 200

@routes.route('/proveedor/<int:id>', methods=['PUT'])
def editar_proveedor(id):
    proveedor = Proveedores.query.get(id) 
    if not proveedor:
        return jsonify({"error": "proveedor no encontrada"}), 404

    data = request.json

   
    proveedor.nombre_del_proveedor = data.get("nombre_del_proveedor", proveedor.nombre_del_proveedor)
    proveedor.telefono = data.get("telefono", proveedor.telefono)
    proveedor.correo_electronico = data.get("correo_electronico", proveedor.correo_electronico)
    proveedor.suministros_otorgados = data.get("suministros_otorgados", proveedor.suministros_otorgados)
   

    db.session.commit()  

    return jsonify(proveedor_schema.dump(proveedor)), 200  

  #ENDPOINT USUARIOS

@routes.route('/nuevousuario',methods=['POST'])
def nuevo_usuario():
    data = request.json
    usuario = Usuarios(**data)
    db.session.add(usuario)
    db.session.commit()

    return jsonify(compra_schema.dump(usuario)),201

@routes.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)