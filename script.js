const pages=[...document.querySelectorAll(".page")],nav=document.querySelector("#nav");
function show(id){pages.forEach(p=>p.classList.toggle("active",p.id===id));nav.classList.remove("open");history.replaceState(null,"","#"+id);window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-page]").forEach(x=>x.addEventListener("click",()=>show(x.dataset.page)));
document.querySelector("#menu").addEventListener("click",()=>nav.classList.toggle("open"));
addEventListener("load",()=>{let id=location.hash.slice(1);if(id&&document.getElementById(id))show(id)});