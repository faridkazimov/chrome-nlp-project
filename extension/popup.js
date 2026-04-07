const API_URL = "http://127.0.0.1:8000/analyze";

const textInput = document.getElementById("text-input");
const analyzeBtn = document.getElementById("analyze-btn");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const resultsEl = document.getElementById("results");

// Load selected text from context menu or active tab
document.addEventListener("DOMContentLoaded", async () => {
  const stored = await chrome.storage.local.get("selectedText");
  if (stored.selectedText) {
    textInput.value = stored.selectedText;
    chrome.storage.local.remove("selectedText");
    return;
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString()
    });
    if (result) textInput.value = result;
  } catch {
    // No permission or no selection — user can type manually
  }
});

analyzeBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();
  if (!text) return;

  showLoading();

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || `Server error (${res.status})`);
    }

    const data = await res.json();
    renderResults(data);
  } catch (err) {
    showError(err.message === "Failed to fetch"
      ? "Cannot reach API. Is the backend running?"
      : err.message
    );
  }
});

function showLoading() {
  loadingEl.style.display = "block";
  resultsEl.style.display = "none";
  errorEl.style.display = "none";
  analyzeBtn.disabled = true;
}

function showError(msg) {
  loadingEl.style.display = "none";
  resultsEl.style.display = "none";
  errorEl.style.display = "block";
  errorEl.textContent = msg;
  analyzeBtn.disabled = false;
}

function renderResults(data) {
  loadingEl.style.display = "none";
  errorEl.style.display = "none";
  resultsEl.style.display = "block";
  analyzeBtn.disabled = false;

  // Sentiment
  const sentLabel = data.sentiment.label;
  const sentScore = data.sentiment.score;
  document.getElementById("sentiment-label").textContent = sentLabel;
  document.getElementById("sentiment-score").textContent = `${(sentScore * 100).toFixed(1)}%`;
  const sentBar = document.getElementById("sentiment-bar");
  sentBar.style.width = `${sentScore * 100}%`;
  sentBar.className = "score-fill";
  if (sentLabel === "positive") sentBar.classList.add("sentiment-positive");
  else if (sentLabel === "negative") sentBar.classList.add("sentiment-negative");
  else sentBar.classList.add("sentiment-neutral");

  // Classification
  document.getElementById("class-label").textContent = data.classification.label;
  document.getElementById("class-score").textContent = `${(data.classification.score * 100).toFixed(1)}%`;
  document.getElementById("class-bar").style.width = `${data.classification.score * 100}%`;

  // Entities
  const container = document.getElementById("entities-container");
  container.replaceChildren();
  if (data.entities.length === 0) {
    const noEnt = document.createElement("span");
    noEnt.className = "no-entities";
    noEnt.textContent = "No entities found";
    container.appendChild(noEnt);
    return;
  }
  data.entities.forEach((ent) => {
    const tag = document.createElement("span");
    tag.className = `entity-tag entity-${ent.label}`;

    const textNode = document.createTextNode(ent.text + " ");
    tag.appendChild(textNode);

    const labelSpan = document.createElement("span");
    labelSpan.className = "entity-label";
    labelSpan.textContent = ent.label;
    tag.appendChild(labelSpan);

    container.appendChild(tag);
  });
}
