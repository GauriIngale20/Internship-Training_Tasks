import Link from "next/link";
import { getEmployee } from "@/lib/api";
import DeleteButton from "@/components/DeleteButton";

type EmployeeDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployeeDetailsPage({
  params,
}: EmployeeDetailsPageProps) {
  const { id } = await params;

  let employee;

  try {
    employee = await getEmployee(id);
  } catch {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">
            Employee Not Found
          </h1>

          <p className="mt-2 text-gray-600">
            The requested employee does not exist.
          </p>

          <Link
            href="/employees"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ← Back to Employees
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/employees"
          className="mb-6 inline-block font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to Employees
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Employee Details
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {employee.name}
              </h1>
            </div>

            <span className="rounded-full bg-gray-100 px-4 py-2 font-medium text-gray-600">
              #{employee.id}
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Department</p>
              <p className="mt-1 font-semibold text-gray-900">
                {employee.department}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Salary</p>
              <p className="mt-1 font-semibold text-gray-900">
                ₹{employee.salary.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 font-semibold text-gray-900">
                {employee.email}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/employees/${employee.id}/edit`}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Edit Employee
            </Link>

            <DeleteButton id={employee.id} />
          </div>
        </div>
      </div>
    </main>
  );
}