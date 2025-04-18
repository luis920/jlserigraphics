from flask import Blueprint, request, jsonify ,send_from_directory,current_app
from werkzeug.utils import secure_filename
from Backend.models import db, Pedidos, Clientes,Cotizaciones,Compras,Proveedores,Usuarios,Mensajes,Contactanos
from Backend.schemas import  pedido_schema, pedidos_schema, cliente_schema, clientes_schema,cotizacion_schema,cotizaciones_schema,compra_schema,compras_schema,proveedor_schema,proveedores_schema,usuario_schema,usuarios_schema,mensaje_schema,mensajes_schema,contactanos_schema
import os
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt
from datetime import datetime

bcrypt = Bcrypt()

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

@routes.route('/pedido/<int:id>', methods=['PUT'])
def cambiar_estado(id):
    estado = Pedidos.query.get(id) 
    if not estado:
        return jsonify({"error": "Pedido no encontrado"}), 404

    data = request.json

    if "estado_pedido" not in data:
        return jsonify({"error": "Falta el campo 'estado_pedido'"}), 400

    estado.estado_pedido = data["estado_pedido"]

    db.session.commit()

    return jsonify({"mensaje": "Estado del pedido actualizado exitosamente"}), 200



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
@routes.route('/cotizacion', methods=['POST'])
def generar_cotizacion():
    data = request.json
    nueva_cotizacion= Cotizaciones(**data)
    db.session.add(nueva_cotizacion)
    db.session.commit()
    return jsonify(cotizacion_schema.dump(nueva_cotizacion)),201
   
   #obtener cotizaciones
@routes.route('/cotizaciones', methods=['GET'])
def obtener_cotizaciones():

  cotizaciones = Cotizaciones.query.all()
  return jsonify(cotizaciones_schema.dump(cotizaciones))

# #DESCARGAR Y GUARDAR PDF DE COTIZACIONES
# @routes.route("/cotizacion", methods=["POST"])
# def guardar_cotizacion():
#     try:
#         nombre = request.form.get("nombre_del_cliente")
#         direccion = request.form.get("direccion_cliente")
#         telefono = request.form.get("telefono_cliente")
#         tipo_prenda = request.form.get("tipo_de_prenda")
#         cantidad = int(request.form.get("cantidad_piezas"))
#         precio = float(request.form.get("precio"))
#         pdf_file = request.files.get("pdf")  # Ahora lo llamamos pdf_file

#         if not pdf_file:
#             return jsonify({"error": "No se proporcionó un archivo PDF"}), 400

#         # Guardar el archivo y generar la URL
#         filename = secure_filename(f"Cotizacion-{nombre}.pdf")
#         filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
#         pdf_file.save(filepath)

#         pdf_url = f"http://localhost:5000/uploads/{filename}"  # URL del PDF

#         # Crear la cotización con la URL del PDF
#         nueva_cotizacion = Cotizaciones(
#             nombre_del_cliente=nombre,
#             direccion_cliente=direccion,
#             telefono_cliente=telefono,
#             tipo_de_prenda=tipo_prenda,
#             cantidad_piezas=cantidad,
#             precio=precio,
#             pdf_url=pdf_url  # Guardamos solo la URL
#         )

#         db.session.add(nueva_cotizacion)
#         db.session.commit()

#         return jsonify({"message": "Cotización guardada correctamente", "pdf_url": pdf_url}), 201

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

  #ENDPOINT crear usuario

@routes.route('/registro', methods=['POST'])
def nuevo_usuario():
    data = request.json

    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    
    usuario = Usuarios(
        nombre_completo=data['nombre_completo'],
        telefono=data['telefono'],
        email=data['email'],
        password=hashed_password,
        rol=data['rol']
         
    )

    db.session.add(usuario)
    db.session.commit()

    return jsonify(usuario_schema.dump(usuario)), 201



@routes.route('/iniciarsesion', methods=['POST'])
def login():
    data = request.json
    usuario = Usuarios.query.filter_by(email=data['email']).first()

    if usuario and bcrypt.check_password_hash(usuario.password, data['password']):
        # Contraseña correcta, crear el token JWT y responder
        access_token = create_access_token(identity=usuario.id)
        return jsonify({
    "access_token": access_token,
    "usuario": {
        "id": usuario.id,
        "email": usuario.email,
        "rol": usuario.rol,
        "nombre_completo": usuario.nombre_completo
    }
}), 200
    else:
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

#ENDPOINTS MENSAJES

@routes.route('/mensaje', methods=['POST'])
def crear_mensaje():
    data = request.json

    nuevo_mensaje = Mensajes(**data)
    db.session.add(nuevo_mensaje)
    db.session.commit()

    return jsonify(mensaje_schema.dump(nuevo_mensaje)), 201


@routes.route('/mensajes',methods=['GET'])
def obtener_mensajes():

    mensajes= Mensajes.query.all()

    return jsonify(mensajes_schema.dump(mensajes)),200

#ENDPOINT CONTACTANOS

@routes.route('/contacto', methods=['POST'])
def contactanos():
    data = request.json

    nuevo_mensaje_contactanos = Contactanos(**data)
    db.session.add(nuevo_mensaje_contactanos)
    db.session.commit()

    return jsonify(mensaje_schema.dump(nuevo_mensaje_contactanos)), 201

@routes.route('/contactanos',methods=['GET'])
def obtener_mensajes_contactanos():

    obtener_mensajes_contacto= Contactanos.query.all()

    return jsonify(contactanos_schema.dump(obtener_mensajes_contacto)),200




