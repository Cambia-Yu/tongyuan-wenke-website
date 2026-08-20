(()=>{
  const start=()=>{
    const work=document.getElementById('work');
    if(!work) return;
    const fileIcon=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 3.5h7l3.5 3.5v12A1.5 1.5 0 0 1 16 20.5H7.5A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7.5 3.5Z"/><path d="M14 3.5V8h3.5M9 12h6M9 15.5h5"/></svg>`;
    const data={
      retrieval:{label:'知识检索',context:'研究知识 · 从历史资料中找到可引用依据',ghost1:'检索请求',ghost2:'命中结果',more:'查看研究方案 →',stages:[
        {t:'提出问题',d:'明确研究问题，并把它放进一组待检索资料。',view:'retrieval-left',query:'产业集群建设有哪些历史依据？',sources:[['产业发展规划（2022）','规划文件 · 地方产业'],['供应链发展研究报告','研究报告 · 行业研究'],['物流枢纽建设政策汇编','政策汇编 · 交通运输']]},
        {t:'命中结果',d:'按相关度呈现结果，不再抽象显示“处理中”。',view:'retrieval-center',results:[['区域产业发展规划（2020）','支持建设产业集群，推动上下游协同发展，提升区域产业链整体竞争力。','相关度 92%','P.42'],['产业集群培育实施方案','围绕本地制造业基础形成协同化、规模化的产业布局。','相关度 89%','P.17'],['现代物流体系建设指南','以物流枢纽带动产业链协作，增强区域资源配置效率。','相关度 86%','P.08']]},
        {t:'引用答案',d:'把研究结论和来源页码一起交付给研究者。',view:'retrieval-right',answer:'支持建设产业集群，推动上下游协同发展，提升区域产业链整体竞争力。',source:'《区域产业发展规划（2020）》 · 第 42 页 · 第三章 产业布局',chip:'可追溯引用'}
      ]},
      settlement:{label:'结算异常',context:'供应链结算 · 把分散材料归成可判断的异常上下文',ghost1:'异常记录',ghost2:'判断上下文',more:'查看异常方案 →',stages:[
        {t:'发现异常',d:'从一笔真实交易进入，而不是从资料堆里开始。',view:'settlement-left',order:'SO-2026-0817',diff:'¥38,600',metrics:[['系统金额','¥682,600',''],['供应商报送','¥721,200','danger'],['订单日期','2026-08-17',''],['处理状态','待核对','danger']]},
        {t:'对齐依据',d:'在同一个工作区里把关键字段拉齐，而不是泛泛地“组织材料”。',view:'settlement-center',board:[['合同版本','V2','V3'],['计价口径','未含税','含税'],['系统记录','¥682,600','—'],['供应商报送','—','¥721,200']],note:'关键不一致项已经被自动标出，业务人员不必重新从所有材料中逐项翻找。'},
        {t:'处理结论',d:'输出的是可执行的结论单，而不是一段泛泛说明。',view:'settlement-right',diff:'¥38,600',reason:'合同版本 / 含税口径',status:'需要人工确认',refs:['合同版本：V3','计价口径：含税','历史处理路径：2 条类似案例']}
      ]},
      education:{label:'教育数据',context:'教育数据 · 从多源数据进入，最后得到可治理的问题任务',ghost1:'数据对象',ghost2:'问题结果',more:'查看教育场景 →',stages:[
        {t:'进入数据',d:'先让用户看到这是结构化数据，而不是文档检索。',view:'education-left',assets:[['学生数据','学籍 / 基础信息','18,420 条'],['课程数据','课程安排 / 教学计划','1,284 条'],['教学记录','成绩 / 作业 / 考勤','86,731 条'],['校务台账','行政统计 / 业务台账','3,240 条']]},
        {t:'质量扫描',d:'中间阶段直接表现质量检查，而不是继续套用检索/匹配结构。',view:'education-center',scans:[['字段完整性','96% 完整',96,'发现 12 处缺失字段'],['口径一致性','88% 一致',88,'发现 4 处口径不一致'],['重复记录','27 条待处理',74,'检测到 27 条重复记录']]},
        {t:'治理任务',d:'结果不是答案文本，而是进入治理流程的任务清单。',view:'education-right',tasks:[['补齐缺失字段','学生基础档案中存在缺失项','可自动修复','auto'],['统一年级口径','多系统年级字段定义不一致','需人工确认','manual'],['合并重复记录','存在重复学生与课程记录','可进入治理','ready']]}
      ]}
    };

    work.className='twk7-frame twk8-scenario-frame';
    work.innerHTML=`<div class="twk7-shell twk8-scenarios">
      <div class="eyebrow">SCENARIOS · 03</div><h2 class="title">业务场景</h2><p class="intro">同一个业务问题，从进入材料，到形成中间判断，再到得到最终结果。模块会自动讲完整个过程，用户也可以切换不同场景查看。</p>
      <nav class="tabs" id="twk8Tabs" aria-label="业务场景"></nav>
      <section class="surface phase-1" id="twk8Surface"><span class="handoff one"></span><span class="handoff two"></span><span class="transfer-ghost one" id="twk8Ghost1">检索请求</span><span class="transfer-ghost two" id="twk8Ghost2">命中结果</span>
        <div class="grid">
          <article class="stage current" id="twk8S1"><div class="stage-head"><span class="stage-no">01</span><h2 id="twk8T1"></h2></div><p class="stage-sub" id="twk8D1"></p><div class="stage-body" id="twk8B1"></div><div class="progress"><i id="twk8P1"></i></div></article>
          <article class="stage pending" id="twk8S2"><div class="stage-head"><span class="stage-no">02</span><h2 id="twk8T2"></h2></div><p class="stage-sub" id="twk8D2"></p><div class="stage-body" id="twk8B2"></div><div class="progress"><i id="twk8P2"></i></div></article>
          <article class="stage pending" id="twk8S3"><div class="stage-head"><span class="stage-no">03</span><h2 id="twk8T3"></h2></div><p class="stage-sub" id="twk8D3"></p><div class="stage-body" id="twk8B3"></div><div class="progress"><i id="twk8P3"></i></div></article>
        </div>
        <div class="surface-footer"><div class="context" id="twk8Context"></div><div class="footer-actions"><button class="replay" id="twk8Replay" aria-label="重新播放"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/></svg></button><a class="more" href="#">查看完整场景 →</a></div></div>
      </section></div>`;

    const root=work.querySelector('.twk8-scenarios');
    const els={tabs:root.querySelector('#twk8Tabs'),surface:root.querySelector('#twk8Surface'),stages:[1,2,3].map(i=>root.querySelector('#twk8S'+i)),titles:[1,2,3].map(i=>root.querySelector('#twk8T'+i)),descs:[1,2,3].map(i=>root.querySelector('#twk8D'+i)),bodies:[1,2,3].map(i=>root.querySelector('#twk8B'+i)),bars:[1,2,3].map(i=>root.querySelector('#twk8P'+i)),context:root.querySelector('#twk8Context'),ghost1:root.querySelector('#twk8Ghost1'),ghost2:root.querySelector('#twk8Ghost2'),more:root.querySelector('.more')};
    let active='retrieval',runToken=0,started=false;

    function body(stage){
      switch(stage.view){
        case 'retrieval-left':return `<div class="query-box">${stage.query}</div><div class="group-label">参考资料</div><div class="sources">${stage.sources.map(([a,b])=>`<div class="source"><span class="source-icon">${fileIcon}</span><div><strong>${a}</strong><span>${b}</span></div></div>`).join('')}</div>`;
        case 'retrieval-center':return `<div class="search-top"><span class="badge">已找到 ${stage.results.length} 条命中结果</span><span class="small">按相关度排序</span></div><div class="results">${stage.results.map(([title,snippet,score,page],idx)=>`<div class="result-item ${idx===0?'featured':''}"><strong>${title}</strong><div class="result-snippet">${snippet}</div><div class="result-meta"><span>${score}</span><span>${page}</span></div></div>`).join('')}</div>`;
        case 'retrieval-right':return `<div class="reader-card"><div class="reader-kicker">研究答案</div><p class="reader-answer">${stage.answer}</p><div class="reader-ref"><b>引用来源</b><br>${stage.source}</div><a class="result-link" href="#">查看原文 →</a><div class="badge" style="margin-top:14px">${stage.chip}</div></div>`;
        case 'settlement-left':return `<div class="exception-card"><div class="exception-title"><strong>异常记录 · ${stage.order}</strong><span class="pill-alert">差异 ${stage.diff}</span></div><div class="metric-grid">${stage.metrics.map(([label,val,cls])=>`<div class="metric"><div class="metric-label">${label}</div><div class="metric-value ${cls||''}">${val}</div></div>`).join('')}</div></div>`;
        case 'settlement-center':return `<div class="board"><div class="board-head"><div>判断项</div><div>系统记录</div><div>合同 / 外部依据</div></div>${stage.board.map(([item,a,b])=>`<div class="board-row"><div class="${item==='计价口径'||item==='合同版本'?'focus':''}">${item}</div><div class="${item==='计价口径'||item==='合同版本'?'warn':''}">${a}</div><div class="${item==='计价口径'||item==='合同版本'?'warn':''}">${b}</div></div>`).join('')}</div><div class="group-label">工作区说明</div><div class="note-box">${stage.note}</div>`;
        case 'settlement-right':return `<div class="decision-sheet"><div class="decision-top"><strong>差异 ${stage.diff}</strong><span class="decision-status">${stage.status}</span></div><div class="decision-items"><div class="decision-item"><span>原因候选</span><b>${stage.reason}</b></div>${stage.refs.map(ref=>`<div class="decision-item"><span>依据</span><b>${ref}</b></div>`).join('')}</div></div>`;
        case 'education-left':return `<div class="dataset-grid">${stage.assets.map(([title,sub,count])=>`<div class="dataset-card"><div class="dataset-meta"><strong>${title}</strong><span>${sub}</span></div><div class="dataset-count">${count}</div></div>`).join('')}</div>`;
        case 'education-center':return `<div class="scan-panel">${stage.scans.map(([title,score,val,foot])=>`<div class="scan-metric"><div class="scan-top"><strong>${title}</strong><span>${score}</span></div><div class="scan-bar"><i style="width:${val}%"></i></div><div class="scan-foot">${foot}</div></div>`).join('')}</div>`;
        case 'education-right':return `<div class="task-panel">${stage.tasks.map(([title,sub,state,kind],idx)=>`<div class="task-card"><div class="task-index">0${idx+1}</div><div><div class="task-title">${title}</div><div class="task-sub">${sub}</div></div><div class="task-state ${kind}">${state}</div></div>`).join('')}</div>`;
      }
      return '';
    }
    function reset(){runToken++;els.surface.className='surface phase-1';els.stages.forEach((s,i)=>s.className='stage '+(i===0?'current':'pending'));els.bars.forEach(b=>b.style.width='0%')}
    function render(){els.tabs.innerHTML=Object.entries(data).map(([k,v])=>`<button class="tab ${k===active?'active':''}" data-k="${k}">${v.label}</button>`).join('');els.tabs.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{active=btn.dataset.k;render();play()});const d=data[active];els.context.textContent=d.context;els.ghost1.textContent=d.ghost1;els.ghost2.textContent=d.ghost2;els.more.textContent=d.more;d.stages.forEach((st,i)=>{els.titles[i].textContent=st.t;els.descs[i].textContent=st.d;els.bodies[i].innerHTML=body(st)});reset()}
    function animateBar(bar,ms,token){return new Promise(resolve=>{const t=performance.now();function f(now){if(token!==runToken)return resolve(false);const p=Math.min(1,(now-t)/ms);bar.style.width=`${p*100}%`;if(p<1)requestAnimationFrame(f);else resolve(true)}requestAnimationFrame(f)})}
    async function play(){const token=++runToken;els.bars.forEach(b=>b.style.width='0%');els.surface.className='surface phase-1';els.stages[0].className='stage current';els.stages[1].className='stage pending';els.stages[2].className='stage pending';if(!await animateBar(els.bars[0],2400,token))return;els.surface.classList.add('pass-1');await new Promise(r=>setTimeout(r,430));if(token!==runToken)return;els.surface.classList.remove('pass-1');els.surface.classList.remove('phase-1');els.surface.classList.add('phase-2');els.stages[0].className='stage done';els.stages[1].className='stage current';if(!await animateBar(els.bars[1],2900,token))return;els.surface.classList.add('pass-2');await new Promise(r=>setTimeout(r,430));if(token!==runToken)return;els.surface.classList.remove('pass-2');els.surface.classList.remove('phase-2');els.surface.classList.add('phase-3');els.stages[1].className='stage done';els.stages[2].className='stage current';await animateBar(els.bars[2],2600,token);started=true}
    root.querySelector('#twk8Replay').onclick=play;
    render();
    if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!started)play()}),{threshold:.42});io.observe(els.surface)}else play();
  };
  if(document.documentElement.dataset.homeVersion==='v8') start(); else window.addEventListener('twk:v8-base-ready',start,{once:true});
})();
