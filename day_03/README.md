# Day 03 — Data Analysis & Python for AI/ML

## Project Overview

This project focuses on **Data Analysis and Python for AI/ML** using NumPy, Pandas, and Matplotlib.

A facility dataset is inspected, cleaned, analyzed, and visualized to identify data quality issues and generate useful insights.

## Objectives

* Perform data inspection and cleaning.
* Handle missing values and duplicate records.
* Identify invalid data and potential outliers.
* Perform filtering, sorting, grouping, and aggregation.
* Calculate basic statistical measures using NumPy and Pandas.
* Create meaningful visualizations using Matplotlib.
* Extract useful insights from the dataset.

## Technologies Used

* Python
* NumPy
* Pandas
* Matplotlib
* Jupyter Notebook
* VS Code

## Project Structure

```text
day_03/
├── dataset/
├── data-cleaning/
├── analysis/
├── visualizations/
└── README.md
```

## Dataset

The dataset contains facility information such as:

* Location
* Cleanliness score
* Odor score
* Waste level
* Water availability
* Footfall
* Complaints
* Inspection date

## Data Cleaning

The raw dataset was cleaned by:

* Handling missing values
* Removing duplicate records
* Correcting invalid values
* Standardizing text data
* Converting inspection dates
* Identifying potential outliers

The cleaned dataset is saved as `cleaned_facility_data.csv`.

## Visualizations

The project includes:

1. Average Cleanliness Score by Location — Bar Chart
2. Total Complaints by Location — Bar Chart
3. Facility Footfall Distribution — Histogram
4. Footfall vs Complaints — Scatter Plot
5. Water Availability — Pie Chart

The generated charts are automatically saved in the `visualizations` folder.

## Key Findings

The analysis helps identify:

* Locations with higher or lower cleanliness scores.
* Locations with more complaints.
* Footfall distribution and potential outliers.
* The relationship between footfall and complaints.
* Overall water availability across facilities.

## Conclusion

This project demonstrates a basic **data analysis workflow**, from data cleaning and statistical analysis to visualization and insight generation using Python.
