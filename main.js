const openButtons=document.querySelectorAll("[data-open]");const modals=document.querySelectorAll(".modal");function show(id){document.getElementById(id).classList.add("show");document.body.style.overflow="hidden"}function hide(m){m.classList.remove("show");document.body.style.overflow=""}
openButtons.forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.open).scrollIntoView({behavior:"smooth"})));
document.querySelectorAll("[data-modal]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.modal)));
document.querySelectorAll(".close").forEach(b=>b.addEventListener("click",()=>hide(b.closest(".modal"))));
modals.forEach(m=>m.addEventListener("click",e=>{if(e.target===m)hide(m)}));
