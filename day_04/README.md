# Day 4 – Machine Learning

## Project Overview

This project demonstrates a basic **Machine Learning classification workflow** for predicting **facility hygiene risk**.

The system uses factors such as cleanliness, odor, waste level, complaints, footfall, and hours since cleaning to classify facilities as **Low Risk (0)** or **High Risk (1)**.

## Objectives

* Understand basic Machine Learning concepts.
* Perform data cleaning and EDA.
* Apply feature engineering.
* Train and compare Machine Learning models.
* Evaluate model performance.
* Generate hygiene risk predictions.

## Dataset

The dataset contains facility hygiene-related information.

**Target Variable:** `hygiene_risk`

* `0` → Low Risk
* `1` → High Risk

**Main Features:**

* Location
* Cleanliness Score
* Odor Score
* Waste Level
* Complaints
* Footfall
* Hours Since Cleaning

The dataset is a **synthetic practice dataset**.

## Feature Engineering

A new feature was created:

`complaints_per_100_footfall`

It represents the number of complaints per 100 visitors.

## Machine Learning Models

Two classification models were trained:

* **Logistic Regression**
* **Random Forest Classifier**

The dataset was divided into **80% training** and **20% testing** data.

## Model Evaluation

The models were evaluated using:

* Accuracy
* Precision
* Recall
* F1 Score
* Confusion Matrix

## Project Structure

```text
day_04/
├── dataset/
├── preprocessing/
├── models/
├── evaluation/
├── predictions/
├── README.md
└── requirements.txt
```

## Technologies Used

* Python
* Pandas
* NumPy
* Matplotlib
* Seaborn
* Scikit-learn
* Joblib

## Conclusion

This project provides practical experience with **data preprocessing, EDA, feature engineering, model training, evaluation, and prediction** using Machine Learning.
