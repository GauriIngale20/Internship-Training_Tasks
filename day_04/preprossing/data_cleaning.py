import pandas as pd
from pathlib import Path

# Load Dataset

base_dir = Path(__file__).resolve().parent.parent
file_path = base_dir / "dataset" / "facility_hygiene.csv"

df = pd.read_csv(file_path)

print("Dataset loaded successfully.")

# Basic Dataset Information

print("\n--- Dataset Information ---")
print(f"Rows: {df.shape[0]}")
print(f"Columns: {df.shape[1]}")

print("\nFirst 5 records:")
print(df.head())


# Clean Column Names

df.columns = (
    df.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)

print("\nColumn names:")
print(df.columns.tolist())

# Check Missing Values

print("\n--- Missing Values ---")

missing_values = df.isnull().sum()
print(missing_values)

if missing_values.sum() == 0:
    print("No missing values found.")
else:
    print("Missing values are present in the dataset.")


# Check Duplicate Records

print("\n--- Duplicate Records ---")

duplicate_count = df.duplicated().sum()
print(f"Duplicate rows: {duplicate_count}")

if duplicate_count > 0:
    df = df.drop_duplicates()
    print("Duplicate rows removed.")
else:
    print("No duplicate records found.")


# Clean Text Columns

text_columns = ["facility_id", "location", "waste_level"]

for column in text_columns:
    df[column] = df[column].astype(str).str.strip()

# Convert Numerical Columns

numeric_columns = [
    "cleanliness_score",
    "odor_score",
    "complaints",
    "footfall",
    "hours_since_cleaning",
    "hygiene_risk"
]

for column in numeric_columns:
    df[column] = pd.to_numeric(df[column], errors="coerce")


# Check Invalid / Missing Values After Conversion


print("\n--- Missing Values After Data Type Check ---")
print(df.isnull().sum())


# Validate Numerical Ranges

print("\n--- Data Validation ---")

invalid_cleanliness = (
    (df["cleanliness_score"] < 0) |
    (df["cleanliness_score"] > 100)
).sum()

invalid_odor = (
    (df["odor_score"] < 0) |
    (df["odor_score"] > 10)
).sum()

invalid_complaints = (df["complaints"] < 0).sum()

invalid_footfall = (df["footfall"] < 0).sum()

invalid_cleaning_hours = (df["hours_since_cleaning"] < 0).sum()

invalid_risk = (~df["hygiene_risk"].isin([0, 1])).sum()

print(f"Invalid cleanliness scores: {invalid_cleanliness}")
print(f"Invalid odor scores: {invalid_odor}")
print(f"Invalid complaint values: {invalid_complaints}")
print(f"Invalid footfall values: {invalid_footfall}")
print(f"Invalid cleaning hours: {invalid_cleaning_hours}")
print(f"Invalid hygiene risk values: {invalid_risk}")


# Check Categorical Values

print("\n--- Categorical Values ---")

print("Locations:")
print(df["location"].unique())

print("\nWaste levels:")
print(df["waste_level"].unique())


# Final Dataset Check

print("\n--- Final Dataset ---")
print(f"Rows after cleaning: {df.shape[0]}")
print(f"Columns: {df.shape[1]}")

print("\nFinal data types:")
print(df.dtypes)

print("\nFinal 5 records:")
print(df.tail())


print("\nData cleaning completed successfully.")