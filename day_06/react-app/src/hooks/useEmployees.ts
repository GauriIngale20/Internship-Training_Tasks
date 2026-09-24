import { useEffect, useState } from "react";

export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  email: string;
}

const API_URL = "http://localhost:3001/employees";

function useEmployeeData() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data: Employee[] = await response.json();

      setEmployees(data);
    } catch {
      setError("Failed to load employees from API.");
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (
    employee: Omit<Employee, "id">
  ) => {
    try {
      setError("");

      const newId =
        employees.length > 0
          ? Math.max(...employees.map((emp) => emp.id)) + 1
          : 101;

      const newEmployee = {
        id: newId,
        ...employee,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const savedEmployee: Employee = await response.json();

      setEmployees((current) => [...current, savedEmployee]);
    } catch {
      setError("Failed to add employee.");
    }
  };

  const updateEmployee = async (
    id: number,
    employee: Omit<Employee, "id">
  ) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...employee,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const updatedEmployee: Employee = await response.json();

      setEmployees((current) =>
        current.map((emp) =>
          emp.id === id ? updatedEmployee : emp
        )
      );
    } catch {
      setError("Failed to update employee.");
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees((current) =>
        current.filter((emp) => emp.id !== id)
      );
    } catch {
      setError("Failed to delete employee.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
}

export default useEmployeeData;