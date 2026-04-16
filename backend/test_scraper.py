from scraper import get_repo_data
from model import predict_score

repo = "https://github.com/tensorflow/tensorflow"

data = get_repo_data(repo)

score = predict_score(data)

print("Repo Data:", data)
print("ML Score:", score)