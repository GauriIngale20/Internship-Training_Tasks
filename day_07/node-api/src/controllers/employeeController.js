const employeeService = require("../services/employeeService");

function getEmployees(req, res, next) {
  try {
    const employees = employeeService.getAllEmployees();

    res.status(200).json({
      success: true,
      data: employees
    });
  } catch (error) {
    next(error);
  }
}

function getEmployee(req, res, next) {
  try {
    const employee = employeeService.getEmployeeById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
}

function createEmployee(req, res, next) {
  try {
    const employee = employeeService.createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee
    });
  } catch (error) {
    next(error);
  }
}

function updateEmployee(req, res, next) {
  try {
    const employee = employeeService.updateEmployee(
      req.params.id,
      req.body
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee
    });
  } catch (error) {
    next(error);
  }
}

function deleteEmployee(req, res, next) {
  try {
    const employee = employeeService.deleteEmployee(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: employee
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};