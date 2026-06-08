/* Project Two Draft: Sample Data
Project by Swathi Pappoppula + Mason Antram
Sample data by Mason Antram 4/30/26 */

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 1;

DROP TABLE IF EXISTS OrderDetails;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Vendors;
DROP TABLE IF EXISTS Customers;

CREATE TABLE Customers (
customerID int AUTO_INCREMENT UNIQUE NOT NULL,
customerName varchar(100) NOT NULL,
phoneNumber varchar(15),
email varchar(100) UNIQUE NOT NULL,

PRIMARY KEY (customerID)
);

CREATE TABLE Orders (
    orderID int AUTO_INCREMENT UNIQUE NOT NULL,
    customerID int NOT NULL,
    orderDate DATE NOT NULL,
    totalCost decimal(10,2) NOT NULL,

    PRIMARY KEY (orderID),
    FOREIGN KEY (customerID) REFERENCES Customers (customerID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Vendors (
    vendorID int AUTO_INCREMENT UNIQUE NOT NULL,
    vendorName varchar(100) NOT NULL,
    contactEmail varchar(100),
    phoneNumber varchar(15),

    PRIMARY KEY (vendorID)
);

CREATE TABLE Products (
    productID int AUTO_INCREMENT UNIQUE NOT NULL,
    productName varchar(100) NOT NULL,
    department varchar(50),
    price decimal(10,2) NOT NULL,
    stockQuantity int NOT NULL,
    vendorID int NOT NULL,

    PRIMARY KEY (productID),
    FOREIGN KEY (vendorID) REFERENCES Vendors (vendorID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE OrderDetails (
    txnID int AUTO_INCREMENT UNIQUE NOT NULL,
    orderID int NOT NULL,
    productID int NOT NULL,
    quantity int NOT NULL,

    PRIMARY KEY (txnID),
    FOREIGN KEY (orderID) REFERENCES Orders (orderID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (productID) REFERENCES Products (productID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

INSERT INTO Customers (
    customerName,
    phoneNumber,
    email
)
VALUES (
    'Mason Antram',
    '541-556-3352',
    'antramm@oregonstate.edu'
),
(
    'Swathi Pappoppula',
    '541-123-4567',
    'pappopps@oregonstate.edu'
),
(
    'Jenny Sample',
    '458-687-5309',
    'tutone@gmail.com'
);

INSERT INTO Vendors (
    vendorName,
    contactEmail,
    phoneNumber
)
VALUES (
    'Potato Wholesale',
    'wholesalepotato@yahoo.com',
    '800-888-5555'
),
(
    'Mercantile Goods Inc.',
    'mercantilegoods@hotmail.com',
    '541-357-1593'

),
(
    'Rocket Co.',
    'definitelynotteamrocket@aol.com',
    '800-404-2020'
);

INSERT INTO Products (
    productName,
    department,
    price,
    stockQuantity,
    vendorID
)
VALUES (
    'Maximum Feed Seed',
    'Farm and Yard',
    44.99,
    50,
    (SELECT vendorID FROM Vendors WHERE vendorName = 'Potato Wholesale' LIMIT 1)
),
(
    'Steves Blinker Oil',
    'Automotive',
    18.99,
    100,
    (SELECT vendorID FROM Vendors WHERE vendorName = 'Mercantile Goods Inc.' LIMIT 1)
),
(
    'Rocket Fuel Energy Drink',
    'Grocery',
    2.99,
    500,
    (SELECT vendorID FROM Vendors WHERE vendorName = 'Rocket Co.' LIMIT 1)
);

INSERT INTO Orders (
    customerID,
    orderDate,
    totalCost
)
VALUES (
    (SELECT customerID FROM Customers WHERE email = 'antramm@oregonstate.edu' LIMIT 1),
    '2026-04-29',
    49.98
),
(
    (SELECT customerID FROM Customers WHERE email = 'pappopps@oregonstate.edu' LIMIT 1),
    '2026-03-10',
    18.99
),
(
    (SELECT customerID FROM Customers WHERE email = 'tutone@gmail.com' LIMIT 1),
    '2026-04-19',
    8.97
);

INSERT INTO OrderDetails (
    orderID,
    productID,
    quantity
)
VALUES
(
    (
        SELECT orderID
        FROM Orders
        WHERE customerID = (SELECT customerID FROM Customers WHERE email = 'antramm@oregonstate.edu' LIMIT 1)
          AND orderDate = '2026-04-29'
          AND totalCost = 49.98
        LIMIT 1
    ),
    (SELECT productID FROM Products WHERE productName = 'Maximum Feed Seed' LIMIT 1),
    2
),
(
    (
        SELECT orderID
        FROM Orders
        WHERE customerID = (SELECT customerID FROM Customers WHERE email = 'pappopps@oregonstate.edu' LIMIT 1)
          AND orderDate = '2026-03-10'
          AND totalCost = 18.99
        LIMIT 1
    ),
    (SELECT productID FROM Products WHERE productName = 'Steves Blinker Oil' LIMIT 1),
    1
),
(
    (
        SELECT orderID
        FROM Orders
        WHERE customerID = (SELECT customerID FROM Customers WHERE email = 'tutone@gmail.com' LIMIT 1)
          AND orderDate = '2026-04-19'
          AND totalCost = 8.97
        LIMIT 1
    ),
    (SELECT productID FROM Products WHERE productName = 'Rocket Fuel Energy Drink' LIMIT 1),
    3
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;