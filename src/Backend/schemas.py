from flask_marshmallow import Marshmallow
from Backend.models import Playera, Pedidos, Clientes

ma = Marshmallow()

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
        fields = ('id', 'nombre', 'direccion', 'telefono')

# Crear instancias para usar en otros archivos
playera_schema = PlayeraSchema()
playeras_schema = PlayeraSchema(many=True)

pedido_schema = PedidosSchema()
pedidos_schema = PedidosSchema(many=True)

cliente_schema = ClientesSchema()
clientes_schema = ClientesSchema(many=True)
