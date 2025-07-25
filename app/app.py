# app.py
from flask import Flask
from flask_mysqldb import MySQL
import os

# Inicializar app y config
app = Flask(__name__)
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'db_master')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', 'root')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'inventario')
app.config['MYSQL_CHARSET'] = 'utf8mb4'

# Inicializar conexión MySQL
mysql = MySQL(app)
app.mysql = mysql

# Registrar Blueprints
from routes.usuarios import usuarios_bp
from routes.productos import productos_bp

app.register_blueprint(usuarios_bp, url_prefix='/usuarios')
app.register_blueprint(productos_bp, url_prefix='/productos')

if __name__ == "__main__":
    app.run(host='0.0.0.0')