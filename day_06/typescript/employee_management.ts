
// DAY 6 - EMPLOYEE MANAGEMENT SYSTEM


// Employee Interface
interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
    email?: string;
}

// Employee Data
let employees: Employee[] = [
    {
        id: 101,
        name: "Rahul",
        department: "IT",
        salary: 50000,
        email: "rahul@gmail.com"
    },
    {
        id: 102,
        name: "Priya",
        department: "HR",
        salary: 45000,
        email: "priya@gmail.com"
    },
    {
        id: 103,
        name: "Amit",
        department: "Finance",
        salary: 55000
    },
    {
        id: 104,
        name: "Sneha",
        department: "Sales",
        salary: 42000
    }
];


// 1. List Employees
function listEmployees(): void {
    console.log("\n========== EMPLOYEE LIST ==========");

    if (employees.length === 0) {
        console.log("No employees available.");
        return;
    }

    employees.forEach((employee) => {
        console.log(
            `ID: ${employee.id} | Name: ${employee.name} | Department: ${employee.department} | Salary: ₹${employee.salary}`
        );
    });
}


// 2. Add Employee
function addEmployee(employee: Employee): void {
    employees.push(employee);

    console.log("\nEmployee added successfully.");
    console.log("Added Employee:", employee);
}


// 3. Update Employee
function updateEmployee(
    id: number,
    name: string,
    department: string,
    salary: number
): void {
    const employee = employees.find((emp) => emp.id === id);

    if (employee) {
        employee.name = name;
        employee.department = department;
        employee.salary = salary;

        console.log("\nEmployee updated successfully.");
        console.log("Updated Employee:", employee);
    } else {
        console.log("\nEmployee not found.");
    }
}


// 4. Delete Employee
function deleteEmployee(id: number): void {
    const index = employees.findIndex((emp) => emp.id === id);

    if (index !== -1) {
        const deletedEmployee = employees.splice(index, 1);

        console.log("\nEmployee deleted successfully.");
        console.log("Deleted Employee:", deletedEmployee[0]);
    } else {
        console.log("\nEmployee not found.");
    }
}


// 5. Search Employee
function searchEmployee(keyword: string): void {
    const results = employees.filter((employee) =>
        employee.name.toLowerCase().includes(keyword.toLowerCase())
    );

    console.log("\n========== SEARCH RESULT ==========");

    if (results.length > 0) {
        results.forEach((employee) => {
            console.log(employee);
        });
    } else {
        console.log("Employee not found.");
    }
}


// 6. Filter by Department
function filterByDepartment(department: string): void {
    const results = employees.filter(
        (employee) =>
            employee.department.toLowerCase() === department.toLowerCase()
    );

    console.log("\n========== DEPARTMENT RESULT ==========");

    if (results.length > 0) {
        results.forEach((employee) => {
            console.log(employee);
        });
    } else {
        console.log("No employee found in this department.");
    }
}


// 7. Find Highest Salary
function findHighestSalary(): void {
    if (employees.length === 0) {
        console.log("\nNo employees available.");
        return;
    }

    const highestSalaryEmployee = employees.reduce((highest, employee) =>
        employee.salary > highest.salary ? employee : highest
    );

    console.log("\n========== HIGHEST SALARY ==========");
    console.log(highestSalaryEmployee);
}


// 8. Calculate Average Salary
function calculateAverageSalary(): void {
    if (employees.length === 0) {
        console.log("\nNo employees available.");
        return;
    }

    const totalSalary = employees.reduce(
        (total, employee) => total + employee.salary,
        0
    );

    const averageSalary = totalSalary / employees.length;

    console.log("\n========== AVERAGE SALARY ==========");
    console.log(`Average Salary: ₹${averageSalary.toFixed(2)}`);
}


// 9. Count Employees
function countEmployees(): void {
    console.log("\nTotal Employees:", employees.length);
}


// PROGRAM EXECUTION


console.log("==========================================");
console.log("       EMPLOYEE MANAGEMENT SYSTEM");
console.log("==========================================");


// Display initial employees
listEmployees();


// Add Employee
addEmployee({
    id: 105,
    name: "Neha",
    department: "IT",
    salary: 48000,
    email: "neha@gmail.com"
});


// Display after adding
listEmployees();


// Update Employee
updateEmployee(
    105,
    "Neha Sharma",
    "HR",
    52000
);


// Search Employee
searchEmployee("Rahul");


// Filter Department
filterByDepartment("IT");


// Find Highest Salary
findHighestSalary();


// Calculate Average Salary
calculateAverageSalary();


// Count Employees
countEmployees();


// Delete Employee
deleteEmployee(105);


// Final Employee List
listEmployees();

// END OF EMPLOYEE MANAGEMENT SYSTEM
