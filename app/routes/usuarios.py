# routes/usuarios.py
from flask import (
    Blueprint, request, render_template, redirect,
    url_for, flash, current_app, session
)
from functools import wraps
from MySQLdb.cursors import DictCursor

usuarios_bp = Blueprint('usuarios', __name__, template_folder='../templates/usuarios')

def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get('user_id'):
            flash("Debe iniciar sesión para continuar", "warning")
            return redirect(url_for('usuarios.login'))
        return view(*args, **kwargs)
    return wrapped

@usuarios_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        mysql = current_app.mysql
        username = request.form.get('username')
        password = request.form.get('password')

        cur = mysql.connection.cursor(DictCursor)
        cur.execute("SELECT id, username FROM usuarios WHERE username=%s AND password=%s",
                    (username, password))
        user = cur.fetchone()
        cur.close()

        if user:
            session['user_id'] = user['id']
            session['username'] = user['username']
            flash('Login exitoso', 'success')
            return redirect(url_for('productos.listar'))
        flash('Credenciales inválidas', 'danger')

    return render_template('login.html')

@usuarios_bp.route('/logout', methods=['GET'])
def logout():
    session.clear()
    flash('Sesión cerrada', 'info')
    return redirect(url_for('usuarios.login'))

@usuarios_bp.route('/html')
@login_required
def listar():
    mysql = current_app.mysql
    cur = mysql.connection.cursor(DictCursor)
    cur.execute("SELECT id, username FROM usuarios")
    usuarios = cur.fetchall()
    cur.close()
    return render_template('usuarios/listar.html', usuarios=usuarios)

@usuarios_bp.route('/html/crear', methods=['GET', 'POST'])
@login_required
def crear():
    if request.method == 'POST':
        mysql = current_app.mysql
        f = request.form
        try:
            cur = mysql.connection.cursor()
            cur.execute(
                "INSERT INTO usuarios (username, password) VALUES (%s, %s)",
                (f['username'], f['password'])
            )
            mysql.connection.commit()
            cur.close()
            flash('Usuario creado', 'success')
            return redirect(url_for('usuarios.listar'))
        except Exception as e:
            flash(f'Error: {e}', 'danger')
    return render_template('usuarios/form.html', usuario=None)

@usuarios_bp.route('/html/<int:id>/editar', methods=['GET', 'POST'])
@login_required
def editar(id):
    mysql = current_app.mysql
    cur = mysql.connection.cursor(DictCursor)

    if request.method == 'POST':
        f = request.form
        try:
            cur.execute(
                "UPDATE usuarios SET username=%s, password=%s WHERE id=%s",
                (f['username'], f['password'], id)
            )
            mysql.connection.commit()
            cur.close()
            flash('Usuario actualizado', 'success')
            return redirect(url_for('usuarios.listar'))
        except Exception as e:
            flash(f'Error: {e}', 'danger')

    cur.execute("SELECT id, username, password FROM usuarios WHERE id=%s", (id,))
    usuario = cur.fetchone()
    cur.close()
    if not usuario:
        flash('Usuario no encontrado', 'warning')
        return redirect(url_for('usuarios.listar'))

    return render_template('usuarios/form.html', usuario=usuario)

@usuarios_bp.route('/html/<int:id>/eliminar', methods=['POST'])
@login_required
def eliminar(id):
    mysql = current_app.mysql
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM usuarios WHERE id=%s", (id,))
        mysql.connection.commit()
        cur.close()
        flash('Usuario eliminado', 'info')
    except Exception as e:
        flash(f'Error: {e}', 'danger')
    return redirect(url_for('usuarios.listar'))