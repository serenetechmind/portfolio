const navOrb = document.getElementById("navOrb");
const floatingNav = document.getElementById("floatingNav");
const toast = document.getElementById("toast");

// Calibration content engine: newest entry is always featured.
const calibrations = window.CALIBRATIONS || [];
const featuredText = document.getElementById("featuredText");
const archive = document.getElementById("calibrationArchive");
const featured = calibrations[0];

function renderCalibration(){
  document.getElementById("calibrationCount").textContent = String(calibrations.length).padStart(2,"0");
  if(!featured){
    document.getElementById("featuredEntry").textContent = "NO ENTRIES";
    document.getElementById("featuredDate").textContent = "";
    document.getElementById("featuredWord").textContent = "CALIBRATION";
    document.getElementById("featuredClass").textContent = "";
    featuredText.textContent = "No calibration entries yet.";
    document.getElementById("featuredNote").textContent = "";
    archive.innerHTML = "";
    return;
  }
  document.getElementById("featuredEntry").textContent = `ENTRY ${featured.entry}`;
  document.getElementById("featuredDate").textContent = featured.date;
  document.getElementById("featuredWord").textContent = featured.word.toUpperCase();
  document.getElementById("featuredClass").textContent = featured.className;
  featuredText.innerHTML = featured.text.map(line => `${line}<br>`).join("");
  document.getElementById("featuredNote").textContent = featured.note || "";

  archive.innerHTML = calibrations.map((item, index) => `
    <button class="archive-item" data-entry-index="${index}">
      <span class="archive-no">${item.entry}</span>
      <span class="archive-word">${item.word}</span>
      <span class="archive-date">${item.date}</span>
      <span class="archive-arrow">↗</span>
    </button>`).join("");

  archive.querySelectorAll(".archive-item").forEach(button => {
    button.addEventListener("click", () => showCalibration(Number(button.dataset.entryIndex)));
  });
}

function showCalibration(index){
  const item = calibrations[index];
  if(!item) return;
  document.getElementById("featuredEntry").textContent = `ENTRY ${item.entry}`;
  document.getElementById("featuredDate").textContent = item.date;
  document.getElementById("featuredWord").textContent = item.word.toUpperCase();
  document.getElementById("featuredClass").textContent = item.className;
  featuredText.innerHTML = item.text.map(line => `${line}<br>`).join("");
  document.getElementById("featuredNote").textContent = item.note || "";
  document.getElementById("featuredCalibration").scrollIntoView({behavior:"smooth",block:"center"});
}

renderCalibration();

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
