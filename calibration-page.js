const entries = Array.isArray(window.CALIBRATIONS) ? window.CALIBRATIONS : [];
const entryCount = document.getElementById("entryCount");
const entryLabel = document.getElementById("entryLabel");
const entryDate = document.getElementById("entryDate");
const entryWord = document.getElementById("entryWord");
const entryClass = document.getElementById("entryClass");
const entryText = document.getElementById("entryText");
const entryNote = document.getElementById("entryNote");
const archive = document.getElementById("entryArchive");
const previousEntry = document.getElementById("previousEntry");
const nextEntry = document.getElementById("nextEntry");
const shareEntry = document.getElementById("shareEntry");
let currentIndex = 0;

function requestedIndex(){
  const requested = decodeURIComponent(location.hash.slice(1));
  const index = entries.findIndex(item => String(item.entry) === requested);
  return index >= 0 ? index : 0;
}

function renderText(lines){
  entryText.replaceChildren();
  if(!lines.length){
    const empty = document.createElement("p");
    empty.className = "publication-empty";
    empty.textContent = "This entry has no text yet.";
    entryText.append(empty);
    return;
  }
  lines.forEach((line, index) => {
    entryText.append(document.createTextNode(line));
    if(index < lines.length - 1) entryText.append(document.createElement("br"));
  });
}

function renderArchive(){
  archive.replaceChildren();
  entries.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "publication-archive-item";
    button.type = "button";
    button.dataset.index = String(index);
    if(index === currentIndex) button.classList.add("is-active");
    const number = document.createElement("span"); number.textContent = item.entry;
    const word = document.createElement("strong"); word.textContent = item.word;
    const date = document.createElement("span"); date.textContent = item.date;
    const arrow = document.createElement("span"); arrow.textContent = "↗";
    button.append(number, word, date, arrow);
    button.addEventListener("click", () => { location.hash = item.entry; });
    archive.append(button);
  });
}

function renderEntry(index, updateHash = true){
  currentIndex = index;
  const item = entries[index];
  entryCount.textContent = `${String(entries.length).padStart(2, "0")} ENTRIES`;
  if(!item){
    entryLabel.textContent = "ARCHIVE / EMPTY"; entryDate.textContent = "—"; entryWord.textContent = "CALIBRATION"; entryClass.textContent = "—"; entryNote.textContent = ""; renderText([]); previousEntry.disabled = true; nextEntry.disabled = true; archive.replaceChildren(); return;
  }
  entryLabel.textContent = `ENTRY ${item.entry}`; entryDate.textContent = item.date; entryWord.textContent = item.word.toUpperCase(); entryClass.textContent = item.className; entryNote.textContent = item.note || "";
  renderText(Array.isArray(item.text) ? item.text : []);
  previousEntry.disabled = index >= entries.length - 1; nextEntry.disabled = index <= 0; renderArchive();
  if(updateHash && location.hash !== `#${item.entry}`) history.replaceState(null, "", `#${item.entry}`);
}

previousEntry.addEventListener("click", () => { if(currentIndex < entries.length - 1) location.hash = entries[currentIndex + 1].entry; });
nextEntry.addEventListener("click", () => { if(currentIndex > 0) location.hash = entries[currentIndex - 1].entry; });
window.addEventListener("hashchange", () => renderEntry(requestedIndex(), false));
shareEntry.addEventListener("click", async () => {
  const url = `${location.origin}${location.pathname}#${entries[currentIndex]?.entry || ""}`;
  try { await navigator.clipboard.writeText(url); shareEntry.textContent = "LINK COPIED ✓"; setTimeout(() => { shareEntry.textContent = "COPY ENTRY LINK ↗"; }, 1800); }
  catch { location.hash = entries[currentIndex]?.entry || ""; }
});
const progress = document.createElement("div"); progress.className = "reading-progress"; document.body.append(progress);
window.addEventListener("scroll", () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${max ? scrollY / max : 0})`; }, {passive:true});
renderEntry(requestedIndex());
