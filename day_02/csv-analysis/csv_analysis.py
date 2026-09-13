import csv

FILE_NAME = "student_data.csv"


# Read data from CSV file
def read_csv():
    try:
        with open(FILE_NAME, "r", newline="") as file:
            return list(csv.DictReader(file))
    except FileNotFoundError:
        print("Error: CSV file not found.")
        return []


# Analyze CSV data
def analyze_data(data):

    if not data:
        print("No data available.")
        return

    print("===== CSV DATA ANALYSIS =====")

    # 1. Record count
    print("\nRecord Count:", len(data))

    # 2. Missing values
    missing_values = 0

    for row in data:
        for value in row.values():
            if value == "":
                missing_values += 1

    print("Missing Values:", missing_values)

    # 3. Duplicate records
    unique_records = []

    for row in data:
        if row not in unique_records:
            unique_records.append(row)

    duplicates = len(data) - len(unique_records)

    print("Duplicate Records:", duplicates)

    # Get valid marks
    marks = [
        float(row["marks"])
        for row in data
        if row["marks"] != ""
    ]

    # 4. Average, minimum and maximum
    print("\nMarks Statistics")
    print("Average:", round(sum(marks) / len(marks), 2))
    print("Minimum:", min(marks))
    print("Maximum:", max(marks))

    # 5. Category-wise statistics
    departments = {}

    for row in data:
        department = row["department"]

        if department not in departments:
            departments[department] = []

        if row["marks"] != "":
            departments[department].append(float(row["marks"]))

    print("\nCategory-wise Statistics")

    for department, values in departments.items():

        if values:
            average = sum(values) / len(values)

            print(
                f"{department} -> "
                f"Count: {len(values)}, "
                f"Average: {average:.2f}, "
                f"Minimum: {min(values)}, "
                f"Maximum: {max(values)}"
            )
        else:
            print(f"{department} -> No valid marks")


# Main program
def main():
    data = read_csv()
    analyze_data(data)


if __name__ == "__main__":
    main()