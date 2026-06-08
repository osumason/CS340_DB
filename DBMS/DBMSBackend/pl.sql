



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
CREATE PROCEDURE sp_create_order_details(
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


DELIMITER ;