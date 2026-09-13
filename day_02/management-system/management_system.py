import json

# Name of the JSON data file
FILE_NAME = "student_records.json"

# Load student data from JSON file
def load_students():
    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)

    # If file does not exist
    except FileNotFoundError:
        return []

    # If JSON file contains invalid data
    except json.JSONDecodeError:
        print("Invalid JSON file.")
        return []


# Save student data into JSON file
def save_students(students):
    with open(FILE_NAME, "w") as file:
        json.dump(students, file, indent=4)


# Display student records
def display_students(students):
    if not students:
        print("No students found.")
        return

    print("\nID  Name    Department  Marks")
    print("-" * 35)

    # Display each student
    for student in students:
        print(
            f"{student['id']:<3} "
            f"{student['name']:<8} "
            f"{student['department']:<12} "
            f"{student['marks']}"
        )


# Add a new student
def add_student(students):
    try:
        student_id = int(input("Enter ID: "))

        # Check whether ID already exists
        if any(s["id"] == student_id for s in students):
            print("ID already exists.")
            return

        name = input("Enter name: ")
        department = input("Enter department: ")
        marks = float(input("Enter marks: "))

        # Validate marks
        if not 0 <= marks <= 100:
            print("Marks must be between 0 and 100.")
            return

        # Create a new student record
        students.append({
            "id": student_id,
            "name": name,
            "department": department,
            "marks": marks
        })

        # Save updated data
        save_students(students)
        print("Student added successfully.")

    # Handle invalid input
    except ValueError:
        print("Please enter valid values.")


# Update an existing student
def update_student(students):
    try:
        student_id = int(input("Enter ID to update: "))

        # Search for the student
        for student in students:
            if student["id"] == student_id:

                # Update student details
                student["name"] = input("Enter new name: ")
                student["department"] = input("Enter new department: ")
                student["marks"] = float(input("Enter new marks: "))

                save_students(students)
                print("Student updated successfully.")
                return

        print("Student not found.")

    except ValueError:
        print("Please enter valid values.")


# Delete a student
def delete_student(students):
    try:
        student_id = int(input("Enter ID to delete: "))

        # Search and remove the student
        for student in students:
            if student["id"] == student_id:
                students.remove(student)
                save_students(students)
                print("Student deleted successfully.")
                return

        print("Student not found.")

    except ValueError:
        print("Please enter a valid ID.")


# Search students by name
def search_student(students):
    name = input("Enter name to search: ").lower()

    # Find matching students
    results = [
        s for s in students
        if name in s["name"].lower()
    ]

    display_students(results)


# Filter students by department
def filter_students(students):
    department = input("Enter department: ").lower()

    # Find students from selected department
    results = [
        s for s in students
        if s["department"].lower() == department
    ]

    display_students(results)


# Sort students by name or marks
def sort_students(students):
    print("\n1. Sort by Name")
    print("2. Sort by Marks")

    choice = input("Enter choice: ")

    if choice == "1":
        # Sort alphabetically by name
        result = sorted(students, key=lambda s: s["name"])

    elif choice == "2":
        # Sort marks from highest to lowest
        result = sorted(
            students,
            key=lambda s: s["marks"],
            reverse=True
        )

    else:
        print("Invalid choice.")
        return

    display_students(result)


# Calculate student statistics
def show_statistics(students):
    if not students:
        print("No data available.")
        return

    # Get all marks
    marks = [s["marks"] for s in students]

    print("\n===== STATISTICS =====")
    print("Total Students:", len(students))
    print("Average Marks:", round(sum(marks) / len(marks), 2))
    print("Minimum Marks:", min(marks))
    print("Maximum Marks:", max(marks))


# Main program
def main():
    # Load existing data
    students = load_students()

    # Keep showing menu until user exits
    while True:
        print("\n===== STUDENT MANAGEMENT SYSTEM =====")
        print("1. Add")
        print("2. Update")
        print("3. Delete")
        print("4. Search")
        print("5. Filter")
        print("6. Sort")
        print("7. Statistics")
        print("8. Display All")
        print("9. Exit")

        choice = input("Enter choice: ")

        # Perform operation according to user's choice
        if choice == "1":
            add_student(students)

        elif choice == "2":
            update_student(students)

        elif choice == "3":
            delete_student(students)

        elif choice == "4":
            search_student(students)

        elif choice == "5":
            filter_students(students)

        elif choice == "6":
            sort_students(students)

        elif choice == "7":
            show_statistics(students)

        elif choice == "8":
            display_students(students)

        elif choice == "9":
            print("Thank you!")
            break

        else:
            print("Invalid choice.")


# Start the program
if __name__ == "__main__":
    main()