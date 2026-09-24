export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  email: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

function EmployeeList({
  employees,
  onView,
  onEdit,
  onDelete,
}: EmployeeListProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-data">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <span className="employee-id">#{employee.id}</span>
                </td>

                <td>
                  <div className="employee-name">
                    <div className="avatar">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>

                    <strong>{employee.name}</strong>
                  </div>
                </td>

                <td>
                  <span className="department-badge">
                    {employee.department}
                  </span>
                </td>

                <td>
                  <strong>
                    ₹{employee.salary.toLocaleString("en-IN")}
                  </strong>
                </td>

                <td>{employee.email}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="view-button"
                      onClick={() => onView(employee)}
                    >
                      View
                    </button>

                    <button
                      className="edit-button"
                      onClick={() => onEdit(employee)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => onDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;