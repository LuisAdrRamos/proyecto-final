# routes/productos.py
from flask import (
    Blueprint, request, render_template, redirect,
    url_for, flash, current_app, session
)
from functools import wraps
from MySQLdb.cursors import DictCursor

productos_bp = Blueprint('productos', __name__, template_folder='../templates/productos')

def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get('user_id'):
            flash("Debe iniciar sesión para continuar", "warning")
            return redirect(url_for('usuarios.login'))
        return view(*args, **kwargs)
    return wrapped

@productos_bp.route('/html')
@login_required
def listar():
    mysql = current_app.mysql
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("SELECT id, codigo, nombre, descripcion, unidad, categoria, stock FROM productos")
    productos = cur.fetchall()
    cur.close()
    return render_template('productos/listar.html', productos=productos)

@productos_bp.route('/html/crear', methods=['GET', 'POST'])
@login_required
def crear():
    if request.method == 'POST':
        mysql = current_app.mysql
        f = request.form
        try:
            cur = mysql.connection.cursor()
            cur.execute("""INSERT INTO productos
                        (codigo, nombre, descripcion, unidad, categoria, stock)
                        VALUES (%s,%s,%s,%s,%s,%s)""",
                        (f['codigo'], f['nombre'], f['descripcion'],
                        f['unidad'], f['categoria'], f['stock']))
            mysql.connection.commit()
            cur.close()
            flash('Producto creado', 'success')
            return redirect(url_for('productos.listar'))
        except Exception as e:
            flash(f'Error: {e}', 'danger')
    return render_template('productos/form.html', producto=None)

@productos_bp.route('/html/<int:id>/editar', methods=['GET', 'POST'])
@login_required
def editar(id):
    mysql = current_app.mysql
    cur = mysql.connection.cursor(DictCursor)

    if request.method == 'POST':
        f = request.form
        try:
            cur.execute("""UPDATE productos
                            SET codigo=%s, nombre=%s, descripcion=%s,
                            unidad=%s, categoria=%s, stock=%s
                            WHERE id=%s""",
                        (f['codigo'], f['nombre'], f['descripcion'],
                        f['unidad'], f['categoria'], f['stock'], id))
            mysql.connection.commit()
            cur.close()
            flash('Producto actualizado', 'success')
            return redirect(url_for('productos.listar'))
        except Exception as e:
            flash(f'Error: {e}', 'danger')

    cur.execute("SELECT id, codigo, nombre, descripcion, unidad, categoria, stock FROM productos WHERE id=%s", (id,))
    producto = cur.fetchone()
    cur.close()
    if not producto:
        flash('Producto no encontrado', 'warning')
        return redirect(url_for('productos.listar'))

    return render_template('productos/form.html', producto=producto)

@productos_bp.route('/html/<int:id>/eliminar', methods=['POST'])
@login_required
def eliminar(id):
    mysql = current_app.mysql
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM productos WHERE id=%s", (id,))
        mysql.connection.commit()
        cur.close()
        flash('Producto eliminado', 'info')
    except Exception as e:
        flash(f'Error: {e}', 'danger')
    return redirect(url_for('productos.listar'))
