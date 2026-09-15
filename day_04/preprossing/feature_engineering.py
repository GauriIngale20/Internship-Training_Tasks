import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path


# Load Dataset

base_dir = Path(__file__).resolve().parent.parent
file_path = base_dir / "dataset" / "facility_hygiene.csv"

evaluation_dir = base_dir / "evaluation" / "EDA_Visualizations"
evaluation_dir.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(file_path)

print("Dataset loaded successfully.")


# Basic Statistics

print("\n--- Statistical Summary ---")
print(df.describe())


# Hygiene Risk Distribution

print("\n--- Hygiene Risk Distribution ---")
print(df["hygiene_risk"].value_counts())


# Location Distribution

print("\n--- Facilities by Location ---")
print(df["location"].value_counts())


# Waste Level Distribution

print("\n--- Waste Level Distribution ---")
print(df["waste_level"].value_counts())


# Hygiene Risk Visualization

plt.figure(figsize=(7, 5))
sns.countplot(data=df, x="hygiene_risk")

plt.title("Hygiene Risk Distribution")
plt.xlabel("Hygiene Risk (0 = Low, 1 = High)")
plt.ylabel("Number of Facilities")

plt.tight_layout()
plt.savefig(evaluation_dir / "hygiene_risk_distribution.png")
plt.close()


# Cleanliness Score Visualization

plt.figure(figsize=(7, 5))
sns.histplot(
    data=df,
    x="cleanliness_score",
    bins=10,
    kde=True
)

plt.title("Cleanliness Score Distribution")
plt.xlabel("Cleanliness Score")
plt.ylabel("Number of Facilities")

plt.tight_layout()
plt.savefig(evaluation_dir / "cleanliness_distribution.png")
plt.close()


# Waste Level Visualization

plt.figure(figsize=(7, 5))
sns.countplot(data=df, x="waste_level")

plt.title("Waste Level Distribution")
plt.xlabel("Waste Level")
plt.ylabel("Number of Facilities")

plt.tight_layout()
plt.savefig(evaluation_dir / "waste_level_distribution.png")
plt.close()


# Complaints vs Hygiene Risk

plt.figure(figsize=(7, 5))
sns.boxplot(
    data=df,
    x="hygiene_risk",
    y="complaints"
)

plt.title("Complaints vs Hygiene Risk")
plt.xlabel("Hygiene Risk (0 = Low, 1 = High)")
plt.ylabel("Number of Complaints")

plt.tight_layout()
plt.savefig(evaluation_dir / "complaints_vs_risk.png")
plt.close()


# Cleaning Delay vs Hygiene Risk

plt.figure(figsize=(7, 5))
sns.boxplot(
    data=df,
    x="hygiene_risk",
    y="hours_since_cleaning"
)

plt.title("Cleaning Delay vs Hygiene Risk")
plt.xlabel("Hygiene Risk (0 = Low, 1 = High)")
plt.ylabel("Hours Since Cleaning")

plt.tight_layout()
plt.savefig(evaluation_dir / "cleaning_delay_vs_risk.png")
plt.close()


# Feature Engineering

df["complaints_per_100_footfall"] = (
    df["complaints"] / df["footfall"]
) * 100

print("\n--- New Feature ---")
print("complaints_per_100_footfall")

print(
    df[
        [
            "complaints",
            "footfall",
            "complaints_per_100_footfall"
        ]
    ].head()
)


print("\nEDA and feature engineering completed successfully.")
print("All visualizations are saved in evaluation/EDA_Visualizations.")