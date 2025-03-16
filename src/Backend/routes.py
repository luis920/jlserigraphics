from flask import Blueprint, request, jsonify
from Backend.models import db, Playera, Pedidos, Clientes
from Backend.schemas import playera_schema, playeras_schema, pedido_schema, pedidos_schema, cliente_schema, clientes_schema

routes = Blueprint('routes', __name__)

# Endpoint para crear una playera
@routes.route('/playera', methods=['POST'])
def crear_playera():
    data = request.json
    nueva_playera = Playera(**data)
    db.session.add(nueva_playera)
    db.session.commit()
    return jsonify(playera_schema.dump(nueva_playera)), 201

# Obtener pedidos
@routes.route('/pedidos', methods=['GET'])
def obtener_pedidos():
    pedidos = Pedidos.query.all()
    return jsonify(pedidos_schema.dump(pedidos)), 200

# Crear cliente
@routes.route('/cliente', methods=['POST'])
def crear_cliente():
    data = request.json
    nuevo_cliente = Clientes(**data)
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify(cliente_schema.dump(nuevo_cliente)), 201
