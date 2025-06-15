function toFullWidth(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        if (char === ' ') {
            result += '\u3000';
        } else if (code >= 33 && code <= 126) {
            result += String.fromCharCode(code + 0xFEE0);
        } else {
            result += char;
        }
    }
    return result;
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem("fullwidthHistory")) || [];
    history.forEach(displayHistoryEntry);
}

function saveHistoryEntry(entry) {
    const history = JSON.parse(localStorage.getItem("fullwidthHistory")) || [];
    history.unshift(entry);
    localStorage.setItem("fullwidthHistory", JSON.stringify(history.slice(0, 20)));
}

function displayHistoryEntry(convertedText) {
    const historyList = document.getElementById("historyList");
    const li = document.createElement("li");
    li.className = "history-item";

    const span = document.createElement("span");
    span.textContent = convertedText;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.className = "copy-btn";
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(convertedText).then(() => {
            copyBtn.textContent = "Copied!";
            setTimeout(() => (copyBtn.textContent = "Copy"), 1000);
        });
    });

    li.appendChild(span);
    li.appendChild(copyBtn);
    historyList.prepend(li);
}

function handleConvert() {
    const input = document.getElementById("inputText").value.trim();
    if (input === "") return;

    const converted = toFullWidth(input);
    document.getElementById("outputText").textContent = converted;

    displayHistoryEntry(converted);
    saveHistoryEntry(converted);
}

function clearHistory() {
    localStorage.removeItem("fullwidthHistory");
    document.getElementById("historyList").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
    document.getElementById("convertBtn").addEventListener("click", handleConvert);
    document.getElementById("clearHistoryBtn").addEventListener("click", clearHistory);
});
