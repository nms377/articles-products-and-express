DROP USER IF EXISTS "nicolesandry";

CREATE USER "nicolesandry" WITH PASSWORD 'password';

DROP DATABASE IF EXISTS "products";

CREATE DATABASE "products" OWNER "nicolesandry";

\c products "nicolesandry";

DROP TABLE IF EXISTS products;

CREATE TABLE products(
	id serial NOT NULL PRIMARY KEY,
	product_name varchar(100) NULL,
	price integer NULL,
	inventory integer NOT NULL
);