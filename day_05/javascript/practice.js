// JavaScript Array Methods Practice

const employees = [
    { id: 1, name: "Amit", department: "IT", salary: 50000 },
    { id: 2, name: "Priya", department: "HR", salary: 45000 },
    { id: 3, name: "Neha", department: "IT", salary: 60000 },
    { id: 4, name: "Rohan", department: "Sales", salary: 40000 }
];

// map
const employeeNames = employees.map(emp => emp.name);
console.log("Employee Names:", employeeNames);

// filter
const itEmployees = employees.filter(emp => emp.department === "IT");
console.log("IT Employees:", itEmployees);

// reduce
const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
console.log("Total Salary:", totalSalary);

// find
const employee = employees.find(emp => emp.name === "Neha");
console.log("Found Employee:", employee);

// some
const highSalary = employees.some(emp => emp.salary > 55000);
console.log("Salary above 55000:", highSalary);

// every
const salaryCheck = employees.every(emp => emp.salary >= 40000);
console.log("All salaries are valid:", salaryCheck);

// sort
const sortedEmployees = [...employees].sort((a, b) => b.salary - a.salary);
console.log("Sorted by Salary:", sortedEmployees);