from flask import Blueprint, request, jsonify ,send_from_directory,current_app
from werkzeug.utils import secure_filename
from Backend.models import db, Pedidos, Clientes,Cotizaciones,Compras
from Backend.schemas import  pedido_schema, pedidos_schema, cliente_schema, clientes_schema,cotizacion_schema,cotizaciones_schema
import os

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

#DESCARGAR Y GUARDAR PDF DE COTIZACIONES
@routes.route("/guardar_cotizacion", methods=["POST"])
def guardar_cotizacion():
    try:
        nombre = request.form.get("nombre_del_cliente")
        direccion = request.form.get("direccion_cliente")
        telefono = request.form.get("telefono_cliente")
        tipo_prenda = request.form.get("tipo_de_prenda")
        cantidad = int(request.form.get("cantidad_piezas"))
        precio = float(request.form.get("precio"))
        pdf_file = request.files["pdf"]

        if pdf_file:
            filename = secure_filename(f"Cotizacion-{nombre}.pdf")
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            pdf_file.save(filepath)
            pdf_url = f"http://localhost:5000/uploads/{filename}"

            nueva_cotizacion = Cotizaciones(
                nombre_del_cliente=nombre,
                direccion_cliente=direccion,
                telefono_cliente=telefono,
                tipo_de_prenda=tipo_prenda,
                cantidad_piezas=cantidad,
                precio=precio,
                pdf_url=pdf_url,
            )

            db.session.add(nueva_cotizacion)
            db.session.commit()

            return jsonify({"message": "Cotización guardada correctamente", "pdf_url": pdf_url}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route("/uploads/<filename>")
def descargar_pdf(filename):
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)

#ENDPOINTS COMPRAS

routes.route('/compra', methods=['POST'])
def crear_compra():
    data = request.json

    nueva_compra = Compras(**data)
    db.session.add(nueva_compra)
    db.session.commit()

    jsonify(compras_schema.dump(nueva_compra)),201