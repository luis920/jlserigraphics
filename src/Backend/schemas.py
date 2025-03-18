from flask_marshmallow import Marshmallow
from Backend.models import  Pedidos, Clientes,Compras

ma = Marshmallow()



class PedidosSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Pedidos
        fields = ('id', 'cliente', 'tipo_prenda', 'cantidad', 'fecha_entrega', 'precio', 'total', 'estado_pedido')

class ClientesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Clientes
        fields = ('id', 'nombre', 'direccion', 'telefono')

class CotizacionesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Clientes
        fields = ('id', 'nombre_del_cliente', 'direccion_cliente', 'telefono_cliente','tipo_de_prenda','cantidad_piezas','precio','subtotal','total')

class ComprasSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Compras
        fields = ('id', 'proveedor', 'fecha', 'producto','precio_unitario','cantidad','total','factura')

# Crear instancias para usar en otros archivos

pedido_schema = PedidosSchema()
pedidos_schema = PedidosSchema(many=True)

cliente_schema = ClientesSchema()
clientes_schema = ClientesSchema(many=True)

cotizacion_schema = CotizacionesSchema()
cotizaciones_schema = CotizacionesSchema(many=True)

compra_schema = CotizacionesSchema()
compras_schema = CotizacionesSchema(many=True)
