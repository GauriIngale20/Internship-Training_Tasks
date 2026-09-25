-- Facility Management Database - Schema

CREATE DATABASE IF NOT EXISTS facility_management;

USE facility_management;

-- Users Table

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Departments Table

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

-- Employees Table

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    salary DECIMAL(10,2),
    designation VARCHAR(100),

    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

-- Facilities Table

CREATE TABLE facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    cleanliness_score DECIMAL(5,2),
    odor_score DECIMAL(5,2),
    waste_level DECIMAL(5,2),
    water_availability BOOLEAN
);

-- Inspections Table

CREATE TABLE inspections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT,
    user_id INT,
    inspection_date DATE,
    cleanliness_score DECIMAL(5,2),
    odor_score DECIMAL(5,2),
    waste_level DECIMAL(5,2),
    remarks VARCHAR(255),

    FOREIGN KEY (facility_id)
    REFERENCES facilities(id),

    FOREIGN KEY (user_id)
    REFERENCES users(id)
);

-- Complaints Table

CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT,
    user_id INT,
    complaint_text VARCHAR(255),
    status VARCHAR(50),
    complaint_date DATE,

    FOREIGN KEY (facility_id)
    REFERENCES facilities(id),

    FOREIGN KEY (user_id)
    REFERENCES users(id)
);

-- Sample Data

INSERT INTO users (name, email) VALUES
('Rahul', 'rahul@gmail.com'),
('Priya', 'priya@gmail.com'),
('Amit', 'amit@gmail.com'),
('Sneha', 'sneha@gmail.com');

INSERT INTO departments (name, location) VALUES
('IT', 'Building A'),
('HR', 'Building B'),
('Finance', 'Building C'),
('Operations', 'Building D');

INSERT INTO employees
(name, department_id, salary, designation)
VALUES
('Amit', 1, 55000, 'Developer'),
('Rahul', 1, 65000, 'Senior Developer'),
('Priya', 2, 45000, 'HR Executive'),
('Sneha', 3, 58000, 'Accountant'),
('Rohan', 4, 48000, 'Operations Executive'),
('Neha', 4, 60000, 'Manager');

INSERT INTO facilities
(name, location, cleanliness_score, odor_score, waste_level, water_availability)
VALUES
('Main Washroom', 'Building A', 85, 20, 15, TRUE),
('Cafeteria', 'Building B', 65, 45, 40, TRUE),
('Parking Area', 'Building C', 55, 60, 70, FALSE),
('Hostel Washroom', 'Hostel', 48, 75, 80, FALSE),
('Library Washroom', 'Building D', 90, 10, 10, TRUE);

INSERT INTO inspections
(facility_id, user_id, inspection_date,
 cleanliness_score, odor_score, waste_level, remarks)
VALUES
(1, 1, '2026-09-01', 85, 20, 15, 'Good'),
(2, 2, '2026-09-03', 65, 45, 40, 'Needs cleaning'),
(3, 3, '2026-09-05', 55, 60, 70, 'Poor condition'),
(4, 4, '2026-09-07', 48, 75, 80, 'Needs immediate attention'),
(5, 1, '2026-09-09', 90, 10, 10, 'Excellent');

INSERT INTO complaints
(facility_id, user_id, complaint_text, status, complaint_date)
VALUES
(2, 1, 'Cafeteria is dirty', 'Pending', '2026-09-04'),
(3, 2, 'Parking has waste', 'In Progress', '2026-09-06'),
(4, 3, 'Hostel washroom is dirty', 'Pending', '2026-09-08'),
(1, 4, 'Water tap problem', 'Resolved', '2026-09-10');