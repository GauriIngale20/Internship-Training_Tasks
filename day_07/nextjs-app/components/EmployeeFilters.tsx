"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Employee } from "@/types/employee";

type EmployeeFiltersProps = {
  employees: Employee[];
};

export default function EmployeeFilters({
  employees,
}: EmployeeFiltersProps) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const departments = useMemo(() => {
    return [
      "All",
      ...new Set(employees.map((employee) => employee.department)),
    ];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    let result = employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" || employee.department === department;

      return matchesSearch && matchesDepartment;
    });

    if (sortOrder === "high") {
      result = [...result].sort((a, b) => b.salary - a.salary);
    }

    if (sortOrder === "low") {
      result = [...result].sort((a, b) => a.salary - b.salary);
    }

    return result;
  }, [employees, search, department, sortOrder]);

  return (
    <>
      <div className="mb-8 grid gap-4 rounded-2xl bg-white p-5 shadow-md md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          {departments.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Departments" : item}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="default">Sort by Salary</option>
          <option value="high">Highest Salary</option>
          <option value="low">Lowest Salary</option>
        </select>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <p className="text-gray-600">No employees found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {employee.name}
                  </h2>

                  <p className="text-sm text-blue-600">
                    {employee.department}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                  #{employee.id}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">
                    Salary:
                  </span>{" "}
                  ₹{employee.salary.toLocaleString()}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    Email:
                  </span>{" "}
                  {employee.email}
                </p>
              </div>

              <Link
                href={`/employees/${employee.id}`}
                className="mt-5 inline-block font-semibold text-blue-600 hover:text-blue-800"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}