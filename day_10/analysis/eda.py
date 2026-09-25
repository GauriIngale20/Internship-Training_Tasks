import os

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


DATA_PATH = "dataset/facility_hygiene.csv"
OUTPUT_DIR = "visualizations"


def load_data():
    return pd.read_csv(DATA_PATH)


def create_output_directory():
    os.makedirs(OUTPUT_DIR, exist_ok=True)


def risk_distribution(df):
    plt.figure(figsize=(8, 5))

    sns.countplot(
        data=df,
        x="hygiene_risk",
        order=["Low", "Medium", "High"]
    )

    plt.title("Hygiene Risk Distribution")
    plt.xlabel("Hygiene Risk")
    plt.ylabel("Number of Facilities")
    plt.tight_layout()

    plt.savefig(
        f"{OUTPUT_DIR}/risk_distribution.png",
        dpi=300
    )

    plt.close()


def risk_by_facility_type(df):
    plt.figure(figsize=(10, 6))

    sns.countplot(
        data=df,
        x="facility_type",
        hue="hygiene_risk"
    )

    plt.title("Hygiene Risk by Facility Type")
    plt.xlabel("Facility Type")
    plt.ylabel("Number of Facilities")
    plt.xticks(rotation=30)
    plt.tight_layout()

    plt.savefig(
        f"{OUTPUT_DIR}/risk_by_facility_type.png",
        dpi=300
    )

    plt.close()


def cleanliness_vs_risk(df):
    plt.figure(figsize=(8, 5))

    sns.boxplot(
        data=df,
        x="hygiene_risk",
        y="cleanliness_score",
        order=["Low", "Medium", "High"]
    )

    plt.title("Cleanliness Score vs Hygiene Risk")
    plt.xlabel("Hygiene Risk")
    plt.ylabel("Cleanliness Score")
    plt.tight_layout()

    plt.savefig(
        f"{OUTPUT_DIR}/cleanliness_vs_risk.png",
        dpi=300
    )

    plt.close()


def complaints_vs_risk(df):
    plt.figure(figsize=(8, 5))

    sns.boxplot(
        data=df,
        x="hygiene_risk",
        y="complaints",
        order=["Low", "Medium", "High"]
    )

    plt.title("Complaints vs Hygiene Risk")
    plt.xlabel("Hygiene Risk")
    plt.ylabel("Number of Complaints")
    plt.tight_layout()

    plt.savefig(
        f"{OUTPUT_DIR}/complaints_vs_risk.png",
        dpi=300
    )

    plt.close()


def correlation_heatmap(df):
    numeric_columns = [
        "cleanliness_score",
        "odor_score",
        "waste_level",
        "water_availability",
        "footfall",
        "complaints",
        "hours_since_cleaning"
    ]

    correlation = df[numeric_columns].corr()

    plt.figure(figsize=(10, 7))

    sns.heatmap(
        correlation,
        annot=True,
        fmt=".2f",
        cmap="coolwarm"
    )

    plt.title("Feature Correlation Heatmap")
    plt.tight_layout()

    plt.savefig(
        f"{OUTPUT_DIR}/correlation_heatmap.png",
        dpi=300
    )

    plt.close()


def main():
    print("Loading dataset...")

    df = load_data()

    print(f"Dataset shape: {df.shape}")

    create_output_directory()

    print("\nGenerating visualizations...")

    risk_distribution(df)
    print("✓ Risk distribution created")

    risk_by_facility_type(df)
    print("✓ Facility type analysis created")

    cleanliness_vs_risk(df)
    print("✓ Cleanliness vs risk created")

    complaints_vs_risk(df)
    print("✓ Complaints vs risk created")

    correlation_heatmap(df)
    print("✓ Correlation heatmap created")

    print("\nEDA completed successfully!")
    print(f"Visualizations saved in: {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()