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

**Hosted Application:** *Add deployment URL here before submission*

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

## Installation & Setup

### Prerequisites

* Node.js (v18 or newer)
* npm
* MySQL or MariaDB

### Install Dependencies

```bash
npm install
```

Required packages:

```text
express
mysql2
dotenv
cors
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=your-database-host
DB_USER=your-username
DB_PASS=your-password
DB_NAME=your-database-name
PORT=5050
```

### Initialize the Database

Execute the following files in order:

1. `ddl.sql` – Creates tables and inserts sample data
2. `pl.sql` – Creates stored procedures

`dml.sql` is included for reference and documentation purposes.

### Run the Application

```bash
node app.js
```

Open the application at:

```text
http://classwork.engr.oregonstate.edu:5050/
```

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

This project is based on the Oregon State University CS340 Starter Application and has been modified for the requirements of this project.

### Adapted from CS340 Starter Code

* Express server structure
* Database connection pattern
* Static file serving
* REST API organization
* General CRUD page architecture

### AI-Assisted Components

#### Google Gemini (May 2026)
* Customer page data-loading functions
* Vendor page data-loading functions
* Product page data-loading functions
* Database reset functionality
* Initial CSS styling suggestions
