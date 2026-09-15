import pandas as pd
import joblib

from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier


# Load Dataset

base_dir = Path(__file__).resolve().parent.parent
file_path = base_dir / "dataset" / "facility_hygiene.csv"

df = pd.read_csv(file_path)

print("Dataset loaded successfully.")


# Feature Engineering

df["complaints_per_100_footfall"] = (
    df["complaints"] / df["footfall"]
) * 100


# Select Features and Target

features = [
    "location",
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "complaints",
    "footfall",
    "hours_since_cleaning",
    "complaints_per_100_footfall"
]

X = df[features]
y = df["hygiene_risk"]

print("\nFeatures selected:")
print(features)

print("\nTarget: hygiene_risk")


# Split Dataset

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining records:", len(X_train))
print("Testing records:", len(X_test))


# Preprocess Categorical Features

categorical_features = [
    "location",
    "waste_level"
]

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        )
    ],
    remainder="passthrough"
)


# Train Logistic Regression

logistic_model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", LogisticRegression(max_iter=1000))
    ]
)

logistic_model.fit(X_train, y_train)

print("\nLogistic Regression trained successfully.")


# Train Random Forest

random_forest_model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "model",
            RandomForestClassifier(
                n_estimators=100,
                random_state=42
            )
        )
    ]
)

random_forest_model.fit(X_train, y_train)

print("Random Forest trained successfully.")


# Save Trained Models

logistic_path = base_dir / "models" / "logistic_regression.pkl"
random_forest_path = base_dir / "models" / "random_forest.pkl"

joblib.dump(logistic_model, logistic_path)
joblib.dump(random_forest_model, random_forest_path)

print("\nModels saved successfully.")
print("Logistic Regression:", logistic_path)
print("Random Forest:", random_forest_path)

print("\nModel training completed successfully.")