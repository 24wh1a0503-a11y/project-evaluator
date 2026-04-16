from fastapi import FastAPI
from backend.scraper import get_repo_data
from backend.model import predict_score

app = FastAPI()


# Home route
@app.get("/")
def home():
    return {"message": "Project Evaluator API is running"}


# Evaluation route
@app.get("/evaluate")
def evaluate(repo_url: str):
    try:
        # Get GitHub data
        data = get_repo_data(repo_url)

        # Predict score using ML model
        score = predict_score(data)

        return {
            "repo": data,
            "ml_score": score
        }

    except Exception as e:
        return {
            "error": str(e)
        }