(()=>{
  const base=document.createElement('script');
  base.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@9296a3dc5a40de33639edcca74628ea907d3a78d/homepage-v7/home.js';
  base.onload=()=>{
    document.documentElement.dataset.homeVersion='v8.4';

    /* One navigation element for the whole homepage.
       Hero uses the transparent phase; the post-Hero page uses the white-bar phase. */
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

    /* The business-scenarios module permanently replaces the old cooperation section. */
    const scenarios=document.createElement('script');
    scenarios.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@4a26242c27f6257fbb8d8c8c764d708badd21ca2/homepage-v8/scenarios.js';
    scenarios.onload=()=>{
      window.dispatchEvent(new CustomEvent('twk:v8-base-ready'));

      /* Homepage heading polish requested after visual review:
         remove the English section counter and force the explanatory copy into two intentional lines. */
      document.querySelector('.twk8-scenarios > .eyebrow')?.remove();
      const intro=document.querySelector('.twk8-scenarios > .intro');
      if(intro){
        intro.innerHTML='<span class="twk8-intro-line">同一个业务问题，从进入材料，到形成中间判断，再到得到最终结果。</span><br><span class="twk8-intro-line">模块会自动讲完整个过程，用户也可以切换不同场景查看。</span>';
      }
    };
    scenarios.onerror=()=>console.error('business scenarios module load failed');
    document.head.appendChild(scenarios);
  };
  base.onerror=()=>console.error('homepage v7 base load failed');
  document.head.appendChild(base);
})();
