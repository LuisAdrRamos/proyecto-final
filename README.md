# 📦 Proyecto Final - Aplicación Web Distribuida con Docker y Flask

Este proyecto implementa una aplicación web distribuida de gestión de inventario, desarrollada para la asignatura de **Aplicaciones Distribuidas (2025-A)** en la EPN.

## 🚀 Tecnologías utilizadas

- Python 3.9 + Flask
- MySQL 5.7 (Master y Slave)
- Docker + Docker Compose
- NGINX (Balanceo de carga por pesos)
- UTF-8 Full Support
- Autenticación por token (simple)

---

## 📁 Estructura del Proyecto

```
proyecto-final/
├── app/                    # Código Flask
│   ├── app.py
│   └── routes/
│       ├── __init__.py
│       ├── productos.py
│       └── usuarios.py
├── db/
│   ├── master/
│   │   ├── my.cnf
│   │   └── init.sql
│   └── slave/
│       └── my.cnf
├── nginx/
│   └── nginx.conf
└── docker-compose.yml
```

---

## 📦 Cómo clonar y ejecutar

```bash
git clone <REPO_URL>
cd proyecto-final
docker-compose up --build
```

> 💡 Usa `docker-compose down -v` para reiniciar con base de datos limpia.

---

## 🧑‍💻 Endpoints Disponibles

### Usuarios

- `POST /usuarios/login` — Login con username y password.
- `POST /usuarios/registrar` — Crear nuevo usuario.
- `GET /usuarios/` — Listar todos los usuarios.
- `PUT /usuarios/actualizar/<id>` — Actualizar usuario.
- `DELETE /usuarios/eliminar/<id>` — Eliminar usuario.

---

### Productos

- `GET /productos/` — Listar productos.
- `POST /productos/registrar` — Agregar producto.
- `PUT /productos/actualizar/<id>` — Actualizar producto.
- `DELETE /productos/eliminar/<id>` — Eliminar producto.
- `GET /productos/disponibilidad/<codigo>` — Consultar stock actual de un producto.

---

## 🧠 Notas

- Todos los endpoints usan codificación `utf8mb4` (tildes, ñ, emojis).
- Los datos en la base se replican automáticamente a `db_slave`.
- NGINX balancea tráfico entre 3 réplicas de Flask (`app1`, `app2`, `app3`).

---

## 🏁 Autor

- Proyecto académico desarrollado por Adrian Ramos y Josue Guerra.
- Escuela de Formación de Tecnólogos — EPN 2025