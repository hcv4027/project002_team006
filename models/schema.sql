-- DROP DATABASE IF EXISTS exampledb;
-- CREATE DATABASE exampledb;

-- DROP DATABASE IF EXISTS testdb;
-- CREATE DATABASE testdb;
CREATE DATABASE project002_db;

USE project002_db;

CREATE TABLE users(
	id INT,
	users VARCHAR(15),
	games VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE games(
	name VARCHAR (50),
	id_val INTEGER,
    PRIMARY KEY (id_val)
)