-- Creación de la base de datos.
CREATE DATABASE base_de_datos_notas;

-- Selección de la base de datos.
USE base_de_datos_notas;

-- Tabla de usuarios.
CREATE TABLE usuarios (
    id INT(11) NOT NULL,
    nombre_usuario VARCHAR(16) NOT NULL,
    contrasenia VARCHAR(60) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL
);

-- Se agrega una llave primaria en la columna 'id'.
ALTER TABLE
    usuarios
ADD
    PRIMARY KEY (id);

-- Se especifica que la columna id es autoincrementable y su valor inicial es 2.
ALTER TABLE
    usuarios
MODIFY
    id INT(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;

-- Mostrando la estructura de la tabla.
DESCRIBE usuarios;

-- Tabla notas.
CREATE TABLE notas (
    id INT(11) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    nota TEXT,
    usuario_id INT(11),
    creado_en timestamp NOT NULL DEFAULT current_timestamp,
    -- Se agrega una llave foránea en la columna usuario_id, que hace referencia a la columna id de la tabla usuarios
    CONSTRAINT fk_usuario FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

-- Se agrega una llave primaria en la columna id.
ALTER TABLE
    notas
ADD
    PRIMARY KEY (id);

-- Se especifica que la columna id es autoincrementable y su valor inicial es 2.
ALTER TABLE
    notas
MODIFY
    id INT(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;

-- Se muestra la estructura de la tabla usando DESCRIBE notas.
DESCRIBE notas;