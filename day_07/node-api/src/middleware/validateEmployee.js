function validateEmployee(req, res, next) {
  const { name, department, salary, email } = req.body;

  if (!name || !department || salary === undefined || !email) {
    return res.status(400).json({
      success: false,
      message: "Name, department, salary and email are required"
    });
  }

  if (typeof name !== "string" || typeof department !== "string") {
    return res.status(400).json({
      success: false,
      message: "Name and department must be text"
    });
  }

  if (typeof salary !== "number" || salary <= 0) {
    return res.status(400).json({
      success: false,
      message: "Salary must be a positive number"
    });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email"
    });
  }

  next();
}

module.exports = validateEmployee;