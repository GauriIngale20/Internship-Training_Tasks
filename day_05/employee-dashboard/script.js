let employees = [];

// Load employees
async function loadEmployees() {
    try {
        const response = await fetch("employees.json");
        employees = await response.json();
        displayEmployees(employees);
    } catch (error) {
        console.log("Error loading employees:", error);
    }
}

// Display employees
function displayEmployees(data) {
    const list = document.getElementById("employeeList");

    list.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                ${data.map(employee => `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.department}</td>
                        <td>₹${employee.salary}</td>
                        <td>
                            <button class="details-btn"
                                onclick="viewEmployee(${employee.id})">
                                Details
                            </button>

                            <button class="edit-btn"
                                onclick="editEmployee(${employee.id})">
                                Edit
                            </button>

                            <button class="delete-btn"
                                onclick="deleteEmployee(${employee.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

// Search
document.getElementById("search").addEventListener("input", function () {

    const text = this.value.toLowerCase();

    const result = employees.filter(employee =>
        employee.name.toLowerCase().includes(text)
    );

    displayEmployees(result);
});

// Filter
document.getElementById("department").addEventListener("change", function () {

    const department = this.value;

    const result = department === "All"
        ? employees
        : employees.filter(employee =>
            employee.department === department
        );

    displayEmployees(result);
});

// Sort
document.getElementById("sort").addEventListener("change", function () {

    let result = [...employees];

    if (this.value === "high") {
        result.sort((a, b) => b.salary - a.salary);
    }

    if (this.value === "low") {
        result.sort((a, b) => a.salary - b.salary);
    }

    displayEmployees(result);
});

// View details
function viewEmployee(id) {

    const employee = employees.find(
        employee => employee.id === id
    );

    const details = document.getElementById("employeeDetails");

    details.style.display = "block";

    details.innerHTML = `
        <h2>Employee Details</h2>
        <p><strong>Name:</strong> ${employee.name}</p>
        <p><strong>Department:</strong> ${employee.department}</p>
        <p><strong>Salary:</strong> ₹${employee.salary}</p>
        <p><strong>Email:</strong> ${employee.email}</p>
    `;
}

// Show form
function showAddForm() {

    document.getElementById("employeeForm").style.display = "block";

    document.getElementById("employeeName").focus();
}

// Hide form
function hideForm() {
    document.getElementById("employeeForm").style.display = "none";
}

// Add employee
function saveEmployee() {

    const name = document.getElementById("employeeName").value;
    const department = document.getElementById("employeeDepartment").value;
    const salary = Number(document.getElementById("employeeSalary").value);
    const email = document.getElementById("employeeEmail").value;

    if (!name || !department || !salary || !email) {
        alert("Please fill all fields.");
        return;
    }

    employees.push({
        id: employees.length + 1,
        name: name,
        department: department,
        salary: salary,
        email: email
    });

    displayEmployees(employees);
    hideForm();

    document.getElementById("employeeName").value = "";
    document.getElementById("employeeDepartment").value = "";
    document.getElementById("employeeSalary").value = "";
    document.getElementById("employeeEmail").value = "";
}

// Edit employee
function editEmployee(id) {

    const employee = employees.find(
        employee => employee.id === id
    );

    const name = prompt("Enter name:", employee.name);
    const salary = prompt("Enter salary:", employee.salary);

    if (name && salary) {
        employee.name = name;
        employee.salary = Number(salary);

        displayEmployees(employees);
    }
}

// Delete employee
function deleteEmployee(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
        employees = employees.filter(
            employee => employee.id !== id
        );

        displayEmployees(employees);
    }
}

// Start dashboard
loadEmployees();