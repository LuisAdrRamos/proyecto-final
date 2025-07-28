# app.py
from flask import Flask, render_template, redirect, url_for
from flask_mysqldb import MySQL
import os

app = Flask(__name__)
app.secret_key = "supersecret"  # Necesario para sesiones y flash

# Config MySQL
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'db_master')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', 'root')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'inventario')
app.config['MYSQL_CHARSET'] = 'utf8mb4'

mysql = MySQL(app)
app.mysql = mysql

# Blueprints (HTML, no API REST)
from routes.usuarios import usuarios_bp
from routes.productos import productos_bp

app.register_blueprint(usuarios_bp, url_prefix='/usuarios')
app.register_blueprint(productos_bp, url_prefix='/productos')

@app.route('/')
def home():
    # Puedes mostrar un dashboard o redirigir directamente al listado
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0')
