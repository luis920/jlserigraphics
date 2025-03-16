from flask import Blueprint, request, jsonify
from Backend.models import db, Playera, Pedidos, Clientes
from Backend.schemas import playera_schema, playeras_schema, pedido_schema, pedidos_schema, cliente_schema, clientes_schema

routes = Blueprint('routes', __name__)
# ENDPOINTS PLAYERAS
# Endpoint para crear una playera
@routes.route('/playera', methods=['POST'])
def crear_playera():
    data = request.json
    nueva_playera = Playera(**data)
    db.session.add(nueva_playera)
    db.session.commit()
    return jsonify(playera_schema.dump(nueva_playera)), 201

#ENDPOINTS PEDIDOS
# Obtener pedidos
@routes.route('/pedidos', methods=['GET'])
def obtener_pedidos():
    pedidos = Pedidos.query.all()
    return jsonify(pedidos_schema.dump(pedidos)), 200

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
