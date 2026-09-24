import { useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

import useEmployeeData from "./hooks/useEmployees";
import type { Employee } from "./hooks/employeeData";

function App() {
  const {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployeeData();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("None");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    department: "IT",
    salary: "",
    email: "",
  });

  const totalEmployees = employees.length;

  const averageSalary =
    employees.length > 0
      ? employees.reduce(
          (total, employee) => total + employee.salary,
          0
        ) / employees.length
      : 0;

  const departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  const filteredEmployees = [...employees]
    .filter((employee) =>
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(
      (employee) =>
        departmentFilter === "All" ||
        employee.department === departmentFilter
    )
    .sort((a, b) => {
      if (sortBy === "Name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "Salary Low to High") {
        return a.salary - b.salary;
      }

      if (sortBy === "Salary High to Low") {
        return b.salary - a.salary;
      }

      return 0;
    });

  const resetForm = () => {
    setFormData({
      name: "",
      department: "IT",
      salary: "",
      email: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (
      !formData.name.trim() ||
      !formData.salary ||
      !formData.email.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (Number(formData.salary) <= 0) {
      alert("Salary must be greater than 0.");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    const employeeData = {
      name: formData.name.trim(),
      department: formData.department,
      salary: Number(formData.salary),
      email: formData.email.trim(),
    };

    if (editingId !== null) {
      await updateEmployee(editingId, employeeData);
    } else {
      await addEmployee(employeeData);
    }

    resetForm();
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);

    setFormData({
      name: employee.name,
      department: employee.department,
      salary: String(employee.salary),
      email: employee.email,
    });

    setShowForm(true);
    setSelectedEmployee(null);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    await deleteEmployee(id);

    if (selectedEmployee?.id === id) {
      setSelectedEmployee(null);
    }
  };

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  if (loading) {
    return (
      <div className="status-page">
        <div className="status-box">
          <div className="loader"></div>
          <h2>Loading Employees...</h2>
          <p>Please wait while employee data is loading.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-page">
        <div className="status-box error-box">
          <div className="error-icon">!</div>
          <h2>Unable to Load Data</h2>
          <p>{error}</p>
          <p className="small-text">
            Make sure JSON Server is running on port 3001.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <span className="header-label">EMPLOYEE MANAGEMENT</span>
          <h1>Employee Dashboard</h1>
          <p>
            Manage your employees, departments and salary
            information in one place.
          </p>
        </div>
      </header>

      <Dashboard
        totalEmployees={totalEmployees}
        averageSalary={averageSalary}
        departments={departments}
      />

      <section className="employee-section">
        <div className="section-header">
          <div>
            <h2>Employee List</h2>
            <p>
              {filteredEmployees.length} employee
              {filteredEmployees.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <button
            className="add-button"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
          >
            {showForm ? "Close Form" : "+ Add Employee"}
          </button>
        </div>

        {showForm && (
          <EmployeeForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            editing={editingId !== null}
          />
        )}

        <div className="controls">
          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search employee by name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(event.target.value)
            }
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="None">Sort By</option>
            <option value="Name">Name</option>
            <option value="Salary Low to High">
              Salary: Low to High
            </option>
            <option value="Salary High to Low">
              Salary: High to Low
            </option>
          </select>
        </div>

        <EmployeeList
          employees={filteredEmployees}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {selectedEmployee && (
          <div className="details-card">
            <div className="details-header">
              <div>
                <span className="header-label">EMPLOYEE INFORMATION</span>
                <h2>Employee Details</h2>
              </div>

              <button
                className="cancel-button"
                onClick={() => setSelectedEmployee(null)}
              >
                Close
              </button>
            </div>

            <div className="details-content">
              <div className="large-avatar">
                {selectedEmployee.name.charAt(0).toUpperCase()}
              </div>

              <div className="details-grid">
                <div>
                  <span>ID</span>
                  <strong>#{selectedEmployee.id}</strong>
                </div>

                <div>
                  <span>Name</span>
                  <strong>{selectedEmployee.name}</strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>{selectedEmployee.department}</strong>
                </div>

                <div>
                  <span>Salary</span>
                  <strong>
                    ₹
                    {selectedEmployee.salary.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{selectedEmployee.email}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="footer">
        Employee Management Dashboard • React + TypeScript
      </footer>
    </div>
  );
}

export default App;