# Day 8 – Database + Laravel

## Overview

Day 8 focuses on relational databases, SQL queries, and building CRUD REST APIs using Laravel and Eloquent ORM.

## Project Structure

```text
day_08/
├── sql/
│   ├── schema.sql
│   └── queries.sql
│
├── database/
│   └── database.md
│
├── laravel-api/
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── resources/
│   └── ...
│
└── README.md
```

## SQL & Database

The database project uses MySQL and includes the following tables:

* Users
* Departments
* Employees
* Facilities
* Inspections
* Complaints

### Concepts Covered

* Tables, rows and columns
* Primary Keys
* Foreign Keys
* One-to-Many Relationships
* CRUD Operations
* SELECT
* WHERE
* ORDER BY
* GROUP BY
* HAVING
* JOIN
* Subqueries
* Indexes
* Transactions
* COMMIT and ROLLBACK

## SQL Queries

The `queries.sql` file contains queries for:

* Department employees
* Average salary
* Highest-paid employee
* Employees above average salary
* Poor facilities
* Complaint counts
* Inspection history
* JOIN operations
* Subqueries
* Index creation
* Transactions

## Laravel API

A REST API was developed using Laravel for:

* Facilities
* Inspections
* Complaints

### Laravel Concepts Covered

* Laravel Architecture
* Routing
* Controllers
* Models
* Eloquent ORM
* Validation
* Relationships
* Middleware basics
* API Development
* CRUD Operations

## API Endpoints

### Facilities

```text
GET    /api/facilities
POST   /api/facilities
GET    /api/facilities/{id}
PUT    /api/facilities/{id}
DELETE /api/facilities/{id}
```

### Inspections

```text
GET    /api/inspections
POST   /api/inspections
GET    /api/inspections/{id}
PUT    /api/inspections/{id}
DELETE /api/inspections/{id}
```

### Complaints

```text
GET    /api/complaints
POST   /api/complaints
GET    /api/complaints/{id}
PUT    /api/complaints/{id}
DELETE /api/complaints/{id}
```

## Request Flow

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Model / Eloquent ORM
   ↓
MySQL Database
   ↓
JSON Response
```

## Database Relationships

```text
Departments
     │
     └── Employees

Facilities
     ├── Inspections
     └── Complaints

Users
     ├── Inspections
     └── Complaints
```

## Practical Outcome

Successfully implemented and tested CRUD REST APIs for Facilities, Inspections, and Complaints using Laravel, MySQL, and Eloquent ORM.
