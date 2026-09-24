const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../data/employees.json");

function readEmployees() {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

function writeEmployees(employees) {
  fs.writeFileSync(
    dataPath,
    JSON.stringify(employees, null, 2),
    "utf-8"
  );
}

module.exports = {
  readEmployees,
  writeEmployees
};