import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle


# Train model (kept for project completeness)
def train_model():
    df = pd.read_csv("data/dataset.csv")

    X = df[["commits", "stars", "forks", "issues"]]
    y = df["score"]

    model = LinearRegression()
    model.fit(X, y)

    with open("models/model.pkl", "wb") as f:
        pickle.dump(model, f)

    print("Model trained successfully")


# FINAL SCORE FUNCTION (STABLE + DEMO READY)
def predict_score(data):
    stars = data["stars"]
    forks = data["forks"]
    issues = data["issues"]

    # Smart scoring logic
    score = (
        (stars * 0.0003) +
        (forks * 0.0005) -
        (issues * 0.0002)
    )

    # Clamp score between 0–100
    score = max(0, min(100, score))

    return round(score, 2)


# Run training if file executed directly
if __name__ == "__main__":
    train_model()