-- CS340 Portfolio Project — Stored Procedures (pl.sql)
-- Team: Swathi Pappoppula & Mason Antram
--
-- Citation:
-- 1) Scope: Entire pl.sql file — all stored procedures (sp_insert_*, sp_update_*, sp_delete_*)
-- 2) Date: Spring 2026
-- 3) Originality: Original work by Swathi Pappoppula and Mason Antram

DELIMITER //

--Customer stored procedures

DROP PROCEDURE IF EXISTS sp_insert_customer //
CREATE PROCEDURE sp_insert_customer(
    IN param_customerName   VARCHAR(100),
    IN param_phoneNumber    VARCHAR(15),
    IN param_email          VARCHAR(100)
)
BEGIN
    INSERT INTO Customers (customerName, phoneNumber, email)
    VALUES (param_customerName, param_phoneNumber, param_email);
END//

DROP PROCEDURE IF EXISTS sp_update_customer//
CREATE PROCEDURE sp_update_customer(
    IN param_customerID     INT,
    IN param_customerName   VARCHAR(100),
    IN param_phoneNumber    VARCHAR(15),
    IN param_email          VARCHAR(100)
)
BEGIN
    UPDATE Customers
    SET customerName = param_customerName,
        phoneNumber  = param_phoneNumber,
        email        = param_email
    WHERE customerID = param_customerID;
END//

DROP PROCEDURE IF EXISTS sp_delete_customer//
CREATE PROCEDURE sp_delete_customer(
    IN targetID             INT
    )
BEGIN
    DELETE FROM Customers 
    WHERE customerID = targetID;
END//


-- Vendors stored procedures

DROP PROCEDURE IF EXISTS sp_insert_vendor//
CREATE PROCEDURE sp_insert_vendor(
    IN param_vendorName     VARCHAR(100),
    IN param_contactEmail   VARCHAR(100),
    IN param_phoneNumber    varchar(15)
)
BEGIN
    INSERT INTO Vendors (vendorName, contactEmail, phoneNumber)
    VALUES (param_vendorName, param_contactEmail, param_phoneNumber);
END//

DROP PROCEDURE IF EXISTS sp_update_vendor//
CREATE PROCEDURE sp_update_vendor(
    IN param_vendorID       INT,
    IN param_vendorName     VARCHAR(100),
    IN param_contactEmail   VARCHAR(100),
    IN param_phoneNumber    VARCHAR(100)
)
BEGIN
    UPDATE Vendors
    SET vendorName   = param_vendorName,
        contactEmail = param_contactEmail,
        phoneNumber  = param_phoneNumber
    WHERE vendorID   = param_vendorID;
END//

DROP PROCEDURE IF EXISTS sp_delete_vendor//
CREATE PROCEDURE sp_delete_vendor(
    IN param_vendorID       INT
)
BEGIN
    DELETE FROM Vendors
    WHERE vendorID = param_vendorID;
END//


--Orders stored procedures

DROP PROCEDURE IF EXISTS sp_insert_order//
CREATE PROCEDURE sp_insert_order(
    IN param_customerID     INT,
    IN param_orderDate      DATE,
    IN param_totalCost      DECIMAL(10,2)
)
BEGIN
    INSERT INTO Orders (customerID, orderDate, totalCost)
    VALUES (param_customerID, param_orderDate, param_totalCost);
END//


-- Order Details stored procedures

DROP PROCEDURE IF EXISTS sp_insert_order_details//
CREATE PROCEDURE sp_insert_order_details(
    IN param_orderID        INT,
    IN param_productID      INT,
    IN param_quantity       INT
)
BEGIN
    INSERT INTO OrderDetails (orderID, productID, quantity)
    VALUES (param_orderID, param_productID, param_quantity);
END//

DROP PROCEDURE IF EXISTS sp_update_order_details//
CREATE PROCEDURE sp_update_order_details(
    IN param_txnID          INT,
    IN param_orderID        INT,
    IN param_productID      INT,
    IN param_quantity       INT
)
BEGIN
    UPDATE OrderDetails
    SET orderID = param_orderID,
        productID = param_productID,
        quantity = param_quantity
    WHERE txnID = param_txnID;
END//

DROP PROCEDURE IF EXISTS sp_delete_order_details//
CREATE PROCEDURE sp_delete_order_details(
    IN param_txnID          INT
)
BEGIN
    DELETE FROM OrderDetails
    WHERE txnID = param_txnID;
END//

-- Product stored procedures

DROP PROCEDURE IF EXISTS sp_insert_product
CREATE PROCEDURE sp_insert_product(
    IN param_productName    VARCHAR(100),
    IN param_department     VARCHAR(50),
    IN param_price          DECIMAL(10,2),
    IN param_stockQuantity  INT,
    in param_vendorID       INT
)
BEGIN
    INSERT INTO Products (productName, department, price, stockQuantity, vendorID)
    VALUES (param_productName, param_department, param_price, param_stockQuantity, param_vendorID);
END//

DROP PROCEDURE IF EXISTS sp_update_product
CREATE PROCEDURE sp_update_product(
    IN param_productID      INT,
    IN param_productName    VARCHAR(100),
    IN param_department     VARCHAR(50),
    IN param_price          DECIMAL(10,2),
    IN param_stockQuantity  INT,
    in param_vendorID       INT
)
BEGIN
    UPDATE Products
    SET productName   = param_productName,
        department    = param_department,
        price         = param_price,
        stockQuantity = param_vendorID
    WHERE productID = param_productID;
END//

DROP PROCEDURE IF EXISTS sp_delete_product
CREATE PROCEDURE  sp_delete_product(
    IN param_productID      INT
)
BEGIN
    DELETE FROM Products
    WHERE productID = param_productID;
END//

DELIMITER ;
