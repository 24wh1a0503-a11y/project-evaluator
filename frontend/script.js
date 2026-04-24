
let barChart;

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

document.addEventListener("DOMContentLoaded", () => {

  const title = document.getElementById("title");
  const input2 = document.getElementById("repo_url2");

  if (mode === "compare") {
    title.innerText = "⚖️ Compare Projects";
    input2.style.display = "block";
  }

  else if (mode === "report") {
    title.innerText = "📄 Generate Report";
  }

  else if (mode === "leaderboard") {
    title.innerText = "🏆 Leaderboard";
    showLeaderboard();
    return;
  }

  document.getElementById("analyzeBtn").onclick = evaluateRepo;
});


// MAIN
async function evaluateRepo() {

  const url = document.getElementById("repo_url").value;

  const res = await fetch(
    `http://127.0.0.1:8000/evaluate?repo_url=${encodeURIComponent(url)}`
  );

  const data = await res.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  displayData(data);

  if (mode === "report") {
    generateReport(data);
  }
}


// SHOW DATA
function displayData(data) {

  document.getElementById("dashboard").style.display = "block";

  const r = data.repo;

  document.getElementById("stars").innerText = r.stars;
  document.getElementById("forks").innerText = r.forks;
  document.getElementById("issues").innerText = r.issues;
  document.getElementById("score").innerText = data.ml_score;

  let grade = data.ml_score > 100000 ? "A" :
              data.ml_score > 50000 ? "B" : "C";

  document.getElementById("grade").innerText = grade;

  if (barChart) barChart.destroy();

  barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Stars", "Forks", "Issues"],
      datasets: [{
        label: "Metrics",
        data: [r.stars, r.forks, r.issues]
      }]
    }
  });
}


// 📄 REPORT
function generateReport(data) {

  const box = document.getElementById("reportBox");

  box.innerHTML = `
    <h2>📄 Project Report</h2>
    <p><b>Repository:</b> ${data.repo.name}</p>
    <p><b>Stars:</b> ${data.repo.stars}</p>
    <p><b>Forks:</b> ${data.repo.forks}</p>
    <p><b>Issues:</b> ${data.repo.issues}</p>
    <p><b>Score:</b> ${data.ml_score}</p>
    <p><b>Analysis:</b> ${
      data.ml_score > 100000 ? "Excellent project" :
      data.ml_score > 50000 ? "Good project" :
      "Needs improvement"
    }</p>
  `;
}


// 🏆 LEADERBOARD
function showLeaderboard() {

  document.getElementById("dashboard").style.display = "block";

  const box = document.getElementById("leaderboardBox");

  box.innerHTML = `
    <h2>🏆 Top Projects</h2>

    <div class="item">🥇 Linux — Score: 133k</div>
    <div class="item">🥈 React — Score: 130k</div>
    <div class="item">🥉 TensorFlow — Score: 120k</div>
  `;
}