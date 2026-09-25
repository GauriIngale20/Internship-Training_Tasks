from flask import Flask, request, jsonify
import joblib
import pandas as pd


app = Flask(__name__)

MODEL_PATH = "models/logistic_regression.pkl"

model = joblib.load(MODEL_PATH)


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


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Smart Facility Hygiene Risk Prediction API",
        "status": "running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    required_fields = [
        "cleanliness_score",
        "odor_score",
        "waste_level",
        "water_availability",
        "footfall",
        "complaints",
        "hours_since_cleaning"
    ]

    missing_fields = [
        field
        for field in required_fields
        if field not in data
    ]

    if missing_fields:
        return jsonify({
            "error": "Missing required fields",
            "fields": missing_fields
        }), 400

    complaints_per_100_footfall = (
        data["complaints"] /
        max(data["footfall"], 1)
    ) * 100

    input_data = pd.DataFrame([{
        "cleanliness_score":
            data["cleanliness_score"],

        "odor_score":
            data["odor_score"],

        "waste_level":
            data["waste_level"],

        "water_availability":
            data["water_availability"],

        "footfall":
            data["footfall"],

        "complaints":
            data["complaints"],

        "hours_since_cleaning":
            data["hours_since_cleaning"],

        "complaints_per_100_footfall":
            complaints_per_100_footfall
    }], columns=FEATURES)

    prediction = model.predict(
        input_data
    )[0]

    probabilities = model.predict_proba(
        input_data
    )[0]

    probability_result = {
        class_name: round(
            float(probability) * 100,
            2
        )
        for class_name, probability
        in zip(model.classes_, probabilities)
    }

    return jsonify({
        "predicted_risk": prediction,
        "risk_probabilities": probability_result
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )