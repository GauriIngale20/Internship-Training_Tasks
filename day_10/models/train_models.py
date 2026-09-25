import os
import joblib
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    ConfusionMatrixDisplay
)


DATA_PATH = "dataset/facility_hygiene.csv"

MODEL_DIR = "models"
VISUALIZATION_DIR = "visualizations"

FEATURES = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "water_availability",
    "footfall",
    "complaints",
    "hours_since_cleaning",
    "complaints_per_100_footfall"
]

TARGET = "hygiene_risk"


def load_data():
    df = pd.read_csv(DATA_PATH)

    df["complaints_per_100_footfall"] = (
        df["complaints"] /
        df["footfall"].replace(0, 1)
    ) * 100

    return df


def prepare_data(df):
    X = df[FEATURES]
    y = df[TARGET]

    return train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )


def create_models():

    models = {
        "Logistic Regression": Pipeline([
            ("scaler", StandardScaler()),
            (
                "model",
                LogisticRegression(
                    max_iter=1000,
                    random_state=42
                )
            )
        ]),

        "Decision Tree": DecisionTreeClassifier(
            max_depth=6,
            random_state=42
        ),

        "Random Forest": RandomForestClassifier(
            n_estimators=200,
            max_depth=8,
            random_state=42
        )
    }

    return models


def evaluate_model(model, X_test, y_test):

    predictions = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    precision = precision_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    recall = recall_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    return accuracy, precision, recall, f1, predictions


def save_confusion_matrix(model, X_test, y_test, model_name):

    predictions = model.predict(X_test)

    display = ConfusionMatrixDisplay.from_predictions(
        y_test,
        predictions,
        cmap="Blues"
    )

    display.ax_.set_title(
        f"{model_name} - Confusion Matrix"
    )

    plt.tight_layout()

    filename = (
        model_name.lower()
        .replace(" ", "_")
        + "_confusion_matrix.png"
    )

    plt.savefig(
        f"{VISUALIZATION_DIR}/{filename}",
        dpi=300
    )

    plt.close()


def save_feature_importance(model, model_name):

    if model_name == "Random Forest":

        importance = model.feature_importances_

        importance_df = pd.DataFrame({
            "feature": FEATURES,
            "importance": importance
        })

        importance_df = importance_df.sort_values(
            "importance",
            ascending=True
        )

        plt.figure(figsize=(9, 6))

        plt.barh(
            importance_df["feature"],
            importance_df["importance"]
        )

        plt.title("Random Forest Feature Importance")
        plt.xlabel("Importance")
        plt.ylabel("Feature")

        plt.tight_layout()

        plt.savefig(
            f"{VISUALIZATION_DIR}/feature_importance.png",
            dpi=300
        )

        plt.close()

        importance_df.to_csv(
            "models/feature_importance.csv",
            index=False
        )


def main():

    os.makedirs(MODEL_DIR, exist_ok=True)
    os.makedirs(VISUALIZATION_DIR, exist_ok=True)

    print("Loading dataset...")

    df = load_data()

    print(f"Dataset shape: {df.shape}")

    X_train, X_test, y_train, y_test = prepare_data(df)

    print(f"Training samples: {len(X_train)}")
    print(f"Testing samples: {len(X_test)}")

    models = create_models()

    results = []

    print("\nTraining models...\n")

    for model_name, model in models.items():

        print(f"Training {model_name}...")

        model.fit(
            X_train,
            y_train
        )

        accuracy, precision, recall, f1, predictions = evaluate_model(
            model,
            X_test,
            y_test
        )

        results.append({
            "Model": model_name,
            "Accuracy": round(accuracy, 4),
            "Precision": round(precision, 4),
            "Recall": round(recall, 4),
            "F1 Score": round(f1, 4)
        })

        save_confusion_matrix(
            model,
            X_test,
            y_test,
            model_name
        )

        save_feature_importance(
            model,
            model_name
        )

        model_filename = (
            model_name.lower()
            .replace(" ", "_")
            + ".pkl"
        )

        joblib.dump(
            model,
            f"{MODEL_DIR}/{model_filename}"
        )

        print(
            f"Accuracy: {accuracy:.4f} | "
            f"F1 Score: {f1:.4f}"
        )

        print("\nClassification Report:")
        print(
            classification_report(
                y_test,
                predictions,
                zero_division=0
            )
        )

    results_df = pd.DataFrame(results)

    results_df = results_df.sort_values(
        "F1 Score",
        ascending=False
    )

    results_df.to_csv(
        "models/model_comparison.csv",
        index=False
    )

    print("\n" + "=" * 60)
    print("MODEL COMPARISON")
    print("=" * 60)

    print(results_df.to_string(index=False))

    print("\nModel training completed successfully!")
    print("Models saved in: models/")
    print("Evaluation files saved in: models/")
    print("Visualizations saved in: visualizations/")


if __name__ == "__main__":
    main()