const navOrb = document.getElementById("navOrb");
const floatingNav = document.getElementById("floatingNav");
const toast = document.getElementById("toast");

// Calibration preview: newest entry leads the homepage composition.
const calibrations = window.CALIBRATIONS || [];
const calibrationPreview = document.getElementById("calibrationPreview");
const calibrationCount = document.getElementById("calibrationCount");

function setPreviewCard(card, item, index){
  if(!card) return;
  card.hidden = !item;
  if(!item) return;
  card.href = `calibration.html#${encodeURIComponent(item.entry)}`;
  card.setAttribute("aria-label", `Read Calibration entry ${item.entry}: ${item.word}`);
  card.querySelector(".preview-entry").textContent = index === 0 ? `LATEST / ${item.entry}` : `ENTRY ${item.entry}`;
  card.querySelector(".preview-date").textContent = item.date;
  card.querySelector(".preview-word strong").textContent = item.word.toUpperCase();
  card.querySelector(".preview-word small").textContent = item.className;
  card.querySelector(".preview-excerpt").textContent = item.text.slice(0, 2).join(" ");
}

function renderCalibrationPreview(){
  if(!calibrationPreview || !calibrationCount) return;
  calibrationCount.textContent = String(calibrations.length).padStart(2, "0");
  const front = calibrationPreview.querySelector(".calibration-front");
  const rearCards = calibrationPreview.querySelectorAll(".calibration-rear");
  if(!calibrations.length){
    front.hidden = false;
    front.removeAttribute("href");
    front.setAttribute("aria-label", "Calibration archive is empty");
    front.querySelector(".preview-entry").textContent = "ARCHIVE / EMPTY";
    front.querySelector(".preview-date").textContent = "—";
    front.querySelector(".preview-word strong").textContent = "CALIBRATION";
    front.querySelector(".preview-word small").textContent = "—";
    front.querySelector(".preview-excerpt").textContent = "No entries have been published yet.";
    front.querySelector(".preview-action").textContent = "ARCHIVE OPENING SOON";
    rearCards.forEach(card => { card.hidden = true; });
    return;
  }
  setPreviewCard(front, calibrations[0], 0);
  rearCards.forEach((card, offset) => setPreviewCard(card, calibrations[offset + 1], offset + 1));
}

renderCalibrationPreview();

function closeNav(){
  navOrb.classList.remove("active");
  navOrb.setAttribute("aria-expanded","false");
  floatingNav.classList.remove("open");
  floatingNav.setAttribute("aria-hidden","true");
}
function openNav(){
  navOrb.classList.add("active");
  navOrb.setAttribute("aria-expanded","true");
  floatingNav.classList.add("open");
  floatingNav.setAttribute("aria-hidden","false");
}
navOrb.addEventListener("click", e => {
  e.stopPropagation();
  floatingNav.classList.contains("open") ? closeNav() : openNav();
});

document.querySelectorAll("[data-go]").forEach(el => {
  el.addEventListener("click", () => {
    const id = el.dataset.go;
    closeNav();
    document.getElementById(id)?.scrollIntoView({behavior:"smooth", block:"start"});
  });
});

document.addEventListener("click", e => {
  if(floatingNav.classList.contains("open") && !floatingNav.contains(e.target) && e.target !== navOrb) closeNav();
});

let scrollClose;
window.addEventListener("scroll", () => {
  if(floatingNav.classList.contains("open")){
    clearTimeout(scrollClose);
    scrollClose = setTimeout(closeNav, 50);
  }
}, {passive:true});

let toastTimer;
document.querySelectorAll("[data-toast]").forEach(el => {
  el.addEventListener("click", () => {
    toast.textContent = el.dataset.toast;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  });
});

// Subtle cursor/press response for the application feel.
document.querySelectorAll(".route,.world-card,.lab-frame").forEach(card => {
  card.addEventListener("pointermove", e => {
    if(window.matchMedia("(hover:hover)").matches){
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      card.style.transform = `perspective(900px) rotateX(${(-y*1.1).toFixed(2)}deg) rotateY(${(x*1.1).toFixed(2)}deg)`;
    }
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});

// Reveal sections lightly as they enter the viewport.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("entered");
  });
},{threshold:.12});
document.querySelectorAll(".section").forEach(s => observer.observe(s));


const shareCalibration = document.getElementById("shareCalibration");
shareCalibration?.addEventListener("click", async () => {
  const url = `${location.origin}${location.pathname}#calibration`;
  try {
    await navigator.clipboard.writeText(url);
    shareCalibration.textContent = "LINK COPIED ✓";
    setTimeout(() => shareCalibration.textContent = "COPY ENTRY LINK ↗", 1800);
  } catch {
    window.location.hash = "calibration";
  }
});

// Small reading-progress signal for the application feel.
const progress = document.createElement("div");
progress.className = "reading-progress";
document.body.appendChild(progress);
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max ? scrollY / max : 0})`;
}, {passive:true});
