import json

# Read JSON file
with open("students.json", "r") as file:
    students = json.load(file)

# 1. Record Count
record_count = len(students)

# 2. Missing Values
missing_values = 0

for student in students:
    for value in student.values():
        if value is None or value == "":
            missing_values += 1

# 3. Duplicate Records
unique_records = []

for student in students:
    if student not in unique_records:
        unique_records.append(student)

duplicate_count = len(students) - len(unique_records)

# Get valid marks
marks = []

for student in students:
    if isinstance(student.get("marks"), (int, float)):
        marks.append(student["marks"])

# 4. Average, Minimum and Maximum
average_marks = sum(marks) / len(marks)
minimum_marks = min(marks)
maximum_marks = max(marks)

# 5. Category-wise Statistics
category_data = {}

for student in students:
    department = student["department"]
    mark = student.get("marks")

    if department not in category_data:
        category_data[department] = []

    if isinstance(mark, (int, float)):
        category_data[department].append(mark)

# Display Report
print("===== JSON DATA ANALYSIS =====")

print("\nRecord Count:", record_count)
print("Missing Values:", missing_values)
print("Duplicate Records:", duplicate_count)

print("\nMarks Statistics")
print("Average:", round(average_marks, 2))
print("Minimum:", minimum_marks)
print("Maximum:", maximum_marks)

print("\nCategory-wise Statistics")

for department, department_marks in category_data.items():

    if department_marks:
        average = sum(department_marks) / len(department_marks)

        print(
            department,
            "-> Count:", len(department_marks),
            "Average:", round(average, 2),
            "Minimum:", min(department_marks),
            "Maximum:", max(department_marks)
        )
    else:
        print(department, "-> No valid marks")