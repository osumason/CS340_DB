



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

    const procedureQuery = 'CALL sp_update_customer(?, ?, ?, ?);';
    db.pool.query(procedureQuery, [customerID, customerName, phoneNumber || null, email], (err, result) => {
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







// READ: Fetch all vendors from DML.sql
app.get('/api/vendors', (req, res) => {
    const query = 'SELECT vendorID, vendorName, contactEmail, phoneNumber FROM Vendors ORDER BY vendorID;';
    db.pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// READ: Fetch all products from DML.sql
app.get('/api/products', (req, res) => {
    const query = 'SELECT productID, productName, department, price, stockQuantity, vendorID FROM Products ORDER BY productID;';
    db.pool.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});







// =====================================
// ADMIN UTILITY ROUTE: RESET DATABASE
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

