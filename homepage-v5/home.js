(()=>{
  const items=[...document.querySelectorAll('.reveal')];
  if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('is-visible'));return;}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}})
  },{threshold:.14,rootMargin:'0px 0px -5% 0px'});
  items.forEach(x=>io.observe(x));
})();
