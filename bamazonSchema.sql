DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 'rubiks cube', 'toys', 9.00, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, 'mcbook pro 15"', 'electronics', 900.00, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, 'uline army back pack', 'outdoors', 79.00, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, 'jabra elite active 65t', 'electronics', 151.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, 'instant pot 7-in-1 multi-cooker', 'appliances', 79.95, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, 'echo dot', 'electronics', 49.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, 'fire tv stick 4k', 'electronics', 39.99, 100);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, 'fire hd 8 tablet with Alexa', 'electronics', 49.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, 'if you can read this bring me wine socks', 'clothes', 11.89, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, 'hasbro conncet 4 game', 'toys', 9.99, 100);


UPDATE `bamazonDB`.`products` SET `price` = '9.99' WHERE (`id` = '1');
UPDATE `bamazonDB`.`products` SET `price` = '903.99' WHERE (`id` = '2');