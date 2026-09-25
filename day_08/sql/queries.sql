-- Facility Management Database - Queries
USE facility_management;

-- 1. SELECT Queries

SELECT * FROM employees;

SELECT name, salary
FROM employees;

SELECT * FROM facilities;


-- 2. WHERE Queries

SELECT *
FROM employees
WHERE salary > 50000;

SELECT *
FROM facilities
WHERE cleanliness_score < 60;

SELECT *
FROM complaints
WHERE status = 'Pending';


-- 3. ORDER BY Queries

SELECT *
FROM employees
ORDER BY salary ASC;

SELECT *
FROM employees
ORDER BY salary DESC;

SELECT *
FROM facilities
ORDER BY cleanliness_score DESC;


-- 4. CRUD Operations

-- INSERT
INSERT INTO departments (name, location)
VALUES ('Management', 'Building E');

-- READ
SELECT * FROM departments;

-- UPDATE
UPDATE departments
SET location = 'Building F'
WHERE name = 'Management';

-- DELETE
DELETE FROM departments
WHERE name = 'Management';


-- 5. GROUP BY

SELECT department_id, COUNT(*) AS total_employees
FROM employees
GROUP BY department_id;

SELECT department_id, AVG(salary) AS average_salary
FROM employees
GROUP BY department_id;

SELECT status, COUNT(*) AS total_complaints
FROM complaints
GROUP BY status;


-- 6. HAVING

SELECT department_id, COUNT(*) AS total_employees
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 1;


-- 7. Average Salary
SELECT AVG(salary) AS average_salary
FROM employees;



-- 8. JOIN Queries

-- Employees with Departments

SELECT
    employees.name AS employee,
    departments.name AS department,
    employees.salary
FROM employees
JOIN departments
ON employees.department_id = departments.id;


-- Facilities with Inspections

SELECT
    facilities.name AS facility,
    inspections.inspection_date,
    inspections.cleanliness_score,
    inspections.remarks
FROM facilities
JOIN inspections
ON facilities.id = inspections.facility_id;


-- Facilities with Complaints

SELECT
    facilities.name AS facility,
    complaints.complaint_text,
    complaints.status
FROM facilities
JOIN complaints
ON facilities.id = complaints.facility_id;


-- Complaints with Users and Facilities

SELECT
    facilities.name AS facility,
    users.name AS user,
    complaints.complaint_text,
    complaints.status
FROM complaints
JOIN facilities
ON complaints.facility_id = facilities.id
JOIN users
ON complaints.user_id = users.id;


-- 9. Subqueries

-- Highest Paid Employee

SELECT *
FROM employees
WHERE salary = (
    SELECT MAX(salary)
    FROM employees
);


-- Lowest Paid Employee

SELECT *
FROM employees
WHERE salary = (
    SELECT MIN(salary)
    FROM employees
);


-- Employees earning above average salary

SELECT name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);


-- Facilities with below average cleanliness

SELECT name, cleanliness_score
FROM facilities
WHERE cleanliness_score < (
    SELECT AVG(cleanliness_score)
    FROM facilities
);


-- Facility with highest waste level

SELECT *
FROM facilities
WHERE waste_level = (
    SELECT MAX(waste_level)
    FROM facilities
);


-- 10. Department Employees

SELECT name, salary
FROM employees
WHERE department_id = (
    SELECT id
    FROM departments
    WHERE name = 'IT'
);


-- 11. Indexes

CREATE INDEX idx_employee_department
ON employees(department_id);

CREATE INDEX idx_employee_salary
ON employees(salary);

CREATE INDEX idx_facility_location
ON facilities(location);

CREATE INDEX idx_inspection_date
ON inspections(inspection_date);

CREATE INDEX idx_complaint_status
ON complaints(status);


-- 12. View Indexes

SHOW INDEX FROM employees;

SHOW INDEX FROM facilities;

SHOW INDEX FROM inspections;

SHOW INDEX FROM complaints;


-- 13. Transactions - COMMIT

START TRANSACTION;

UPDATE complaints
SET status = 'Resolved'
WHERE id = 1;

UPDATE facilities
SET cleanliness_score = 80
WHERE id = 2;

COMMIT;


-- 14. Transactions - ROLLBACK

START TRANSACTION;

UPDATE complaints
SET status = 'Resolved'
WHERE id = 2;

UPDATE facilities
SET cleanliness_score = 90
WHERE id = 3;

ROLLBACK;