(()=>{
  const base=document.createElement('script');
  base.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@9296a3dc5a40de33639edcca74628ea907d3a78d/homepage-v7/home.js';
  base.onload=()=>{
    document.documentElement.dataset.homeVersion='v8.2';

    /* v8.2: there is only one navigation element for the whole homepage.
       Reuse the Hero navigation itself, move it to body, and discard V7's second fixed nav. */
    const heroNav=document.getElementById('nav');
    const oldSticky=document.querySelector('.twk7-sticky-nav');
    if(oldSticky) oldSticky.remove();

    if(heroNav){
      heroNav.classList.add('twk8-unified-nav');
      document.body.appendChild(heroNav);

      const links=heroNav.querySelector('.links');
      if(links){
        links.innerHTML='<a href="#top">首页</a><a href="#serviceStage" data-direct-services>服务领域</a><a href="#work">业务场景</a><a href="#blog">博客</a><a href="#contact">关于我们</a>';
      }
      const cta=heroNav.querySelector('.cta');
      if(cta){cta.textContent='开始交流 →';cta.setAttribute('href','#contact')}

      const serviceLink=heroNav.querySelector('[data-direct-services]');
      if(serviceLink){
        serviceLink.addEventListener('click',e=>{
          e.preventDefault();
          if(window.twkHero?.jumpToServices){
            window.twkHero.jumpToServices();
          }else{
            const track=document.getElementById('track');
            if(track) scrollTo({top:track.offsetTop+track.offsetHeight-innerHeight,behavior:'auto'});
          }
        });
      }
    }

    /* The business-scenarios module remains the permanent replacement for the old
       cooperation section. Load it before emitting ready so it cannot miss the event. */
    const scenarios=document.createElement('script');
    scenarios.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@4a26242c27f6257fbb8d8c8c764d708badd21ca2/homepage-v8/scenarios.js';
    scenarios.onload=()=>window.dispatchEvent(new CustomEvent('twk:v8-base-ready'));
    scenarios.onerror=()=>console.error('business scenarios module load failed');
    document.head.appendChild(scenarios);
  };
  base.onerror=()=>console.error('homepage v7 base load failed');
  document.head.appendChild(base);
})();
