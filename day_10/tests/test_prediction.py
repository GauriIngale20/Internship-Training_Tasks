import joblib
import pandas as pd


def test_model_prediction():

    model = joblib.load(
        "models/logistic_regression.pkl"
    )

    input_data = pd.DataFrame({
        "cleanliness_score": [2],
        "odor_score": [9],
        "waste_level": [9],
        "water_availability": [0],
        "footfall": [450],
        "complaints": [18],
        "hours_since_cleaning": [40],
        "complaints_per_100_footfall": [
            (18 / 450) * 100
        ]
    })

    prediction = model.predict(input_data)[0]

    assert prediction in [
        "Low",
        "Medium",
        "High"
    ]