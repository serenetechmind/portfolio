const sections=[...document.querySelectorAll('main .screen,main .section')],menu=document.querySelector('#menu'),btn=document.querySelector('#menuBtn');
function go(id){const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});menu.classList.remove('open')}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
btn.addEventListener('click',()=>menu.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('seen')}),{threshold:.15});
sections.forEach(s=>io.observe(s));
