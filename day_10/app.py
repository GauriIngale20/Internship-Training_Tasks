import joblib
import pandas as pd
import streamlit as st
import matplotlib.pyplot as plt


# Page Configuration

st.set_page_config(
    page_title="Smart Hygiene Risk Prediction",
    page_icon="🧼",
    layout="wide"
)


# Load Data and Model

@st.cache_data
def load_data():
    return pd.read_csv("day_10/dataset/facility_hygiene.csv")


@st.cache_resource
def load_model():
    return joblib.load("day_10/models/logistic_regression.pkl")


df = load_data()
model = load_model()


# Header

st.title("🧼 Smart Facility Hygiene Risk Prediction System")

st.write(
    "An AI-powered system for predicting facility hygiene risk "
    "using machine learning and facility inspection data."
)

st.divider()


# Dashboard Metrics

total_facilities = len(df)

high_risk = len(
    df[df["hygiene_risk"] == "High"]
)

medium_risk = len(
    df[df["hygiene_risk"] == "Medium"]
)

low_risk = len(
    df[df["hygiene_risk"] == "Low"]
)


col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        "Total Facilities",
        total_facilities
    )

with col2:
    st.metric(
        "🔴 High Risk",
        high_risk
    )

with col3:
    st.metric(
        "🟡 Medium Risk",
        medium_risk
    )

with col4:
    st.metric(
        "🟢 Low Risk",
        low_risk
    )


st.divider()


# Hygiene Risk Analytics

st.subheader("📊 Hygiene Risk Analytics")

col1, col2 = st.columns(2)


# Risk Distribution Chart

with col1:

    risk_order = [
        "Low",
        "Medium",
        "High"
    ]

    risk_counts = (
        df["hygiene_risk"]
        .value_counts()
        .reindex(
            risk_order,
            fill_value=0
        )
    )

    fig, ax = plt.subplots(
        figsize=(7, 4)
    )

    ax.bar(
        risk_counts.index,
        risk_counts.values
    )

    ax.set_title(
        "Hygiene Risk Distribution"
    )

    ax.set_xlabel(
        "Risk Level"
    )

    ax.set_ylabel(
        "Number of Facilities"
    )

    st.pyplot(
        fig,
        use_container_width=True
    )

    plt.close(fig)


# Risk by Facility Type

with col2:

    facility_risk = pd.crosstab(
        df["facility_type"],
        df["hygiene_risk"]
    )

    st.write(
        "**Risk by Facility Type**"
    )

    st.bar_chart(
        facility_risk
    )


st.divider()


# Prediction Section

st.subheader(
    "🔮 Predict Facility Hygiene Risk"
)

st.write(
    "Enter facility inspection details to "
    "generate an AI-based hygiene risk prediction."
)


col1, col2, col3 = st.columns(3)


# Column 1

with col1:

    cleanliness_score = st.slider(
        "Cleanliness Score",
        min_value=1.0,
        max_value=10.0,
        value=7.0,
        step=0.1
    )

    odor_score = st.slider(
        "Odor Score",
        min_value=1.0,
        max_value=10.0,
        value=3.0,
        step=0.1
    )

    waste_level = st.slider(
        "Waste Level",
        min_value=1.0,
        max_value=10.0,
        value=3.0,
        step=0.1
    )


# Column 2

with col2:

    water_availability = st.selectbox(
        "Water Availability",
        options=[1, 0],
        format_func=lambda x:
            "Available"
            if x == 1
            else "Not Available"
    )

    footfall = st.number_input(
        "Daily Footfall",
        min_value=1,
        max_value=5000,
        value=150
    )

    complaints = st.number_input(
        "Number of Complaints",
        min_value=0,
        max_value=100,
        value=2
    )


# Column 3

with col3:

    hours_since_cleaning = st.number_input(
        "Hours Since Last Cleaning",
        min_value=1,
        max_value=72,
        value=6
    )


# Prediction Button

if st.button(
    "🔍 Predict Hygiene Risk",
    use_container_width=True
):

    complaints_per_100_footfall = (
        complaints / max(footfall, 1)
    ) * 100


    input_data = pd.DataFrame({

        "cleanliness_score": [
            cleanliness_score
        ],

        "odor_score": [
            odor_score
        ],

        "waste_level": [
            waste_level
        ],

        "water_availability": [
            water_availability
        ],

        "footfall": [
            footfall
        ],

        "complaints": [
            complaints
        ],

        "hours_since_cleaning": [
            hours_since_cleaning
        ],

        "complaints_per_100_footfall": [
            complaints_per_100_footfall
        ]

    })


    # Prediction

    prediction = model.predict(
        input_data
    )[0]


    probabilities = model.predict_proba(
        input_data
    )[0]


    classes = model.classes_


    probability_df = pd.DataFrame({

        "Risk Level": classes,

        "Probability": probabilities

    })


    st.divider()

    st.subheader(
        "📌 Prediction Result"
    )


    # Display Risk

    if prediction == "High":

        st.error(
            f"🔴 Predicted Risk: {prediction}"
        )

    elif prediction == "Medium":

        st.warning(
            f"🟡 Predicted Risk: {prediction}"
        )

    else:

        st.success(
            f"🟢 Predicted Risk: {prediction}"
        )


    # Probability

    st.subheader(
        "📈 Risk Probability"
    )


    probability_df["Probability"] = (
        probability_df["Probability"] * 100
    ).round(2)


    st.bar_chart(
        probability_df.set_index(
            "Risk Level"
        )
    )


    st.dataframe(
        probability_df,
        use_container_width=True,
        hide_index=True
    )


st.divider()


# Feature Importance

st.subheader(
    "🌳 Important Risk Factors"
)


feature_importance_path = (
    "day_10/models/feature_importance.csv"
)


try:

    importance_df = pd.read_csv(
        feature_importance_path
    )

    importance_df = (
        importance_df
        .sort_values(
            "importance",
            ascending=False
        )
    )

    st.bar_chart(
        importance_df.set_index(
            "feature"
        )
    )

except FileNotFoundError:

    st.info(
        "Feature importance data is not available."
    )


st.divider()


# Dataset Preview

st.subheader(
    "📋 Facility Dataset Preview"
)

st.dataframe(
    df.head(20),
    use_container_width=True,
    hide_index=True
)


# Footer

st.caption(
    "Smart Facility Hygiene Risk Prediction System | "
    "AI/ML Internship Final Project"
)