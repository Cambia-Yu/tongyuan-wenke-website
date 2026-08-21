(()=>{
  const body=document.querySelector('.article-body');
  if(!body||body.closest('.article-reading-layout'))return;
  const headings=[...body.querySelectorAll('h2')];
  if(headings.length<2)return;

  const layout=document.createElement('div');
  layout.className='article-reading-layout';
  body.parentNode.insertBefore(layout,body);

  const aside=document.createElement('aside');
  aside.className='article-toc';
  aside.setAttribute('aria-label','文章目录');
  const label=document.createElement('div');
  label.className='article-toc-label';
  label.textContent='目录';
  const nav=document.createElement('nav');
  aside.append(label,nav);
  layout.append(aside,body);

  const links=[];
  headings.forEach((heading,index)=>{
    if(!heading.id)heading.id=`section-${String(index+1).padStart(2,'0')}`;
    const link=document.createElement('a');
    link.href=`#${heading.id}`;
    link.textContent=heading.textContent.trim();
    link.addEventListener('click',event=>{
      event.preventDefault();
      heading.scrollIntoView({behavior:'smooth',block:'start'});
      history.replaceState(null,'',`#${heading.id}`);
    });
    nav.appendChild(link);
    links.push(link);
  });

  const activate=heading=>{
    const index=headings.indexOf(heading);
    links.forEach((link,i)=>link.classList.toggle('is-active',i===index));
  };
  activate(headings[0]);

  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(visible[0])activate(visible[0].target);
    },{rootMargin:'-18% 0px -68% 0px',threshold:[0,1]});
    headings.forEach(heading=>observer.observe(heading));
  }else{
    addEventListener('scroll',()=>{
      let current=headings[0];
      for(const heading of headings){if(heading.getBoundingClientRect().top<=160)current=heading;else break}
      activate(current);
    },{passive:true});
  }
})();
