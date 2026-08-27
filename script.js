const navOrb = document.getElementById("navOrb");
const floatingNav = document.getElementById("floatingNav");
const toast = document.getElementById("toast");

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
