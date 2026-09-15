import pandas as pd
import joblib

from pathlib import Path
from sklearn.model_selection import train_test_split


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


# Split Dataset

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Test data prepared successfully.")


# Load Trained Models

logistic_path = base_dir / "models" / "logistic_regression.pkl"
random_forest_path = base_dir / "models" / "random_forest.pkl"

logistic_model = joblib.load(logistic_path)
random_forest_model = joblib.load(random_forest_path)

print("Trained models loaded successfully.")


# Make Predictions

logistic_predictions = logistic_model.predict(X_test)
random_forest_predictions = random_forest_model.predict(X_test)


# Create Prediction Results

predictions = X_test.copy()

predictions["actual_risk"] = y_test.values
predictions["logistic_prediction"] = logistic_predictions
predictions["random_forest_prediction"] = random_forest_predictions


# Convert Prediction Values to Labels

predictions["actual_risk_label"] = predictions["actual_risk"].map({
    0: "Low Risk",
    1: "High Risk"
})

predictions["logistic_prediction_label"] = predictions[
    "logistic_prediction"
].map({
    0: "Low Risk",
    1: "High Risk"
})

predictions["random_forest_prediction_label"] = predictions[
    "random_forest_prediction"
].map({
    0: "Low Risk",
    1: "High Risk"
})


# Save Predictions

predictions_dir = base_dir / "predictions"
predictions_dir.mkdir(parents=True, exist_ok=True)

prediction_path = predictions_dir / "hygiene_risk_predictions.csv"

predictions.to_csv(
    prediction_path,
    index=False
)

print("\nPredictions saved successfully.")
print("File:", prediction_path)


# Display Sample Predictions

print("\n--- Sample Predictions ---")

print(
    predictions[
        [
            "actual_risk_label",
            "logistic_prediction_label",
            "random_forest_prediction_label"
        ]
    ].head(10)
)

print("\nPrediction process completed successfully.")