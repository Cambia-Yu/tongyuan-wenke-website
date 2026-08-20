(()=>{
  const base=document.createElement('script');
  base.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@9296a3dc5a40de33639edcca74628ea907d3a78d/homepage-v7/home.js';
  base.onload=()=>{
    document.documentElement.dataset.homeVersion='v8.8';

    const heroNav=document.getElementById('nav');
    const oldSticky=document.querySelector('.twk7-sticky-nav');
    if(oldSticky) oldSticky.remove();

    if(heroNav){
      heroNav.classList.add('twk8-unified-nav');
      document.body.appendChild(heroNav);
      const links=heroNav.querySelector('.links');
      if(links){links.innerHTML='<a href="#top">首页</a><span class="twk8-service-wrap"><a href="#serviceStage" class="twk8-service-trigger" data-direct-services>服务领域 <i>⌄</i></a><span class="twk8-service-menu"><a href="/?domain=supply-chain"><span>物流与供应链</span><b>→</b></a><span class="twk8-service-disabled"><span>教育</span><b>→</b></span></span></span><a href="/?page=blog">博客</a><a href="#contact">关于我们</a>'}
      const cta=heroNav.querySelector('.cta');
      if(cta){cta.textContent='开始交流 →';cta.setAttribute('href','#contact')}
      const serviceLink=heroNav.querySelector('[data-direct-services]');
      if(serviceLink){serviceLink.addEventListener('click',e=>{e.preventDefault();if(window.twkHero?.jumpToServices){window.twkHero.jumpToServices()}else{const track=document.getElementById('track');if(track)scrollTo({top:track.offsetTop+track.offsetHeight-innerHeight,behavior:'auto'})}})}
    }

    const serviceCards=[...document.querySelectorAll('.twk7-service-card')];
    if(serviceCards[0]) serviceCards[0].setAttribute('href','/?domain=supply-chain');

    const blog=document.getElementById('blog');
    if(blog){
      const head=blog.querySelector('.twk7-section-head');
      const sectionLink=head?.querySelector('.twk7-section-link');
      if(sectionLink){sectionLink.textContent='查看全部文章 →';sectionLink.setAttribute('href','/?page=blog')}
      const headCopy=head?.querySelector('div');
      if(headCopy){
        const eyebrow=headCopy.querySelector('.twk7-eyebrow');
        const title=headCopy.querySelector('h2');
        const desc=headCopy.querySelector('p');
        if(eyebrow) eyebrow.textContent='BLOG · 03';
        if(title) title.textContent='博客';
        if(desc) desc.textContent='关于企业、AI 与真实工作的长期观察。';
      }
      const gallery=blog.querySelector('.twk7-gallery');
      if(gallery){
        gallery.classList.add('twk8-real-blog-grid');
        gallery.innerHTML=`
          <a class="twk7-blog-card twk8-blog-card-featured" href="/?article=deepseek-harness">
            <div class="twk8-blog-media-slot" aria-label="文章封面图位置"></div>
            <h3>从 DeepSeek Harness 看企业 AI 转型的下一阶段</h3>
            <div class="twk7-blog-meta">Cambia · 2026.08.18</div>
            <div class="twk7-blog-excerpt">模型仍然重要，但企业下一阶段拉开差距的地方，会越来越多地落在模型怎样进入真实工作。</div>
          </a>
          <div class="twk7-blog-card twk8-blog-card-upcoming">
            <h3>AI 正在重新定义企业的能力边界</h3>
            <div class="twk7-blog-meta">Cambia · 正在整理</div>
            <div class="twk7-blog-excerpt">从一瓶香开始，重新理解企业的能力边界。</div>
          </div>`;
      }
    }

    const navigateFromQuery=()=>{
      const section=new URLSearchParams(location.search).get('section');
      if(!section) return;
      if(section==='services'){requestAnimationFrame(()=>window.twkHero?.jumpToServices?.());return}
      const target={about:'#contact',contact:'#contact'}[section];
      if(target){requestAnimationFrame(()=>document.querySelector(target)?.scrollIntoView({block:'start',behavior:'auto'}))}
    };

    const scenarios=document.createElement('script');
    scenarios.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@4a26242c27f6257fbb8d8c8c764d708badd21ca2/homepage-v8/scenarios.js';
    scenarios.onload=()=>{
      window.dispatchEvent(new CustomEvent('twk:v8-base-ready'));
      document.querySelector('.twk8-scenarios > .eyebrow')?.remove();
      const intro=document.querySelector('.twk8-scenarios > .intro');
      if(intro){intro.innerHTML='<span class="twk8-intro-line">同一个业务问题，从进入材料，到形成中间判断，再到得到最终结果。</span><br><span class="twk8-intro-line">模块会自动讲完整个过程，用户也可以切换不同场景查看。</span>'}
      navigateFromQuery();
    };
    scenarios.onerror=()=>console.error('business scenarios module load failed');
    document.head.appendChild(scenarios);
  };
  base.onerror=()=>console.error('homepage v7 base load failed');
  document.head.appendChild(base);
})();