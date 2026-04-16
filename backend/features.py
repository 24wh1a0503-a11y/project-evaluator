def calculate_score(data):
    score = 0

    # More commits = better project
    score += data.get("stars", 0) * 0.4

    # Popular project
    score += data.get("forks", 0) * 0.3

    # Issues reduce score
    score -= data.get("issues", 0) * 0.1

    return round(score, 2)