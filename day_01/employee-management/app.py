employees = []

# Add Employee
def add_employee():
    employee_id = input("Enter Employee ID: ")
    name = input("Enter Name: ")
    department = input("Enter Department: ")
    salary = float(input("Enter Salary: "))

    employee = [employee_id, name, department, salary]
    employees.append(employee)

    print("Employee added successfully!")

# List Employees
def list_employees():
    if not employees:
        print("No employees found.")
        return

    print("\n--- Employee List ---")

    for employee in employees:
        print("ID:", employee[0])
        print("Name:", employee[1])
        print("Department:", employee[2])
        print("Salary:", employee[3])
        print("--------------------")

# Search Employee
def search_employee():
    employee_id = input("Enter Employee ID to search: ")

    for employee in employees:
        if employee[0] == employee_id:
            print("\nEmployee Found:")
            print("ID:", employee[0])
            print("Name:", employee[1])
            print("Department:", employee[2])
            print("Salary:", employee[3])
            return

    print("Employee not found.")

# Update Employee
def update_employee():
    employee_id = input("Enter Employee ID to update: ")

    for employee in employees:
        if employee[0] == employee_id:
            employee[1] = input("Enter New Name: ")
            employee[2] = input("Enter New Department: ")
            employee[3] = float(input("Enter New Salary: "))

            print("Employee updated successfully!")
            return

    print("Employee not found.")

# Delete Employee
def delete_employee():
    employee_id = input("Enter Employee ID to delete: ")

    for employee in employees:
        if employee[0] == employee_id:
            employees.remove(employee)
            print("Employee deleted successfully!")
            return

    print("Employee not found.")

# Highest Salary
def highest_salary():
    if not employees:
        print("No employees found.")
        return

    employee = max(employees, key=lambda x: x[3])

    print("\nHighest Salary Employee:")
    print("Name:", employee[1])
    print("Salary:", employee[3])

# Average Salary
def average_salary():
    if not employees:
        print("No employees found.")
        return

    total = 0

    for employee in employees:
        total += employee[3]

    average = total / len(employees)

    print("Average Salary:", average)

# Department Filter
def department_filter():
    department = input("Enter Department: ")

    found = False

    for employee in employees:
        if employee[2].lower() == department.lower():
            print(employee)
            found = True

    if not found:
        print("No employees found in this department.")

# Main Menu
while True:

    print("\n===== Employee Management System =====")
    print("1. Add Employee")
    print("2. Update Employee")
    print("3. Delete Employee")
    print("4. Search Employee")
    print("5. List Employees")
    print("6. Highest Salary")
    print("7. Average Salary")
    print("8. Department Filter")
    print("9. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        add_employee()

    elif choice == "2":
        update_employee()

    elif choice == "3":
        delete_employee()

    elif choice == "4":
        search_employee()

    elif choice == "5":
        list_employees()

    elif choice == "6":
        highest_salary()

    elif choice == "7":
        average_salary()

    elif choice == "8":
        department_filter()

    elif choice == "9":
        print("Thank you for using Employee Management System!")
        break

    else:
        print("Invalid choice. Please try again.")