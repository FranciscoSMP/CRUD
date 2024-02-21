CREATE DATABASE base_de_datos_notas;

USE base_de_datos_notas;

-- Tabla de usuarios.

CREATE TABLE usuarios(
    id INT(11) NOT NULL,
    nombre_usuario VARCHAR(16) NOT NULL,
    contrasenia VARCHAR(60) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios
    ADD PRIMARY KEY (id);

ALTER TABLE usuarios
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE usuarios;

-- Tabla notas.

CREATE TABLE notas(
    id INT(11) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    nota TEXT,
    usuario_id INT(11),
    creado_en timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

ALTER TABLE notas
    ADD PRIMARY KEY (id);

ALTER TABLE notas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE notas;