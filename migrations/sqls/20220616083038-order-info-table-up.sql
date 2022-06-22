/* Replace with your SQL commands */

CREATE TABLE order_info_table (id SERIAL PRIMARY KEY, order_id INT, FOREIGN KEY (order_id) REFERENCES orders_table(id), product_id INT, FOREIGN KEY (product_id) REFERENCES products_table(id), amount INT);

