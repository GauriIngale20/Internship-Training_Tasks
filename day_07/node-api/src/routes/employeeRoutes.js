const express = require("express");

const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

const validateEmployee = require("../middleware/validateEmployee");

const router = express.Router();

router.get("/", getEmployees);

router.get("/:id", getEmployee);

router.post("/", validateEmployee, createEmployee);

router.put("/:id", validateEmployee, updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;