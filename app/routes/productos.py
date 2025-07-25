# routes/productos.py
from flask import Blueprint, request, jsonify, current_app
import MySQLdb
from MySQLdb.cursors import DictCursor
from routes.usuarios import get_active_tokens

productos_bp = Blueprint('productos', __name__)

def token_requerido(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if token not in get_active_tokens():
            return jsonify({"error": "No autorizado. Inicie sesión primero."}), 401
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

@productos_bp.route('/', methods=['GET'])
@token_requerido
def listar_productos():
    mysql = current_app.mysql
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("SELECT id, codigo, nombre, descripcion, unidad, categoria, stock FROM productos")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@productos_bp.route('/registrar', methods=['POST'])
@token_requerido
def registrar_producto():
    mysql = current_app.mysql
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO productos (codigo, nombre, descripcion, unidad, categoria, stock) VALUES (%s, %s, %s, %s, %s, %s)",
            (data['codigo'], data['nombre'], data['descripcion'], data['unidad'], data['categoria'], data.get('stock', 0))
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Producto registrado"}), 201
    except MySQLdb.IntegrityError as e:
        if e.args[0] == 1062:
            return jsonify({"error": "El código o nombre del producto ya existe"}), 409
        return jsonify({"error": str(e)}), 400

@productos_bp.route('/actualizar/<int:id>', methods=['PUT'])
@token_requerido
def actualizar_producto(id):
    mysql = current_app.mysql
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "UPDATE productos SET codigo=%s, nombre=%s, descripcion=%s, unidad=%s, categoria=%s, stock=%s WHERE id=%s",
            (data['codigo'], data['nombre'], data['descripcion'], data['unidad'], data['categoria'], data.get('stock', 0), id)
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Producto actualizado"})
    except MySQLdb.IntegrityError as e:
        if e.args[0] == 1062:
            return jsonify({"error": "El código o nombre del producto ya existe"}), 409
        return jsonify({"error": str(e)}), 400

@productos_bp.route('/eliminar/<int:id>', methods=['DELETE'])
@token_requerido
def eliminar_producto(id):
    mysql = current_app.mysql
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM productos WHERE id=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Producto eliminado"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@productos_bp.route('/disponibilidad/<codigo>', methods=['GET'])
@token_requerido
def disponibilidad_producto(codigo):
    mysql = current_app.mysql
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("SELECT codigo, nombre, stock FROM productos WHERE codigo=%s", (codigo,))
    prod = cur.fetchone()
    cur.close()
    if not prod:
        return jsonify({"error": "Producto no encontrado"}), 404
    prod['disponible'] = prod['stock'] > 0
    return jsonify(prod)