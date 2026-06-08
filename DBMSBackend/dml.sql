-- CS340 Project Step 3
-- Data Manipulation Queries (DML.sql)
-- Group Members: Swathi Pappoppula + Mason Antram
--
-- Variables are denoted using @variableInput syntax.

-- =====================================
-- CUSTOMERS
-- =====================================

-- Browse: all customers (base SELECT).
SELECT customerID, customerName, phoneNumber, email
FROM Customers
ORDER BY customerID;

-- Browse: customers for website table display.
SELECT customerID, customerName, phoneNumber, email
FROM Customers
ORDER BY customerID;

-- Retrieve one customer for update form.
SELECT customerID, customerName, phoneNumber, email
FROM Customers
WHERE customerID = @customerIDInput;

-- Create a new customer.
INSERT INTO Customers (
    customerName,
    phoneNumber,
    email
)
VALUES (
    @customerNameInput,
    @phoneNumberInput,
    @emailInput
);

-- Update customer information.
UPDATE Customers
SET
    customerName = @customerNameInput,
    phoneNumber = @phoneNumberInput,
    email = @emailInput
WHERE customerID = @customerIDInput;

-- Delete a customer.
DELETE FROM Customers
WHERE customerID = @customerIDInput;


-- =====================================
-- VENDORS
-- =====================================

-- Browse: all vendors (base SELECT).
SELECT vendorID, vendorName, contactEmail, phoneNumber
FROM Vendors
ORDER BY vendorID;

-- Browse: vendors for website table display.
SELECT vendorID, vendorName, contactEmail, phoneNumber
FROM Vendors
ORDER BY vendorID;

-- Retrieve one vendor for update form.
SELECT vendorID, vendorName, contactEmail, phoneNumber
FROM Vendors
WHERE vendorID = @vendorIDInput;

-- Create a new vendor.
INSERT INTO Vendors (
    vendorName,
    contactEmail,
    phoneNumber
)
VALUES (
    @vendorNameInput,
    @contactEmailInput,
    @phoneNumberInput
);

-- Update vendor information.
UPDATE Vendors
SET
    vendorName = @vendorNameInput,
    contactEmail = @contactEmailInput,
    phoneNumber = @phoneNumberInput
WHERE vendorID = @vendorIDInput;

-- Delete a vendor.
DELETE FROM Vendors
WHERE vendorID = @vendorIDInput;


-- =====================================
-- PRODUCTS
-- =====================================

-- Browse: all products (base SELECT).
SELECT productID, productName, department, price, stockQuantity, vendorID
FROM Products
ORDER BY productID;

-- Browse: products with vendor name for website table display.
SELECT
    p.productID,
    p.productName,
    p.department,
    p.price,
    p.stockQuantity,
    v.vendorName
FROM Products p
JOIN Vendors v ON p.vendorID = v.vendorID
ORDER BY p.productID;

-- Dropdown: vendors for product create/update forms.
SELECT vendorID, vendorName
FROM Vendors
ORDER BY vendorName;

-- Retrieve one product for update form.
SELECT productID, productName, department, price, stockQuantity, vendorID
FROM Products
WHERE productID = @productIDInput;

-- Create a new product.
INSERT INTO Products (
    productName,
    department,
    price,
    stockQuantity,
    vendorID
)
VALUES (
    @productNameInput,
    @departmentInput,
    @priceInput,
    @stockQuantityInput,
    @vendorIDInput
);

-- Update product information.
UPDATE Products
SET
    productName = @productNameInput,
    department = @departmentInput,
    price = @priceInput,
    stockQuantity = @stockQuantityInput,
    vendorID = @vendorIDInput
WHERE productID = @productIDInput;

-- Delete a product.
DELETE FROM Products
WHERE productID = @productIDInput;


-- =====================================
-- ORDERS
-- =====================================

-- Browse: all orders (base SELECT).
SELECT orderID, customerID, orderDate, totalCost
FROM Orders
ORDER BY orderID;

-- Browse: orders with customer name for website table display.
SELECT
    o.orderID,
    c.customerName,
    o.orderDate,
    o.totalCost
FROM Orders o
JOIN Customers c ON o.customerID = c.customerID
ORDER BY o.orderID;

-- Dropdown: customers for order create/update forms.
SELECT customerID, customerName
FROM Customers
ORDER BY customerName;

-- Retrieve one order for update form.
SELECT orderID, customerID, orderDate, totalCost
FROM Orders
WHERE orderID = @orderIDInput;

-- Create a new order.
INSERT INTO Orders (
    customerID,
    orderDate,
    totalCost
)
VALUES (
    @customerIDInput,
    @orderDateInput,
    @totalCostInput
);

-- Update order information.
UPDATE Orders
SET
    customerID = @customerIDInput,
    orderDate = @orderDateInput,
    totalCost = @totalCostInput
WHERE orderID = @orderIDInput;

-- Delete an order.
DELETE FROM Orders
WHERE orderID = @orderIDInput;


-- =====================================
-- ORDER DETAILS
-- =====================================

-- Browse: all order details (base SELECT).
SELECT txnID, orderID, productID, quantity
FROM OrderDetails
ORDER BY txnID;

-- Browse: order details with readable names for website table display.
SELECT
    od.txnID,
    od.orderID,
    p.productName,
    od.quantity
FROM OrderDetails od
JOIN Products p ON od.productID = p.productID
ORDER BY od.txnID;

-- Dropdown: orders for order detail create/update forms.
SELECT orderID, orderDate, totalCost
FROM Orders
ORDER BY orderID;

-- Dropdown: products for order detail create/update forms.
SELECT productID, productName
FROM Products
ORDER BY productName;

-- Retrieve one order detail for update form.
SELECT txnID, orderID, productID, quantity
FROM OrderDetails
WHERE txnID = @txnIDInput;

-- Create a new order detail entry.
INSERT INTO OrderDetails (
    orderID,
    productID,
    quantity
)
VALUES (
    @orderIDInput,
    @productIDInput,
    @quantityInput
);

-- Update order detail information.
UPDATE OrderDetails
SET
    orderID = @orderIDInput,
    productID = @productIDInput,
    quantity = @quantityInput
WHERE txnID = @txnIDInput;

-- Delete an order detail.
DELETE FROM OrderDetails
WHERE txnID = @txnIDInput;
