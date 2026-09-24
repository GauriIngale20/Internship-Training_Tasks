import Link from "next/link";
import { getEmployees } from "@/lib/api";
import { Employee } from "@/types/employee";
import EmployeeFilters from "@/components/EmployeeFilters";

export default async function EmployeesPage() {
  let employees: Employee[] = [];
  let errorMessage = "";

  try {
    employees = await getEmployees();
  } catch {
    errorMessage = "Unable to load employee data.";
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Employee Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Employees
            </h1>

            <p className="mt-2 text-gray-600">
              Manage employee records from one place.
            </p>
          </div>

          <Link
            href="/employees/create"
            className="w-fit rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Employee
          </Link>
        </div>

        {errorMessage ? (
          <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600">
            {errorMessage}
          </div>
        ) : (
          <EmployeeFilters employees={employees} />
        )}
      </div>
    </main>
  );
}
