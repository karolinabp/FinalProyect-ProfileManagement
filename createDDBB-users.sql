create database users;

use users;

CREATE TABLE UserType (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(40) UNIQUE KEY NOT NULL
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    firstName VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    userTypeId INT,
    FOREIGN KEY (userTypeId) REFERENCES UserType(id)
);
