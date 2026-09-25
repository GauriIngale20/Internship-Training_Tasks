# Facility Management Database

## 1. Database Overview

The Facility Management Database is a relational database designed to manage users, departments, employees, facilities, inspections, and complaints.

### Database Name

`facility_management`

### Main Tables

- users
- departments
- employees
- facilities
- inspections
- complaints

---

## 2. Database Structure

### Users Table

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INT | Primary Key | Unique user ID |
| name | VARCHAR(100) | - | User name |
| email | VARCHAR(100) | UNIQUE | User email |

### Departments Table

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INT | Primary Key | Unique department ID |
| name | VARCHAR(100) | - | Department name |
| location | VARCHAR(100) | - | Department location |

### Employees Table

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INT | Primary Key | Unique employee ID |
| name | VARCHAR(100) | - | Employee name |
| department_id | INT | Foreign Key | Department ID |
| salary | DECIMAL(10,2) | - | Employee salary |
| designation | VARCHAR(100) | - | Employee designation |

### Facilities Table

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INT | Primary Key | Unique facility ID |
| name | VARCHAR(100) | - | Facility name |
| location | VARCHAR(100) | - | Facility location |
| cleanliness_score | DECIMAL(5,2) | - | Cleanliness score |
| odor_score | DECIMAL(5,2) | - | Odor score |
| waste_level | DECIMAL(5,2) | - | Waste level |
| water_availability | BOOLEAN | - | Water availability |

### Inspections Table

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INT | Primary Key | Unique inspection ID |
| facility_id | INT | Foreign Key | Facility ID |
| user_id | INT | Foreign Key | User ID |
| inspection_date | DATE | - | Inspection date |
| cleanliness_score | DECIMAL(5,2) | - | Cleanliness score |
| odor_score | DECIMAL(5,2) | - | Odor score |
| waste_level | DECIMAL(5,2) | - | Waste level |
| remarks | VARCHAR(255) | - | Inspection remarks |

### Complaints Table

| Column | Data Type | Key | Description |
|---|---|---|---|
| id | INT | Primary Key | Unique complaint ID |
| facility_id | INT | Foreign Key | Facility ID |
| user_id | INT | Foreign Key | User ID |
| complaint_text | VARCHAR(255) | - | Complaint description |
| status | VARCHAR(50) | - | Complaint status |
| complaint_date | DATE | - | Complaint date |

---

## 3. Database Relationships

The database uses primary keys and foreign keys to connect related tables.

| Parent Table | Child Table | Primary Key | Foreign Key | Relationship |
|---|---|---|---|---|
| departments | employees | departments.id | employees.department_id | One-to-Many |
| facilities | inspections | facilities.id | inspections.facility_id | One-to-Many |
| users | inspections | users.id | inspections.user_id | One-to-Many |
| facilities | complaints | facilities.id | complaints.facility_id | One-to-Many |
| users | complaints | users.id | complaints.user_id | One-to-Many |

### Relationship Flow

```text
Department
    |
    └── Employees

Facility
    |
    ├── Inspections
    └── Complaints

User
    |
    ├── Inspections
    └── Complaints
```

---

## 4. Primary Keys

A primary key uniquely identifies each record in a table.

### Primary Keys

- `users.id`
- `departments.id`
- `employees.id`
- `facilities.id`
- `inspections.id`
- `complaints.id`

---

## 5. Foreign Keys

Foreign keys are used to establish relationships between tables.

### Foreign Keys

- `employees.department_id` → `departments.id`
- `inspections.facility_id` → `facilities.id`
- `inspections.user_id` → `users.id`
- `complaints.facility_id` → `facilities.id`
- `complaints.user_id` → `users.id`

---

## 6. One-to-Many Relationships

The database mainly uses One-to-Many relationships.

```text
One Department
      ↓
Many Employees
```

```text
One Facility
      ↓
Many Inspections
```

```text
One User
      ↓
Many Inspections
```

```text
One Facility
      ↓
Many Complaints
```

```text
One User
      ↓
Many Complaints
```

---

## 7. Entity Relationship Diagram

```text
┌──────────────────┐
│   departments    │
├──────────────────┤
│ PK id            │
│ name             │
│ location         │
└────────┬─────────┘
         │
         │ 1
         │
         │ N
         ↓
┌──────────────────┐
│    employees     │
├──────────────────┤
│ PK id            │
│ name             │
│ FK department_id │
│ salary           │
│ designation      │
└──────────────────┘


┌──────────────────┐
│      users       │
├──────────────────┤
│ PK id            │
│ name             │
│ email            │
└────────┬─────────┘
         │
         │
    ┌────┴────┐
    │         │
    ↓         ↓
┌──────────┐ ┌────────────┐
│inspection│ │ complaints │
├──────────┤ ├────────────┤
│ PK id    │ │ PK id      │
│ FK user_id│ │ FK user_id │
│ FK facility│ │ FK facility│
│ date     │ │ text       │
│ scores   │ │ status     │
│ remarks  │ │ date       │
└────┬─────┘ └─────┬──────┘
     │              │
     └──────┬───────┘
            │
            ↓
┌────────────────────────┐
│       facilities       │
├────────────────────────┤
│ PK id                  │
│ name                   │
│ location               │
│ cleanliness_score      │
│ odor_score             │
│ waste_level            │
│ water_availability     │
└────────────────────────┘
```

---

## 8. Database Concepts Covered

This database demonstrates the following concepts:

- Tables
- Rows and Columns
- Primary Keys
- Foreign Keys
- One-to-Many Relationships
- CRUD Operations
- SELECT
- WHERE
- ORDER BY
- GROUP BY
- HAVING
- JOIN
- Subqueries
- Indexes
- Transactions
- COMMIT
- ROLLBACK
- Relational Database Design

---

## 9. Database Flow

```text
User Request
     ↓
SQL Query
     ↓
Database Table
     ↓
Relationships
     ↓
Data Processing
     ↓
Result
```

The SQL implementation is available in the `sql` folder.

### SQL Files

- `schema.sql` — Database, tables, relationships, and sample data
- `queries.sql` — CRUD, SELECT, JOIN, GROUP BY, subqueries, indexes, and transactions