CREATE DATABASE IF NOT EXISTS inventario
    CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE inventario;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) CHARACTER SET utf8mb4 NOT NULL,
    password VARCHAR(100) NOT NULL,
    UNIQUE KEY uq_usuarios_username (username)
);

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL,
    nombre VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL,
    descripcion TEXT CHARACTER SET utf8mb4,
    unidad VARCHAR(20) CHARACTER SET utf8mb4,
    categoria VARCHAR(50) CHARACTER SET utf8mb4,
    stock INT NOT NULL DEFAULT 0,
    UNIQUE KEY uq_productos_codigo (codigo),
    UNIQUE KEY uq_productos_nombre (nombre)
);

INSERT INTO usuarios (username, password) VALUES
('admin', 'admin123'),
('josue', 'prueba');

INSERT INTO productos (codigo, nombre, descripcion, unidad, categoria, stock) VALUES
('PRD001', 'Laptop Lenovo', 'Laptop Core i5 8GB RAM', 'unidad', 'electronica', 5),
('PRD002', 'Mouse inalambrico', 'Mouse ergonomico USB', 'unidad', 'accesorios', 10);
