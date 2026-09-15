import pandas as pd
import joblib

from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)


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

print("Dataset split completed.")


# Load Trained Models

logistic_path = base_dir / "models" / "logistic_regression.pkl"
random_forest_path = base_dir / "models" / "random_forest.pkl"

logistic_model = joblib.load(logistic_path)
random_forest_model = joblib.load(random_forest_path)

print("Trained models loaded successfully.")


# Make Predictions

logistic_predictions = logistic_model.predict(X_test)
random_forest_predictions = random_forest_model.predict(X_test)


# Calculate Logistic Regression Metrics

logistic_accuracy = accuracy_score(
    y_test,
    logistic_predictions
)

logistic_precision = precision_score(
    y_test,
    logistic_predictions,
    zero_division=0
)

logistic_recall = recall_score(
    y_test,
    logistic_predictions,
    zero_division=0
)

logistic_f1 = f1_score(
    y_test,
    logistic_predictions,
    zero_division=0
)


# Calculate Random Forest Metrics

random_forest_accuracy = accuracy_score(
    y_test,
    random_forest_predictions
)

random_forest_precision = precision_score(
    y_test,
    random_forest_predictions,
    zero_division=0
)

random_forest_recall = recall_score(
    y_test,
    random_forest_predictions,
    zero_division=0
)

random_forest_f1 = f1_score(
    y_test,
    random_forest_predictions,
    zero_division=0
)


# Display Model Comparison

print("\n--- Model Comparison ---")

print("\nLogistic Regression")
print(f"Accuracy:  {logistic_accuracy:.2f}")
print(f"Precision: {logistic_precision:.2f}")
print(f"Recall:    {logistic_recall:.2f}")
print(f"F1 Score:  {logistic_f1:.2f}")

print("\nRandom Forest")
print(f"Accuracy:  {random_forest_accuracy:.2f}")
print(f"Precision: {random_forest_precision:.2f}")
print(f"Recall:    {random_forest_recall:.2f}")
print(f"F1 Score:  {random_forest_f1:.2f}")


# Confusion Matrix

logistic_cm = confusion_matrix(
    y_test,
    logistic_predictions
)

random_forest_cm = confusion_matrix(
    y_test,
    random_forest_predictions
)

print("\n--- Confusion Matrix ---")

print("\nLogistic Regression:")
print(logistic_cm)

print("\nRandom Forest:")
print(random_forest_cm)


# Select Best Model

if random_forest_f1 >= logistic_f1:
    best_model = "Random Forest"
    best_score = random_forest_f1
else:
    best_model = "Logistic Regression"
    best_score = logistic_f1

print("\n--- Best Model ---")
print(f"Best Model: {best_model}")
print(f"F1 Score: {best_score:.2f}")


# Save Comparison Results

results = pd.DataFrame({
    "Model": [
        "Logistic Regression",
        "Random Forest"
    ],
    "Accuracy": [
        logistic_accuracy,
        random_forest_accuracy
    ],
    "Precision": [
        logistic_precision,
        random_forest_precision
    ],
    "Recall": [
        logistic_recall,
        random_forest_recall
    ],
    "F1_Score": [
        logistic_f1,
        random_forest_f1
    ]
})

evaluation_dir = base_dir / "evaluation"
evaluation_dir.mkdir(parents=True, exist_ok=True)

results_path = evaluation_dir / "model_comparison.csv"

results.to_csv(
    results_path,
    index=False
)

print("\nComparison results saved to:")
print(results_path)

print("\nModel comparison completed successfully.")