# Smart Facility Hygiene Risk Prediction System

## Overview

The **Smart Facility Hygiene Risk Prediction System** is an AI/ML-based application that predicts the hygiene risk level of a facility using inspection and operational data.

The system classifies facilities into three risk levels:

* **Low**
* **Medium**
* **High**

It includes data preprocessing, exploratory data analysis, machine learning model training, prediction, an interactive Streamlit dashboard, a Flask REST API, and automated testing.

## Features

* Generate and analyze facility hygiene data
* Data cleaning and preprocessing
* Exploratory Data Analysis (EDA)
* Train and compare multiple ML models
* Predict facility hygiene risk
* Display risk probabilities
* Analyze important risk factors
* Interactive Streamlit dashboard
* Flask REST API for predictions
* Automated model prediction testing

## Machine Learning Workflow

The project follows an end-to-end machine learning workflow:

1. Dataset generation
2. Data preprocessing
3. Exploratory Data Analysis
4. Feature preparation
5. Train-test split
6. Feature scaling
7. Model training
8. Model evaluation
9. Risk prediction
10. Dashboard and API integration

## Machine Learning Models

The following models are implemented and compared:

* Logistic Regression
* Decision Tree
* Random Forest

Model performance is evaluated using:

* Accuracy
* Precision
* Recall
* F1 Score

## Input Features

The prediction system uses the following features:

* Cleanliness Score
* Odor Score
* Waste Level
* Water Availability
* Daily Footfall
* Number of Complaints
* Hours Since Last Cleaning
* Complaints per 100 Footfall

## Risk Prediction

The system predicts one of the following hygiene risk levels:

| Risk Level | Description           |
| ---------- | --------------------- |
| Low        | Lower hygiene risk    |
| Medium     | Moderate hygiene risk |
| High       | Higher hygiene risk   |

## Streamlit Dashboard

The interactive dashboard provides:

* Total facility count
* High, Medium, and Low risk statistics
* Hygiene risk distribution
* Risk analysis by facility type
* Facility risk prediction
* Risk probability visualization
* Important risk factors
* Facility dataset preview

Run the dashboard using:

```bash
streamlit run app.py
```

## REST API

A Flask REST API is included for programmatic predictions.

Start the API using:

```bash
python api/app.py
```

The API runs on:

```text
http://127.0.0.1:5000
```

### Prediction Endpoint

```text
POST /predict
```

The endpoint accepts facility inspection data in JSON format and returns the predicted hygiene risk along with risk probabilities.

## Testing

The project includes a Pytest-based test for model prediction.

Run the test using:

```bash
python -m pytest tests/test_prediction.py -v
```

Example result:

```text
1 passed
```

## Project Structure

```text
day_10/
│
├── analysis/
│   └── eda.py
│
├── api/
│   └── app.py
│
├── dataset/
│   ├── generate_dataset.py
│   └── facility_hygiene.csv
│
├── models/
│   ├── train_models.py
│   ├── logistic_regression.pkl
│   ├── decision_tree.pkl
│   ├── random_forest.pkl
│   ├── model_comparison.csv
│   └── feature_importance.csv
│
├── preprocessing/
│   └── preprocess.py
│
├── predictions/
│
├── tests/
│   └── test_prediction.py
│
├── visualizations/
│   ├── risk_distribution.png
│   ├── risk_by_facility_type.png
│   ├── cleanliness_vs_risk.png
│   ├── complaints_vs_risk.png
│   └── correlation_heatmap.png
│
├── app.py
├── requirements.txt
└── README.md
```

## Technologies Used

* **Python**
* **Pandas**
* **NumPy**
* **Scikit-learn**
* **Matplotlib**
* **Seaborn**
* **Joblib**
* **Streamlit**
* **Flask**
* **Pytest**

## Installation

Clone the repository and install the required dependencies:

```bash
pip install -r requirements.txt
```

## Project Goal

The goal of this project is to demonstrate an end-to-end machine learning solution for analyzing facility hygiene data and predicting hygiene risk through an interactive dashboard and REST API.
