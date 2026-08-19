(()=>{
  document.title='通元问科｜企业 AI 实践';

  const nav=document.querySelector('#nav .links');
  if(nav) nav.innerHTML='<a href="#top">首页</a><a href="#serviceStage">服务领域</a><a href="#blog">博客</a><a href="#contact">关于我们</a>';
  const navCta=document.querySelector('#nav .cta');
  if(navCta){navCta.textContent='商务咨询 →';navCta.setAttribute('href','/contact')}

  const eyebrow=document.querySelector('#heroCopy .eyebrow');
  const title=document.querySelector('#heroCopy h1');
  const desc=document.querySelector('#heroCopy .desc');
  const actions=document.querySelector('#heroCopy .actions');
  if(eyebrow) eyebrow.textContent='ENTERPRISE AI';
  if(title) title.textContent='企业 AI 实践';
  if(desc) desc.textContent='让 AI 进入真实工作，创造可衡量的业务价值。';
  if(actions) actions.innerHTML='<a class="btn primary" href="/contact">商务咨询 →</a><a class="btn" href="#serviceStage">查看服务领域 →</a>';

  const services=document.getElementById('services');
  if(services){
    services.innerHTML=`
      <div class="service-head-final">
        <div class="micro-label">SERVICES · 01</div>
        <h2>服务领域</h2>
      </div>
      <div class="service-grid-final">
        <a class="service-tile" href="/services#supply-chain">
          <span class="tile-arrow">→</span>
          <div class="tile-inner">
            <div class="service-icon" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><defs><linearGradient id="g1" x1="12" y1="8" x2="68" y2="72"><stop stop-color="#FDFEFF"/><stop offset=".45" stop-color="#AAC5FF"/><stop offset="1" stop-color="#5D8DF2"/></linearGradient></defs><path d="M40 8 66 22v36L40 72 14 58V22L40 8Z" fill="url(#g1)" fill-opacity=".78" stroke="#7EA3F7"/><path d="m14 22 26 15 26-15M40 37v35M27 15l26 15v28L27 43V15Z" stroke="#EAF1FF" stroke-opacity=".95"/></svg></div>
            <h3>物流与供应链</h3><p>行业知识库、合同审计、结算异常、网络货运。</p>
          </div>
        </a>
        <a class="service-tile" href="/services#education">
          <span class="tile-arrow">→</span>
          <div class="tile-inner">
            <div class="service-icon" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><defs><linearGradient id="g2" x1="15" y1="12" x2="65" y2="68"><stop stop-color="#FDFEFF"/><stop offset=".5" stop-color="#ADC7FF"/><stop offset="1" stop-color="#6E97EE"/></linearGradient></defs><path d="M11 18c12-5 22-3 29 4v44c-8-7-18-9-29-4V18Z" fill="url(#g2)" fill-opacity=".82" stroke="#86A8F7"/><path d="M69 18c-12-5-22-3-29 4v44c8-7 18-9 29-4V18Z" fill="url(#g2)" fill-opacity=".72" stroke="#86A8F7"/><path d="M40 22v44" stroke="#F4F7FF"/></svg></div>
            <h3>教育</h3><p>中小学 AI 数据管理系统、知识组织、数据治理。</p>
          </div>
        </a>
        <a class="service-tile" href="/services#institutions">
          <span class="tile-arrow">→</span>
          <div class="tile-inner">
            <div class="service-icon" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><defs><linearGradient id="g3" x1="18" y1="10" x2="62" y2="70"><stop stop-color="#FDFEFF"/><stop offset=".48" stop-color="#B7CEFF"/><stop offset="1" stop-color="#7198EE"/></linearGradient></defs><path d="M40 10 68 25H12L40 10Z" fill="url(#g3)" stroke="#8BAAF3"/><path d="M16 29h48M19 29v31m14-31v31m14-31v31m14-31v31M12 64h56" stroke="#769DEE" stroke-width="4" stroke-linecap="round"/><path d="M10 69h60" stroke="#DDE8FF" stroke-width="5" stroke-linecap="round"/></svg></div>
            <h3>研究机构与协会</h3><p>研究资料组织、知识检索、AI 办公支持。</p>
          </div>
        </a>
      </div>`;
  }

  const main=document.querySelector('.home-flow');
  if(main){
    main.innerHTML=`
      <section class="section-frame work-section" id="work"><div class="home-shell work-content reveal">
        <div class="section-heading"><div><div class="micro-label">HOW WE WORK · 02</div><h2>合作方式</h2></div></div>
        <div class="work-rail">
          <div class="work-step"><div class="step-orb"><svg viewBox="0 0 64 64" fill="none"><rect x="14" y="11" width="28" height="38" rx="5" fill="#EAF1FF" stroke="#6C95EE"/><path d="M21 20h14M21 27h10M21 34h12" stroke="#6C95EE" stroke-width="2"/><circle cx="43" cy="43" r="10" fill="#DCE8FF" stroke="#4D7CEB"/><path d="m50 50 7 7" stroke="#4D7CEB" stroke-width="3" stroke-linecap="round"/></svg></div><div><h3>识别场景</h3><p>明确业务，找准高价值场景。</p></div></div>
          <div class="work-connector"></div>
          <div class="work-step"><div class="step-orb"><svg viewBox="0 0 64 64" fill="none"><path d="M25 9h14M28 9v12L16 49c-2 4 1 7 5 7h22c4 0 7-3 5-7L36 21V9" stroke="#5B86EC" stroke-width="3"/><path d="M22 44h20l4 8H18l4-8Z" fill="#DCE8FF"/><circle cx="29" cy="35" r="3" fill="#5B86EC"/><circle cx="38" cy="39" r="2" fill="#8AAAF4"/></svg></div><div><h3>小范围验证</h3><p>快速验证，形成可复制方案。</p></div></div>
          <div class="work-connector"></div>
          <div class="work-step"><div class="step-orb"><svg viewBox="0 0 64 64" fill="none"><path d="M14 51h38" stroke="#5C86EC" stroke-width="3"/><path d="M18 47V35h8v12M29 47V27h8v20M40 47V19h8v28" fill="#DDE8FF" stroke="#6A92ED" stroke-width="2"/><path d="m19 27 10-8 8 3 12-11" stroke="#4D7CEB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M43 11h7v7" stroke="#4D7CEB" stroke-width="3" stroke-linecap="round"/></svg></div><div><h3>进入真实工作</h3><p>落地执行，持续带来业务价值。</p></div></div>
        </div>
      </div></section>
      <section class="section-frame blog-section" id="blog"><div class="home-shell blog-content reveal">
        <div class="section-heading"><div><div class="micro-label">BLOG · 03</div><h2>博客</h2></div><a class="section-heading-link" href="/blog">查看全部文章 →</a></div>
        <div class="blog-gallery">
          <a class="blog-card" href="/blog"><div class="blog-art art-1"></div><div class="blog-meta">2026.08 · 企业 AI</div><h3>AI 数据资产</h3><span class="blog-arrow">→</span></a>
          <a class="blog-card" href="/blog"><div class="blog-art art-2"></div><div class="blog-meta">2026.08 · 企业组织</div><h3>企业 AI 分工</h3><span class="blog-arrow">→</span></a>
          <a class="blog-card" href="/blog"><div class="blog-art art-3"></div><div class="blog-meta">2026.08 · 工作方式</div><h3>让 AI 进入真实工作</h3><span class="blog-arrow">→</span></a>
        </div>
      </div></section>
      <section class="contact-section" id="contact"><div class="home-shell reveal">
        <div class="contact-panel"><div class="contact-copy"><h2>通元问科</h2><p>专注企业 AI 实践，让 AI 进入真实工作，创造可衡量的业务价值。</p></div><div class="contact-action"><a class="contact-btn" href="/contact">开始交流 <span>→</span></a></div></div>
        <footer class="home-footer"><span>通元问科 · Tongyuan Wenke</span><span>Enterprise AI</span></footer>
      </div></section>`;
  }

  const items=[...document.querySelectorAll('.reveal')];
  if(!('IntersectionObserver' in window)){items.forEach(x=>x.classList.add('is-visible'));return;}
  const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}})},{threshold:.14,rootMargin:'0px 0px -5% 0px'});
  items.forEach(x=>io.observe(x));
})();
