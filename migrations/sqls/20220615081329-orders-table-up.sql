/* Replace with your SQL commands */

CREATE TABLE orders_table (id SERIAL PRIMARY KEY, user_id INT, FOREIGN KEY (user_id) REFERENCES users_table(id), order_status VARCHAR(8));