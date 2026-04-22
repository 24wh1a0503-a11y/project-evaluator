
const API_URL = "https://project-evaluator-6pfh.onrender.com/evaluate";

function evaluateRepo() {
    const repo = document.getElementById("repoInput").value.trim();
    const resultDiv = document.getElementById("result");
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");

    // Reset UI
    resultDiv.classList.add("hidden");
    error.classList.add("hidden");

    if (!repo.includes("github.com")) {
        error.innerText = "⚠️ Please enter a valid GitHub URL";
        error.classList.remove("hidden");
        return;
    }

    loading.classList.remove("hidden");

    fetch(`${API_URL}?repo_url=${encodeURIComponent(repo)}`)
        .then(res => res.json())
        .then(data => {
            loading.classList.add("hidden");

            if (data.error) {
                error.innerText = "❌ " + data.error;
                error.classList.remove("hidden");
                return;
            }

            resultDiv.innerHTML = `
                <h2>${data.repo.name}</h2>
                <p>⭐ Stars: ${data.repo.stars}</p>
                <p>🍴 Forks: ${data.repo.forks}</p>
                <p>🐞 Issues: ${data.repo.issues}</p>
                <p class="score">🔥 Score: ${data.ml_score}/100</p>
            `;

            resultDiv.classList.remove("hidden");
        })
        .catch(() => {
            loading.classList.add("hidden");
            error.innerText = "⚠️ Failed to connect to server";
            error.classList.remove("hidden");
        });
}