interface EmployeeFormData {
  name: string;
  department: string;
  salary: string;
  email: string;
}

interface EmployeeFormProps {
  formData: EmployeeFormData;
  setFormData: (data: EmployeeFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  editing: boolean;
}

function EmployeeForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  editing,
}: EmployeeFormProps) {
  return (
    <div className="form-container">
      <div className="form-header">
        <div>
          <h3>{editing ? "Edit Employee" : "Add New Employee"}</h3>
          <p>
            {editing
              ? "Update employee information"
              : "Enter employee information below"}
          </p>
        </div>
      </div>

      <form
        className="employee-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="form-group">
          <label>Employee Name</label>
          <input
            type="text"
            placeholder="Enter employee name"
            value={formData.name}
            onChange={(event) =>
              setFormData({
                ...formData,
                name: event.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Department</label>

          <select
            value={formData.department}
            onChange={(event) =>
              setFormData({
                ...formData,
                department: event.target.value,
              })
            }
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="form-group">
          <label>Salary</label>

          <input
            type="number"
            placeholder="Enter salary"
            min="1"
            value={formData.salary}
            onChange={(event) =>
              setFormData({
                ...formData,
                salary: event.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(event) =>
              setFormData({
                ...formData,
                email: event.target.value,
              })
            }
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            {editing ? "Update Employee" : "Add Employee"}
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;