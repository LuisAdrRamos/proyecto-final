# routes/usuarios.py
from flask import Blueprint, request, jsonify, current_app
import MySQLdb
from MySQLdb.cursors import DictCursor
import uuid

usuarios_bp = Blueprint('usuarios', __name__)

active_tokens = {}

@usuarios_bp.route('/login', methods=['POST'])
def login():
    mysql = current_app.mysql
    data = request.json
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("SELECT * FROM usuarios WHERE username=%s AND password=%s", (data['username'], data['password']))
    user = cur.fetchone()
    cur.close()

    if user:
        token = str(uuid.uuid4())
        active_tokens[token] = user['id']
        return jsonify({"token": token})
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401

@usuarios_bp.route('/verificar-token', methods=['GET'])
def verificar_token():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if token in active_tokens:
        return jsonify({"valido": True})
    return jsonify({"valido": False}), 401

# exportamos los tokens activos para que productos.py los pueda verificar
def get_active_tokens():
    return active_tokens

@usuarios_bp.route('/', methods=['GET'])
def listar_usuarios():
    mysql = current_app.mysql
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("SELECT id, username FROM usuarios")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@usuarios_bp.route('/registrar', methods=['POST'])
def registrar_usuario():
    mysql = current_app.mysql
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO usuarios (username, password) VALUES (%s, %s)",
            (data['username'], data['password'])
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Usuario registrado"}), 201
    except MySQLdb.IntegrityError as e:
        if e.args[0] == 1062:
            return jsonify({"error": "El username ya existe"}), 409
        return jsonify({"error": str(e)}), 400

@usuarios_bp.route('/actualizar/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    mysql = current_app.mysql
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "UPDATE usuarios SET username=%s, password=%s WHERE id=%s",
            (data['username'], data['password'], id)
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Usuario actualizado"})
    except MySQLdb.IntegrityError as e:
        if e.args[0] == 1062:
            return jsonify({"error": "El username ya existe"}), 409
        return jsonify({"error": str(e)}), 400

@usuarios_bp.route('/eliminar/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    mysql = current_app.mysql
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM usuarios WHERE id=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Usuario eliminado"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400