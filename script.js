const $ = (id) => document.getElementById(id);
const navOrb = $("navOrb");
const floatingNav = $("floatingNav");
const toast = $("toast");

/* ---------- toast ---------- */
let toastTimer;
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* ---------- floating menu ---------- */
function setNav(open){
  navOrb.classList.toggle("active", open);
  navOrb.setAttribute("aria-expanded", String(open));
  floatingNav.classList.toggle("open", open);
  floatingNav.setAttribute("aria-hidden", String(!open));
}
navOrb.addEventListener("click", e => {
  e.stopPropagation();
  setNav(!floatingNav.classList.contains("open"));
});
document.querySelectorAll("[data-go]").forEach(el => {
  el.addEventListener("click", () => {
    setNav(false);
    document.getElementById(el.dataset.go)?.scrollIntoView({behavior:"smooth", block:"start"});
  });
});
document.addEventListener("click", e => {
  if(floatingNav.classList.contains("open") && !floatingNav.contains(e.target) && !navOrb.contains(e.target)) setNav(false);
});
document.addEventListener("keydown", e => { if(e.key === "Escape") setNav(false); });

/* ---------- reading progress ---------- */
const progress = document.createElement("div");
progress.className = "reading-progress";
document.body.appendChild(progress);
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max ? scrollY / max : 0})`;
  if(floatingNav.classList.contains("open")) setNav(false);
}, {passive:true});

/* ---------- copy email ---------- */
$("copyEmail")?.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText("serenetechmind@gmail.com");
    showToast("Email address copied");
  }catch{
    showToast("Copy failed. The address is shown below the buttons.");
  }
});

/* ---------- Calibration content engine ---------- */
const calibrations = window.CALIBRATIONS || [];
const archive = $("calibrationArchive");
let currentIndex = 0;

function fillCard(item){
  $("featuredEntry").textContent = `Entry ${item.entry}`;
  $("featuredDate").textContent = item.date;
  $("featuredWord").textContent = item.word;
  $("featuredClass").textContent = item.className;
  const text = $("featuredText");
  text.replaceChildren();
  item.text.forEach((line, i) => {
    if(i) text.appendChild(document.createElement("br"));
    text.appendChild(document.createTextNode(line));
  });
  $("featuredNote").textContent = item.note || "";
}

function showCalibration(index, scroll){
  const item = calibrations[index];
  if(!item) return;
  currentIndex = index;
  fillCard(item);
  if(scroll) $("featuredCalibration").scrollIntoView({behavior:"smooth", block:"center"});
}

function renderCalibration(){
  if(!calibrations.length) return;
  $("calibrationCount").textContent = String(calibrations.length).padStart(2, "0");
  archive.replaceChildren();
  calibrations.forEach((item, index) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "archive-item";
    [["archive-no", item.entry], ["archive-word", item.word], ["archive-date", item.date], ["archive-arrow", "↗"]].forEach(([cls, val]) => {
      const s = document.createElement("span");
      s.className = cls;
      s.textContent = val;
      b.appendChild(s);
    });
    b.addEventListener("click", () => showCalibration(index, true));
    archive.appendChild(b);
  });

  // Deep link: #calibration-002 opens that entry
  const match = location.hash.match(/^#calibration-(\w+)$/);
  const found = match ? calibrations.findIndex(c => c.entry === match[1]) : -1;
  showCalibration(found >= 0 ? found : 0, false);
  if(found >= 0) setTimeout(() => $("calibration").scrollIntoView({behavior:"smooth", block:"start"}), 300);
}
renderCalibration();

$("shareCalibration")?.addEventListener("click", async () => {
  const entry = calibrations[currentIndex]?.entry;
  const url = `${location.origin}${location.pathname}#calibration-${entry}`;
  try{
    await navigator.clipboard.writeText(url);
    showToast("Link to this entry copied");
  }catch{
    location.hash = `calibration-${entry}`;
  }
});
