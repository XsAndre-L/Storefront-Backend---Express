/* Replace with your SQL commands */

CREATE TABLE products_table (id SERIAL PRIMARY KEY, name VARCHAR(64), price INT, category VARCHAR(32));

INSERT INTO products_table(name,price,category) VALUES('apple','5','fruit');
INSERT INTO products_table(name,price,category) VALUES('mango','11','fruit');