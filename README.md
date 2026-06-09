# Mister Rogers' Mercantile

### CS340 Portfolio Project

**Course:** CS340 – Introduction to Databases
**Term:** Spring 2026
**Team:** Swathi Pappoppula & Mason Antram
**Repository:** https://github.com/osumason/CS340_DB

---

## Project Overview

Mister Rogers' Mercantile is a web-based inventory and customer relationship management system designed for a small retail store. The application allows users to manage customers, vendors, products, orders, and order details through a simple web interface backed by a MySQL database.

The system demonstrates full CRUD functionality across multiple related entities and includes support for many-to-many relationships through an intersection table.

---

## Live Website

**Hosted Application:** *http://classwork.engr.oregonstate.edu:5050/*

---

## Database Design

### Tables

| Table        | Purpose                                     |
| ------------ | ------------------------------------------- |
| Customers    | Store customer records                      |
| Vendors      | Product supplier records                    |
| Products     | Items sold by the store                     |
| Orders       | Customer purchase records                   |
| OrderDetails | Links products to orders (M:N relationship) |

### Relationships

* Customers → Orders (1:M)
* Vendors → Products (1:M)
* Orders ↔ Products (M:N via OrderDetails)

---

### File Descriptions

| File    | Description                           |
| ------- | ------------------------------------- |
| app.js  | Express server and API routes         |
| ddl.sql | Database schema and sample data       |
| dml.sql | SQL query reference file              |
| pl.sql  | Stored procedures for CRUD operations |
| App.css | Application styling                   |

---

## Features

### Customers

* View customers
* Add customers
* Delete customers
* Update customers *(currently requires additional fixes)*

### Vendors

* View vendors
* Add vendors
* Update vendors
* Delete vendors

### Products

* View products
* Add products
* Update products
* Delete products

### Orders

* View orders
* Create orders using customer dropdown selection

### Order Details

* Many-to-many relationship management between Orders and Products
* CRUD functionality currently in progress

### Utilities

* Reset database to original sample data

---

## Citations

Citations below mirror the headers in each source file. Non-original work is labeled **AI Citation**; team-authored work is labeled **Citation**.

---

### Customers.html

**AI Citation**
1) Scope: Inline `<script>` block (loadCustomers, add/update/delete form event listeners, fetch calls to `/api/customers`)
2) Date: May 28, 2026
3) Originality: Adapted from Google Gemini-generated code
4) Source: https://gemini.google.com

**Citation**
1) Scope: HTML structure, navigation, forms, and table markup
2) Date: Spring 2026
3) Originality: Original work by Mason Antram

---

### Vendors.html

**AI Citation**
1) Scope: `loadVendors()` function and READ/table-display logic in inline `<script>`
2) Date: May 28, 2026
3) Originality: Adapted from Google Gemini-generated code
4) Source: https://gemini.google.com

**Citation**
1) Scope: HTML structure, navigation, forms, and add/update/delete event listeners (excluding `loadVendors`)
2) Date: Spring 2026
3) Originality: Original work by Mason Antram

---

### Products.html

**AI Citation**
1) Scope: `loadProducts()` function in inline `<script>`
2) Date: May 28, 2026
3) Originality: Adapted from Google Gemini-generated code
4) Source: https://gemini.google.com

**Citation**
1) Scope: HTML structure, navigation, forms, and table markup
2) Date: Spring 2026
3) Originality: Original work by Mason Antram

---

### index.html

**AI Citation**
1) Scope: Inline `<script>` block — Reset Database button click handler and fetch call to `/api/reset-db`
2) Date: May 28, 2026
3) Originality: Adapted from Google Gemini-generated code
4) Source: https://gemini.google.com

**Citation**
1) Scope: HTML structure, navigation, and Admin Database Tools section markup
2) Date: Spring 2026
3) Originality: Original work by Mason Antram

---

### Orders.html

**Citation**
1) Scope: Entire file — HTML structure, order table display, add-order form, customer dropdown, and inline `<script>`
2) Date: Spring 2026
3) Originality: Original work by Mason Antram

---

### AddOrderDetails.html

**Citation**
1) Scope: Entire file — HTML structure, order details table, and add form markup
2) Date: Spring 2026
3) Originality: Original work by Mason Antram

---

### App.css

**AI Citation**
1) Scope: Initial color palette, typography, and baseline layout styles (`body`, `.navBar`, `.page`, `.form`)
2) Date: May 2026
3) Originality: Adapted from Google Gemini styling suggestions; page element IDs and all subsequent revisions are original work by Mason Antram. Some changes were made to the code to make it more readable and easier to understand.
4) Source: https://gemini.google.com

**Citation**
1) Scope: Page element IDs and CSS revisions beyond initial Gemini suggestions
2) Date: Spring 2026
3) Originality: Original work by Mason Antram

---

### app.js

**AI Citation**
1) Scope: `DELETE /api/vendors/:id` route — foreign-key constraint error handling (`ER_ROW_IS_REFERENCED_2`)
2) Date: May 2026
3) Originality: Adapted from AI-generated suggestions
4) Source: https://gemini.google.com

**AI Citation**
1) Scope: Dropdown API routes — `GET /api/customers/dropdown`, `/api/orders/dropdown`, `/api/vendors/dropdown`
2) Date: May 2026
3) Originality: Adapted from AI-generated suggestions
4) Source: https://gemini.google.com

**AI Citation**
1) Scope: `POST /api/reset-db` route — reads `ddl.sql` and re-executes schema/seed statements
2) Date: May 2026
3) Originality: Adapted from AI-generated suggestions
4) Source: https://gemini.google.com

**Citation**
1) Scope: All other routes, server setup, and middleware
2) Date: Spring 2026
3) Originality: Based on the CS 340 starter code, with the exception of entity-specific routes, stored procedure calls, and M:N relationship handling written by the project team
4) Source: CS 340 course starter code (Oregon State University)

---

### pl.sql

**Citation**
1) Scope: Entire `pl.sql` file — all stored procedures (`sp_insert_*`, `sp_update_*`, `sp_delete_*`)
2) Date: Spring 2026
3) Originality: Original work by Mason Antram

---

### ddl.sql

**Citation**
1) Scope: Entire `ddl.sql` file — table definitions, foreign keys, and sample data inserts
2) Date: Spring 2026 (sample data: April 30, 2026)
3) Originality: Original work by Swathi Pappoppula and Mason Antram

---

### dml.sql

**Citation**
1) Scope: Entire `dml.sql` file — SELECT, INSERT, UPDATE, and DELETE queries for all entities
2) Date: Spring 2026
3) Originality: Original work by Swathi Pappoppula and Mason Antram

---

### README.md

**AI Citation**
1) Scope: Organization and presentation of this README document
2) Date: June 2026
3) Originality: Adapted from ChatGPT suggestions; technical content and project descriptions written by the project team
4) Source: https://chat.openai.com

**Citation**
1) Scope: Project overview, database design, features, and file descriptions
2) Date: Spring 2026
3) Originality: Original work by Swathi Pappoppula and Mason Antram

---

**AI Citation**
1) Scope: Helped update per-file citation entries to include scope
2) Date: June 2026
3) Originality: Adapted with Cursor AI assistance
4) Source: https://cursor.com

---

All project implementation, database design, SQL code, application logic, and technical content remain the work of the project team unless otherwise cited.
