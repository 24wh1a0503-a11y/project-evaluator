import requests

def get_repo_data(repo_url):
    repo_name = repo_url.replace("https://github.com/", "")
    
    url = f"https://api.github.com/repos/{repo_name}"
    
    response = requests.get(url)
    data = response.json()

    return {
        "name": data.get("name"),
        "stars": data.get("stargazers_count", 0),
        "forks": data.get("forks_count", 0),
        "issues": data.get("open_issues_count", 0)
    }