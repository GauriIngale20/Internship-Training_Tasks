const {
  readEmployees,
  writeEmployees
} = require("../models/employeeModel");

function getAllEmployees() {
  return readEmployees();
}

function getEmployeeById(id) {
  const employees = readEmployees();

  return employees.find((employee) => employee.id === Number(id));
}

function createEmployee(employeeData) {
  const employees = readEmployees();

  const newEmployee = {
    id: employees.length > 0
      ? Math.max(...employees.map((employee) => employee.id)) + 1
      : 1,
    ...employeeData
  };

  employees.push(newEmployee);
  writeEmployees(employees);

  return newEmployee;
}

function updateEmployee(id, employeeData) {
  const employees = readEmployees();
  const employeeIndex = employees.findIndex(
    (employee) => employee.id === Number(id)
  );

  if (employeeIndex === -1) {
    return null;
  }

  const updatedEmployee = {
    ...employees[employeeIndex],
    ...employeeData,
    id: Number(id)
  };

  employees[employeeIndex] = updatedEmployee;
  writeEmployees(employees);

  return updatedEmployee;
}

function deleteEmployee(id) {
  const employees = readEmployees();
  const employeeIndex = employees.findIndex(
    (employee) => employee.id === Number(id)
  );

  if (employeeIndex === -1) {
    return null;
  }

  const deletedEmployee = employees.splice(employeeIndex, 1)[0];
  writeEmployees(employees);

  return deletedEmployee;
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};