interface DashboardProps {
  totalEmployees: number;
  averageSalary: number;
  departments: number;
}

function Dashboard({
  totalEmployees,
  averageSalary,
  departments,
}: DashboardProps) {
  return (
    <section className="dashboard">
      <div className="dashboard-card blue-card">
        <div className="card-icon">👥</div>
        <div>
          <h3>Total Employees</h3>
          <p>{totalEmployees}</p>
        </div>
      </div>

      <div className="dashboard-card green-card">
        <div className="card-icon">💰</div>
        <div>
          <h3>Average Salary</h3>
          <p>₹{averageSalary.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}</p>
        </div>
      </div>

      <div className="dashboard-card orange-card">
        <div className="card-icon">🏢</div>
        <div>
          <h3>Departments</h3>
          <p>{departments}</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;