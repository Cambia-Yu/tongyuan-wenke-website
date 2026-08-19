(()=>{
  const iconCube=`<svg viewBox="0 0 72 72" fill="none" aria-hidden="true"><defs><linearGradient id="a7" x1="12" y1="8" x2="62" y2="64"><stop stop-color="#DCE8FF"/><stop offset=".52" stop-color="#7EA6FF"/><stop offset="1" stop-color="#3F70E8"/></linearGradient></defs><path d="M36 7 59 20v31L36 64 13 51V20L36 7Z" fill="url(#a7)" fill-opacity=".32" stroke="#6D96F2"/><path d="M36 7v57M13 20l23 13 23-13M13 51l23-18 23 18" stroke="#9DB9F8" stroke-width="1.2"/></svg>`;
  const iconBook=`<svg viewBox="0 0 72 72" fill="none" aria-hidden="true"><defs><linearGradient id="b7" x1="13" y1="12" x2="58" y2="60"><stop stop-color="#EAF1FF"/><stop offset=".55" stop-color="#8FB0FB"/><stop offset="1" stop-color="#4B77E8"/></linearGradient></defs><path d="M11 17c8-3 16-2 25 4v39c-8-6-17-7-25-4V17Zm50 0c-8-3-16-2-25 4v39c8-6 17-7 25-4V17Z" fill="url(#b7)" fill-opacity=".39" stroke="#6B94F0"/><path d="M36 21v39" stroke="#9CB8F6"/></svg>`;
  const iconHall=`<svg viewBox="0 0 72 72" fill="none" aria-hidden="true"><defs><linearGradient id="c7" x1="14" y1="12" x2="58" y2="58"><stop stop-color="#EAF1FF"/><stop offset=".5" stop-color="#94B3FB"/><stop offset="1" stop-color="#4E79E7"/></linearGradient></defs><path d="M10 25 36 9l26 16H10Z" fill="url(#c7)" fill-opacity=".43" stroke="#6E96F0"/><path d="M16 29h7v25h-7V29Zm16 0h8v25h-8V29Zm17 0h7v25h-7V29ZM10 58h52v5H10v-5Z" fill="url(#c7)" fill-opacity=".4" stroke="#7A9DF0"/></svg>`;
  const iconSearch=`<svg viewBox="0 0 56 56" fill="none" aria-hidden="true"><rect x="9" y="7" width="29" height="36" rx="4" fill="#DDE9FF" stroke="#5F8DF1"/><path d="M16 16h15M16 23h12M16 30h9" stroke="#5F8DF1" stroke-width="2" stroke-linecap="round"/><circle cx="38" cy="38" r="8" fill="#EEF4FF" stroke="#4C7CEB" stroke-width="2"/><path d="m44 44 6 6" stroke="#4C7CEB" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  const iconFlask=`<svg viewBox="0 0 56 56" fill="none" aria-hidden="true"><path d="M22 7h12M25 7v15L12 44c-2 4 1 7 5 7h22c4 0 7-3 5-7L31 22V7" stroke="#4E7DEC" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 39h20" stroke="#87A8F5" stroke-width="2"/><path d="M20 43c5-5 11 5 16-1 2-2 4-1 5 1l2 4H15l5-4Z" fill="#BFD2FF" fill-opacity=".7"/></svg>`;
  const iconChart=`<svg viewBox="0 0 56 56" fill="none" aria-hidden="true"><path d="M8 47h40" stroke="#6F94EC" stroke-width="2" stroke-linecap="round"/><rect x="12" y="31" width="7" height="12" rx="2" fill="#C9D9FF"/><rect x="25" y="24" width="7" height="19" rx="2" fill="#A8C0FF"/><rect x="38" y="15" width="7" height="28" rx="2" fill="#7FA4FA"/><path d="m12 25 10-8 8 4 14-12" stroke="#4C7CEB" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M39 9h5v5" stroke="#4C7CEB" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const brandMark=`<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3 27 9.2v13.6L16 29 5 22.8V9.2L16 3Z" fill="#DCE8FF" stroke="#5D88F2"/><path d="M16 3v26M5 9.2l11 6.2 11-6.2M5 22.8l11-7.4 11 7.4" stroke="#7EA1F5"/></svg>`;

  document.documentElement.dataset.homeVersion='v7';

  const originalNav=document.getElementById('nav');
  const navLinks=originalNav?.querySelector('.links');
  if(navLinks) navLinks.innerHTML='<a href="#top">首页</a><a href="#serviceStage">服务领域</a><a href="#work">合作方式</a><a href="#blog">博客</a><a href="#contact">关于我们</a>';
  const originalCta=originalNav?.querySelector('.cta');
  if(originalCta){originalCta.textContent='开始交流 →';originalCta.setAttribute('href','#contact')}

  const copy=document.getElementById('heroCopy');
  if(copy){copy.innerHTML='<div class="eyebrow">ENTERPRISE AI</div><h1>企业 AI 实践</h1><div class="desc">让 AI 进入真实工作，创造可衡量的业务价值。</div><div class="actions"><a class="btn primary" href="#contact">开始交流 →</a><a class="btn" href="#serviceStage">查看服务领域 →</a></div>'}

  const services=document.getElementById('services');
  if(services){services.innerHTML=`<div class="twk7-service-head"><div class="twk7-eyebrow">SERVICES · 01</div><h2>服务领域</h2><p>深入关键行业场景，以 AI 能力重构业务协同与创新，帮助组织构建可持续的智能化竞争力。</p></div><div class="twk7-service-grid">
    <a class="twk7-service-card" href="#"><span class="twk7-service-arrow">→</span><div class="twk7-service-inner"><div class="twk7-service-icon-shell"><div class="twk7-service-icon">${iconCube}</div></div><h3>物流与供应链</h3><p>行业知识库、结算异常、合同审计、网络货运，以及供应链业务流程中的 AI 协同。</p></div></a>
    <a class="twk7-service-card" href="#"><span class="twk7-service-arrow">→</span><div class="twk7-service-inner"><div class="twk7-service-icon-shell"><div class="twk7-service-icon">${iconBook}</div></div><h3>教育</h3><p>中小学 AI 数据管理、知识组织、数据治理，以及面向教学与管理场景的智能化能力。</p></div></a>
    <a class="twk7-service-card" href="#"><span class="twk7-service-arrow">→</span><div class="twk7-service-inner"><div class="twk7-service-icon-shell"><div class="twk7-service-icon">${iconHall}</div></div><h3>研究机构与协会</h3><p>研究资料组织、知识检索、AI 办公支持，以及面向研究与政策工作的知识能力建设。</p></div></a>
  </div>`}

  document.querySelector('.home-flow')?.remove();
  const track=document.getElementById('track');
  if(!track) return;

  const sticky=document.createElement('header');
  sticky.className='twk7-sticky-nav';
  sticky.setAttribute('aria-label','主导航');
  sticky.innerHTML=`<a class="twk7-brand" href="#top"><span class="twk7-brand-mark">${brandMark}</span><span>通元问科</span></a><nav class="twk7-nav-links"><a href="#top">首页</a><a href="#serviceStage">服务领域</a><a href="#work">合作方式</a><a href="#blog">博客</a><a href="#contact">关于我们</a></nav><a class="twk7-nav-cta" href="#contact">开始交流 →</a>`;
  document.body.appendChild(sticky);

  const main=document.createElement('main');
  main.className='twk7-main';
  main.innerHTML=`
    <section class="twk7-frame twk7-work-frame" id="work"><div class="twk7-shell twk7-work twk7-reveal"><div class="twk7-section-head"><div><div class="twk7-eyebrow">HOW WE WORK · 02</div><h2>合作方式</h2><p>从场景识别到价值落地，我们以小步快跑、快速验证的方式，确保方案可行、可复制、可持续。</p></div></div><div class="twk7-work-rail">
      <div class="twk7-step"><span class="twk7-step-no">01</span><div class="twk7-step-orb">${iconSearch}</div><div><h3>识别场景</h3><p>明确业务问题，找准高价值场景。</p></div></div><div class="twk7-work-connector"></div>
      <div class="twk7-step"><span class="twk7-step-no">02</span><div class="twk7-step-orb">${iconFlask}</div><div><h3>小范围验证</h3><p>快速验证，形成可复制方案。</p></div></div><div class="twk7-work-connector"></div>
      <div class="twk7-step"><span class="twk7-step-no">03</span><div class="twk7-step-orb">${iconChart}</div><div><h3>进入真实工作</h3><p>落地执行，持续带来业务价值。</p></div></div>
    </div></div></section>

    <section class="twk7-frame twk7-blog-frame" id="blog"><div class="twk7-shell twk7-reveal"><div class="twk7-section-head"><div><div class="twk7-eyebrow">BLOG · 03</div><h2>博客</h2><p>洞察 AI 前沿，分享行业实践与思考。</p></div><a class="twk7-section-link" href="#">查看全部文章 →</a></div><div class="twk7-gallery">
      <a class="twk7-blog-card" href="#"><div class="twk7-media-slot" data-asset="BLOG IMAGE · 01"></div><h3>AI 数据资产</h3><div class="twk7-blog-meta">企业 AI · 数据资产</div><div class="twk7-blog-excerpt">如何把分散的数据、知识与权限，组织成可被 AI 持续理解和使用的资产。</div></a>
      <a class="twk7-blog-card" href="#"><div class="twk7-media-slot" data-asset="BLOG IMAGE · 02"></div><h3>企业 AI 分工</h3><div class="twk7-blog-meta">企业 AI · 工作方式</div><div class="twk7-blog-excerpt">模型之外，企业正在形成新的工作分工，以及人与 AI 共同完成任务的新边界。</div></a>
      <a class="twk7-blog-card" href="#"><div class="twk7-media-slot" data-asset="BLOG IMAGE · 03"></div><h3>让 AI 进入真实工作</h3><div class="twk7-blog-meta">企业 AI · 项目实践</div><div class="twk7-blog-excerpt">从试点到落地，企业 AI 如何进入业务流程、持续创造可以被验证的价值。</div></a>
    </div></div></section>

    <section class="twk7-contact" id="contact"><div class="twk7-shell"><div class="twk7-contact-panel twk7-reveal"><div class="twk7-contact-media" data-asset="CONTACT IMAGE · WIDE"></div><div class="twk7-contact-overlay"></div><div class="twk7-contact-inner"><div class="twk7-contact-copy"><h2>通元问科</h2><p>专注企业 AI 实践，让 AI 进入真实工作，创造可衡量的业务价值。</p><div class="twk7-contact-points"><span class="twk7-contact-point"><i>01</i>场景驱动</span><span class="twk7-contact-point"><i>02</i>快速验证</span><span class="twk7-contact-point"><i>03</i>落地执行</span><span class="twk7-contact-point"><i>04</i>持续创造</span></div></div><div class="twk7-contact-action"><a class="twk7-contact-btn" href="#">开始交流 <span>→</span></a></div></div></div><footer class="twk7-footer"><span>通元问科 · Tongyuan Wenke</span><span>Enterprise AI</span></footer></div></section>`;
  track.after(main);

  const reveal=[...document.querySelectorAll('.twk7-reveal')];
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -4% 0px'});reveal.forEach(x=>io.observe(x));}else reveal.forEach(x=>x.classList.add('is-visible'));

  const stage=document.getElementById('serviceStage');
  const syncSticky=()=>{
    const ready=stage?.classList.contains('ready');
    sticky.classList.toggle('is-visible',!!ready);
    if(originalNav) originalNav.style.visibility=ready?'hidden':'visible';
  };
  if(stage){new MutationObserver(syncSticky).observe(stage,{attributes:true,attributeFilter:['class']});syncSticky()}
})();
