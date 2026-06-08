//DELETE vendor function helped by AI to enforce foreign key constriaint
//Dropdown functions for Orders page helped by AI



require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const db = require('./backend/db-connector');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


app.get('/debug', (req, res) => {
    res.json({
        message: "Server is live",
        directory: __dirname,
        pathExists: "Check terminal for ls results"
    });
});


//Port listener
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});



//======================
// Customer Routes
//======================

//Read Customers table
app.get('/api/customers', (req, res) => {
    const query = `
        SELECT customerID, customerName, phoneNumber, email
        FROM Customers
        ORDER BY customerName;
    `;
    db.pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Add customer
app.post('/api/customers', (req, res) => {
    const { customerName, phoneNumber, email } = req.body;
    const procedureQuery = 'CALL sp_insert_customer(?,?,?);';

    // Simple validation match based on DDL null constraints
    if (!customerName || !email) {
        return res.status(400).json({ error: "Name and email are required fields." });
    }

    db.pool.query(procedureQuery, [customerName, phoneNumber || null, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Stored procedure runtime failure." });
        }
        return res.json({ message: `Customer "${customerName}" successfully added.` });
    });

}
);

//Update customer
app.put('/api/customers/:id', (req, res) => {
    const customerID = req.params.id;
    const { customerName, phoneNumber, email } = req.body;

    if (!customerName || !email) {
        return res.status(400).json({ error: "Name and email are required fields." });
    }

    db.pool.query('CALL sp_update_customer(?,?,?,?)', [customerID, customerName, phoneNumber || null, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Stored procedure runtime failure." });
        }
        const affectedRows = result.affectedRows || (result[0] && result[0].affectedRows) || 0;
        if (affectedRows === 0) {
            return res.status(404).json({ error: "No customer records matched that ID." });
        }
        return res.json({ message: `Customer record ${customerID} successfully updated.` });
    });
});

// Delete individual customer
app.delete('/api/customers/:id', (req, res) => {
    const customerID = req.params.id;
    const procedureQuery = 'CALL sp_delete_customer(?);';

    db.pool.query(procedureQuery, [customerID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Stored procedure runtime failure." });
        }

        const affectedRows = result.affectedRows || (result[0] && result[0].affectedRows) || 0;

        if (affectedRows === 0) {
            return res.status(404).json({ error: "No customer records matched that ID." });
        }

        return res.json({ message: `Stored procedure successfully removed customer record ${customerID}.` });
    });
});


//======================
// Vendor Routes
//======================

// Read Vendors table
app.get('/api/vendors', (req, res) => {
    const query = 'SELECT vendorID, vendorName, contactEmail, phoneNumber FROM Vendors ORDER BY vendorID;';
    db.pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create vendor
app.post('/api/vendors', (req, res) => {
    const { vendorName, contactEmail, phoneNumber } = req.body;

    if (!vendorName) {
        return res.status(400).json({ error: "Vendor name is a required field." });
    }


    db.pool.query('CALL sp_insert_vendor(?,?,?)', [vendorName, contactEmail || null, phoneNumber || null], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: `Vendor "${vendorName}" successfully added.` });
    });
});

// Update vendor
app.put('/api/vendors/:id', (req, res) => {
    const vendorID = req.params.id;
    const { vendorName, contactEmail, phoneNumber } = req.body;

    if (!vendorName) {
        return res.status(400).json({ error: "Vendor name is required." });
    }

    db.pool.query('CALL sp_update_vendor(?,?,?,?)', [vendorID, vendorName, contactEmail || null, phoneNumber || null], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No vendor records matched that ID." });
        }
        return res.json({ message: `Vendor record ${vendorID} successfully updated.` });
    });
});

// Delete vendor
app.delete('/api/vendors/:id', (req, res) => {
    const vendorID = req.params.id;

    db.pool.query('CALL sp_delete_vendor(?)', [vendorID], (err, result) => {
        if (err) {
            console.error(err);
            // A FK constraint error means this vendor has products — surface that clearly
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({ error: "Cannot delete: this vendor has products assigned to them." });
            }
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No vendor records matched that ID." });
        }
        return res.json({ message: `Vendor record ${vendorID} successfully deleted.` });
    });
});


//======================
// Order Routes
//======================

app.get('/api/orders', (req, res) => {
    const query = `
    SELECT Orders.orderID, Customers.customerName, Orders.orderDate, Orders.totalCost
    FROM   Orders
    JOIN   Customers on Orders.customerID = Customers.customerID
    ORDER BY Orders.orderID; `;

    db.pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Dropdown: customers for order form
app.get('/api/customers/dropdown', (req, res) => {
    const query = 'SELECT customerID, customerName FROM Customers ORDER BY customerName;';
    db.pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create order
app.post('/api/orders', (req, res) => {
    const { customerID, orderDate, totalCost } = req.body;

    if (!customerID || !orderDate || !totalCost) {
        return res.status(400).json({ error: "Customer, date, and total cost are required fields." });
    }

    db.pool.query('CALL sp_insert_order(?,?,?)', [customerID, orderDate, totalCost], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Stored procedure runtime failure." });
        }
        return res.json({ message: `Order successfully added.` });
    });
});

// Read OrderDetails table, joins productName
app.get('/api/orderdetails', (req, res) => {
    const query = `
    SELECT OrderDetails.txnID, OrderDetails.orderID, Products.productName, OrderDetails.quantity
    FROM   OrderDetails
    JOIN   Products on OrderDetails.productID = Products.productID
    ORDER BY OrderDetails.txnID; `;

    db.pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    })

});

// Dropdown: orders for orderdetails forms
app.get('/api/orders/dropdown', (req, res) => {
    const query = 'SELECT orderID, orderDate, totalCost FROM Orders ORDER BY orderID;';
    db.pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create order detail
app.post('/api/orderdetails', (req, res) => {
    const { orderID, productID, quantity } = req.body;

    if (!orderID || !productID || !quantity) {
        return res.status(400).json({ error: "Order, product, and quantity are required fields." });
    }

    db.pool.query('CALL sp_insert_order_details(?,?,?)', [orderID, productID, quantity], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Stored procedure runtime failure." });
        }
        return res.json({ message: `Order detail successfully added.` });
    });
});

// Update order details
app.put('/api/orderdetails/:id', (req, res) => {
    const txnID = req.params.id;
    const { orderID, productID, quantity } = req.body;

    if (!orderID || !productID || !quantity) {
        return res.status(400).json({ error: "Order, product, and quantity are required fields." });
    }

    db.pool.query('CALL sp_update_order_details(?,?,?,?)', [txnID, orderID, productID, quantity], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Stored procedure runtime failure." });
        }
        const affectedRows = result.affectedRows || (result[0] && result[0].affectedRows) || 0;
        if (affectedRows === 0) {
            return res.status(404).json({ error: "No order detail records matched that ID." });
        }
        return res.json({ message: `Order detail record ${txnID} successfully updated.` });
    });
});





app.get('/api/products', (req, res) => {
    const query = `
        SELECT p.productID, p.productName, p.department, p.price, p.stockQuantity, v.vendorName
        FROM Products p
        JOIN Vendors v ON p.vendorID = v.vendorID
        ORDER BY p.productID;
    `;
    db.pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Dropdown: vendors for product forms
app.get('/api/vendors/dropdown', (req, res) => {
    const query = 'SELECT vendorID, vendorName FROM Vendors ORDER BY vendorName;';
    db.pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create product
app.post('/api/products', (req, res) => {
    const { productName, department, price, stockQuantity, vendorID } = req.body;

    if (!productName || !price || !stockQuantity || !vendorID) {
        return res.status(400).json({ error: "Product name, price, stock quantity, and vendor are required." });
    }

    db.pool.query('CALL sp_insert_product(?,?,?,?,?)', [productName, department || null, price, stockQuantity, vendorID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: `Product "${productName}" successfully added.` });
    });
});

// Update product
app.put('/api/products/:id', (req, res) => {
    const productID = req.params.id;
    const { productName, department, price, stockQuantity, vendorID } = req.body;

    if (!productName || !price || !stockQuantity || !vendorID) {
        return res.status(400).json({ error: "Product name, price, stock quantity, and vendor are required." });
    }

    db.pool.query('CALL sp_update_product(?,?,?,?,?,?)', [productID, productName, department || null, price, stockQuantity, vendorID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No product records matched that ID." });
        }
        return res.json({ message: `Product record ${productID} successfully updated.` });
    });
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
    const productID = req.params.id;

    db.pool.query('CALL sp_delete_product(?)', [productID], (err, result) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({ error: "Cannot delete: this product is referenced in existing order details." });
            }
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No product records matched that ID." });
        }
        return res.json({ message: `Product record ${productID} successfully deleted.` });
    });
});





// =====================================
// RESET DATABASE
// =====================================
app.post('/api/reset-db', (req, res) => {
    // Points directly to your live ddl.sql file
    const sqlFilePath = path.join(__dirname, 'backend', 'ddl.sql');

    fs.readFile(sqlFilePath, 'utf8', (err, sqlQueryText) => {
        if (err) {
            console.error("❌ File System Error:", err);
            return res.status(500).json({ error: "Could not find or read backend/ddl.sql file." });
        }

        // 1. SPLIT THE SCRIPT: Break the file down into individual SQL commands
        // This regex splits on semicolons while ignoring them inside strings/quotes
        const sqlStatements = sqlQueryText
            .split(/;(?=(?:[^']*'[^']*')*[^']*$)/)
            .map(statement => statement.trim())
            .filter(statement => statement.length > 0);

        console.log(`📖 Read ddl.sql smoothly. Prepared ${sqlStatements.length} distinct SQL commands to execute.`);

        // 2. GET A DEDICATED STREAM LINK
        db.pool.getConnection(async (connErr, connection) => {
            if (connErr) {
                console.error("❌ Pool Connection Error:", connErr);
                return res.status(500).json({ error: "Could not obtain a stable database link channel." });
            }

            try {
                // 3. EXECUTE STATEMENTS IN SEQUENCE
                for (let i = 0; i < sqlStatements.length; i++) {
                    const statement = sqlStatements[i];

                    // Skip any plain comment lines that slipped through
                    if (statement.startsWith('--') || statement.startsWith('/*')) continue;

                    await new Promise((resolve, reject) => {
                        connection.query(statement, (queryErr) => {
                            if (queryErr) {
                                console.error(`❌ Statement #${i + 1} failed to execute:`, statement);
                                reject(queryErr);
                            } else {
                                resolve();
                            }
                        });
                    });
                }

                // Everything executed cleanly!
                connection.release();

                if (typeof db.pool.drain === 'function') {
                    db.pool.drain();
                }

                console.log("✅ SUCCESS: Admin script execution loop finished without errors.");
                return res.json({ message: "Database wiped and cleanly re-seeded via sequential loop execution!" });

            } catch (loopError) {
                // Safely hand the link back to the pool even if a loop index fails
                connection.release();
                console.error("❌ Sequential Execution Crash:", loopError.message);
                return res.status(500).json({
                    error: "The SQL file failed to execute sequentially.",
                    details: loopError.message
                });
            }
        });
    });
});

