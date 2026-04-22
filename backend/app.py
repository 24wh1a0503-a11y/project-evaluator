from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "API is working 🚀"}

@app.get("/evaluate")
def evaluate(repo_url: str = Query(...)):
    try:
        # Extract owner and repo name
        parts = repo_url.strip().split("/")

        if len(parts) < 5:
            return {"error": "Invalid GitHub URL"}

        owner = parts[3]
        repo = parts[4]

        # GitHub API
        api_url = f"https://api.github.com/repos/{owner}/{repo}"
        response = requests.get(api_url)

        if response.status_code != 200:
            return {"error": "Repository not found"}

        data = response.json()

        stars = data.get("stargazers_count", 0)
        forks = data.get("forks_count", 0)
        issues = data.get("open_issues_count", 0)

        # Simple ML score logic
        score = (stars * 0.5) + (forks * 0.3) - (issues * 0.2)

        return {
            "repo": {
                "name": repo,
                "stars": stars,
                "forks": forks,
                "issues": issues
            },
            "ml_score": round(score, 2)
        }

    except Exception as e:
        return {"error": str(e)}