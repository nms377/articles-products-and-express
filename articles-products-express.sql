DROP USER IF EXISTS "nicolesandry";

CREATE USER "nicolesandry" WITH PASSWORD 'password';

DROP DATABASE IF EXISTS "articles-products";

CREATE DATABASE "articles-products" OWNER "nicolesandry";

\c articles-products "nicolesandry";

DROP TABLE IF EXISTS products;

CREATE TABLE products(
	id serial NOT NULL PRIMARY KEY,
	product_name varchar(32) NULL,
	price integer NULL,
	inventory integer NOT NULL
);

CREATE TABLE articles(
	id serial NOT NULL PRIMARY KEY,
	title varchar(32) NULL,
	body varchar(250) NULL,
	author varchar(64) NULL,
	url_title varchar(200)
);