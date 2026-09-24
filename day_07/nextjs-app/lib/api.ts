import { Employee } from "@/types/employee";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(`${API_URL}/employees`);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const result = await response.json();

  return result.data;
}

export async function getEmployee(id: string): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees/${id}`);

  if (!response.ok) {
    throw new Error("Employee not found");
  }

  const result = await response.json();

  return result.data;
}