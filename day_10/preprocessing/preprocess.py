import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


DATA_PATH = "dataset/facility_hygiene.csv"


FEATURES = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "water_availability",
    "footfall",
    "complaints",
    "hours_since_cleaning"
]

TARGET = "hygiene_risk"


def load_data():
    return pd.read_csv(DATA_PATH)


def clean_data(df):
    df = df.copy()

    # Remove duplicate records
    df = df.drop_duplicates()

    # Convert date column
    df["inspection_date"] = pd.to_datetime(
        df["inspection_date"],
        errors="coerce"
    )

    # Remove invalid rows
    df = df.dropna(subset=[TARGET])

    # Fill missing numeric values
    numeric_columns = FEATURES

    for column in numeric_columns:
        df[column] = pd.to_numeric(
            df[column],
            errors="coerce"
        )

        df[column] = df[column].fillna(
            df[column].median()
        )

    # Create useful feature
    df["complaints_per_100_footfall"] = (
        df["complaints"] /
        df["footfall"].replace(0, 1)
    ) * 100

    return df


def prepare_features(df):
    feature_columns = FEATURES + [
        "complaints_per_100_footfall"
    ]

    X = df[feature_columns]
    y = df[TARGET]

    return X, y


def split_data(X, y):
    return train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )


def scale_features(X_train, X_test):
    scaler = StandardScaler()

    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    return X_train_scaled, X_test_scaled, scaler


if __name__ == "__main__":

    data = load_data()

    print("Original dataset:")
    print(data.shape)

    cleaned_data = clean_data(data)

    print("\nAfter cleaning:")
    print(cleaned_data.shape)

    X, y = prepare_features(cleaned_data)

    X_train, X_test, y_train, y_test = split_data(X, y)

    X_train_scaled, X_test_scaled, scaler = scale_features(
        X_train,
        X_test
    )

    print("\nTraining samples:", len(X_train))
    print("Testing samples:", len(X_test))

    print("\nFeatures:")
    print(list(X.columns))

    print("\nTarget distribution:")
    print(y.value_counts())