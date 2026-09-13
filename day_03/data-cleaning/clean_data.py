import pandas as pd

# 1. Read the raw dataset
df = pd.read_csv("../dataset/facility_data.csv")

print("Original data:")
print(df.head())

# 2. Check missing values
print("\nMissing values:")
print(df.isnull().sum())

# 3. Remove duplicate rows
print("\nDuplicate rows:", df.duplicated().sum())

df = df.drop_duplicates()

# 4. Remove duplicate facility IDs
df = df.drop_duplicates(subset="facility_id")

# 5. Fill missing numerical values with median
df["cleanliness_score"] = df["cleanliness_score"].fillna(
    df["cleanliness_score"].median()
)

df["odor_score"] = df["odor_score"].fillna(
    df["odor_score"].median()
)

df["footfall"] = df["footfall"].fillna(
    df["footfall"].median()
)

df["complaints"] = df["complaints"].fillna(
    df["complaints"].median()
)

# 6. Fill missing text values with most common value
df["location"] = df["location"].fillna(
    df["location"].mode()[0]
)

df["waste_level"] = df["waste_level"].fillna(
    df["waste_level"].mode()[0]
)

df["water_availability"] = df["water_availability"].fillna(
    df["water_availability"].mode()[0]
)

# 7. Clean text values
df["location"] = df["location"].str.strip().str.title()
df["waste_level"] = df["waste_level"].str.strip().str.title()
df["water_availability"] = df["water_availability"].str.strip().str.title()

# 8. Fix invalid cleanliness scores
df.loc[
    ~df["cleanliness_score"].between(0, 10),
    "cleanliness_score"
] = df["cleanliness_score"].median()

# 9. Fix invalid odor scores
df.loc[
    ~df["odor_score"].between(0, 10),
    "odor_score"
] = df["odor_score"].median()

# 10. Fix negative footfall
df.loc[
    df["footfall"] < 0,
    "footfall"
] = df["footfall"].median()

# 11. Fix negative complaints
df.loc[
    df["complaints"] < 0,
    "complaints"
] = df["complaints"].median()

# 12. Convert inspection date into proper date format
df["inspection_date"] = pd.to_datetime(
    df["inspection_date"],
    errors="coerce"
)

# Remove rows with invalid dates
df = df.dropna(subset=["inspection_date"])

# 13. Check the cleaned data
print("\nMissing values after cleaning:")
print(df.isnull().sum())

print("\nDuplicate rows after cleaning:")
print(df.duplicated().sum())

# 14. Save the cleaned dataset
df.to_csv(
    "../dataset/cleaned_facility_data.csv",
    index=False
)

print("\nCleaning completed successfully!")
print("Cleaned dataset saved as cleaned_facility_data.csv")
print("Final number of rows:", len(df))