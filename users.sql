CREATE DATABASE quiz_users;

USE quiz_users;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    age INT
);

INSERT INTO users(name, surname, age) VALUES
('Abdul', 'Hamid', 22),
('Antony', 'Stivenson', 20),
('James', 'Shmidtd', 21),
('Annie', 'Macdonald', 25);