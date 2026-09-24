// DAY 6 - TYPESCRIPT PRACTICE

// 1. Primitive Data Types
let employeeName: string = "Gauri";
let employeeAge: number = 21;
let isEmployeeActive: boolean = true;

console.log("Employee Name:", employeeName);
console.log("Employee Age:", employeeAge);
console.log("Active:", isEmployeeActive);


// 2. Arrays
let departments: string[] = ["IT", "HR", "Finance", "Sales"];
let salaries: number[] = [50000, 45000, 55000, 42000];

console.log("\nDepartments:", departments);
console.log("Salaries:", salaries);


// 3. Object
let employee: {
    id: number;
    name: string;
    department: string;
    salary: number;
} = {
    id: 101,
    name: "Rahul",
    department: "IT",
    salary: 50000
};

console.log("\nEmployee Object:");
console.log(employee);


// 4. Interface
interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
    email?: string;
}

let employee1: Employee = {
    id: 102,
    name: "Priya",
    department: "HR",
    salary: 45000,
    email: "priya@gmail.com"
};

console.log("\nInterface Example:");
console.log(employee1);


// 5. Type Alias
type EmployeeID = number | string;

let id1: EmployeeID = 103;
let id2: EmployeeID = "EMP104";

console.log("\nType Alias:");
console.log("ID 1:", id1);
console.log("ID 2:", id2);


// 6. Union Type
let employeeStatus: string | number;

employeeStatus = "Active";
console.log("\nUnion Type:", employeeStatus);

employeeStatus = 1;
console.log("Union Type:", employeeStatus);


// 7. Enum
enum Department {
    IT = "IT",
    HR = "HR",
    FINANCE = "Finance",
    SALES = "Sales"
}

let selectedDepartment: Department = Department.IT;

console.log("\nEnum Example:");
console.log("Department:", selectedDepartment);


// 8. Optional Property
interface Student {
    name: string;
    age: number;
    email?: string;
}

let student1: Student = {
    name: "Amit",
    age: 21
};

let student2: Student = {
    name: "Sneha",
    age: 22,
    email: "sneha@gmail.com"
};

console.log("\nOptional Property:");
console.log(student1);
console.log(student2);


// 9. Functions
function calculateSalary(salary: number, bonus: number): number {
    return salary + bonus;
}

const totalSalary = calculateSalary(50000, 5000);

console.log("\nFunction Example:");
console.log("Total Salary:", totalSalary);


// 10. Function with Interface
function displayEmployee(emp: Employee): void {
    console.log("\nEmployee Details:");
    console.log("ID:", emp.id);
    console.log("Name:", emp.name);
    console.log("Department:", emp.department);
    console.log("Salary:", emp.salary);
    console.log("Email:", emp.email ?? "Not Provided");
}

displayEmployee(employee1);


// 11. Class
class EmployeeManager {
    private employees: Employee[] = [];

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    getEmployees(): Employee[] {
        return this.employees;
    }

    getTotalEmployees(): number {
        return this.employees.length;
    }
}

const manager = new EmployeeManager();

manager.addEmployee({
    id: 105,
    name: "Neha",
    department: "IT",
    salary: 48000,
    email: "neha@gmail.com"
});

manager.addEmployee({
    id: 106,
    name: "Rohan",
    department: "Finance",
    salary: 60000,
    email: "rohan@gmail.com"
});

console.log("\nClass Example:");
console.log(manager.getEmployees());
console.log("Total Employees:", manager.getTotalEmployees());


// 12. Generics
function getFirstItem<T>(items: T[]): T {
    return items[0];
}

const firstDepartment = getFirstItem(departments);
const firstSalary = getFirstItem(salaries);

console.log("\nGenerics Example:");
console.log("First Department:", firstDepartment);
console.log("First Salary:", firstSalary);


// 13. Type Narrowing
function displayValue(value: string | number): void {
    if (typeof value === "string") {
        console.log("\nType Narrowing - String:", value.toUpperCase());
    } else {
        console.log("\nType Narrowing - Number:", value.toFixed(2));
    }
}

displayValue("employee");
displayValue(50000);


// 14. Type Guard
function isEmployee(value: Employee | Student): value is Employee {
    return "department" in value;
}

console.log("\nType Guard Example:");

if (isEmployee(employee1)) {
    console.log("This object is an Employee.");
    console.log("Department:", employee1.department);
}


// 15. Array of Employees
const employeeList: Employee[] = [
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

console.log("\nEmployee List:");

employeeList.forEach((emp) => {
    console.log(
        emp.id,
        emp.name,
        emp.department,
        emp.salary
    );
});

