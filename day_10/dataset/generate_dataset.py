import random
from datetime import datetime, timedelta

import numpy as np
import pandas as pd


random.seed(42)
np.random.seed(42)


def generate_dataset(number_of_records=500):
    locations = [
        "Amravati",
        "Nagpur",
        "Akola",
        "Pune",
        "Nashik",
        "Mumbai"
    ]

    facility_types = [
        "College",
        "Hospital",
        "Public Toilet",
        "Railway Station",
        "Bus Station",
        "Office"
    ]

    records = []

    start_date = datetime(2026, 1, 1)

    for i in range(1, number_of_records + 1):

        cleanliness_score = round(random.uniform(1, 10), 2)
        odor_score = round(random.uniform(1, 10), 2)
        waste_level = round(random.uniform(1, 10), 2)

        water_availability = random.choice([0, 1])

        footfall = random.randint(20, 500)

        complaints = random.randint(0, 20)

        hours_since_cleaning = random.randint(1, 48)

        location = random.choice(locations)
        facility_type = random.choice(facility_types)

        inspection_date = (
            start_date + timedelta(days=random.randint(0, 270))
        ).strftime("%Y-%m-%d")

        # Risk score used only to create realistic target labels
        risk_score = (
            (10 - cleanliness_score) * 0.25
            + odor_score * 0.15
            + waste_level * 0.25
            + complaints * 0.10
            + (footfall / 500) * 10 * 0.05
            + (hours_since_cleaning / 48) * 10 * 0.20
        )

        if water_availability == 0:
            risk_score += 1

        if risk_score < 4:
            hygiene_risk = "Low"
        elif risk_score < 6.5:
            hygiene_risk = "Medium"
        else:
            hygiene_risk = "High"

        records.append({
            "facility_id": f"FAC{i:04d}",
            "location": location,
            "facility_type": facility_type,
            "cleanliness_score": cleanliness_score,
            "odor_score": odor_score,
            "waste_level": waste_level,
            "water_availability": water_availability,
            "footfall": footfall,
            "complaints": complaints,
            "hours_since_cleaning": hours_since_cleaning,
            "inspection_date": inspection_date,
            "hygiene_risk": hygiene_risk
        })

    return pd.DataFrame(records)


def main():
    df = generate_dataset(500)

    output_path = "dataset/facility_hygiene.csv"

    df.to_csv(output_path, index=False)

    print("Dataset created successfully!")
    print(f"Records: {len(df)}")
    print(f"Columns: {len(df.columns)}")
    print(f"Saved to: {output_path}")
    print("\nRisk distribution:")
    print(df["hygiene_risk"].value_counts())
    print("\nFirst 5 records:")
    print(df.head())


if __name__ == "__main__":
    main()