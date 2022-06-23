/* Replace with your SQL commands */

CREATE TABLE products_table (id SERIAL PRIMARY KEY, name VARCHAR(64), price INT, category VARCHAR(32), popularity INT);

INSERT INTO products_table(name,price,category, popularity) VALUES('apple',5,'fruit', 0);
INSERT INTO products_table(name,price,category, popularity) VALUES('mango',11,'fruit', 0);
INSERT INTO products_table(name,price,category, popularity) VALUES('carrot',3,'vegetables', 0);
INSERT INTO products_table(name,price,category, popularity) VALUES('bean',0.5,'vegetables', 0);
