(()=>{
  const base=document.createElement('script');
  base.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@9296a3dc5a40de33639edcca74628ea907d3a78d/homepage-v7/home.js';
  base.onload=()=>{
    document.documentElement.dataset.homeVersion='v8.1';
    document.querySelectorAll('a[href="#work"]').forEach(a=>a.textContent='业务场景');

    /* v8.1: one visual navigation handoff only.
       The frozen Hero nav fades out as before, but it is prevented from reappearing
       during the white/service reveal. The fixed nav fades in near reveal completion. */
    const stage=document.getElementById('serviceStage');
    const heroNav=document.getElementById('nav');
    const sticky=document.querySelector('.twk7-sticky-nav');
    if(stage&&heroNav&&sticky){
      heroNav.classList.add('twk8-hero-nav');
      sticky.classList.add('twk8-sticky-nav');
      let navRaf=0;
      const clamp=v=>Math.max(0,Math.min(1,v));
      const syncNavHandoff=()=>{
        navRaf=0;
        const sv=clamp(parseFloat(stage.style.opacity||'0')||0);
        const handoffStarted=sv>.015;
        heroNav.classList.toggle('twk8-handoff-hidden',handoffStarted);

        const fixedOpacity=clamp((sv-.78)/.20);
        sticky.style.setProperty('--twk8-nav-opacity',fixedOpacity.toFixed(3));
        sticky.classList.toggle('twk8-nav-interactive',sv>.98);
      };
      const scheduleNavHandoff=()=>{
        if(!navRaf) navRaf=requestAnimationFrame(syncNavHandoff);
      };
      new MutationObserver(scheduleNavHandoff).observe(stage,{attributes:true,attributeFilter:['style','class']});
      addEventListener('scroll',scheduleNavHandoff,{passive:true});
      scheduleNavHandoff();
    }

    /* Load the business-scenarios replacement first. Its current script listens for
       twk:v8-base-ready when the version is v8.1, so the event must be emitted only
       after the script has executed and installed its listener. */
    const scenarios=document.createElement('script');
    scenarios.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@4a26242c27f6257fbb8d8c8c764d708badd21ca2/homepage-v8/scenarios.js';
    scenarios.onload=()=>window.dispatchEvent(new CustomEvent('twk:v8-base-ready'));
    scenarios.onerror=()=>console.error('business scenarios module load failed');
    document.head.appendChild(scenarios);
  };
  base.onerror=()=>console.error('homepage v7 base load failed');
  document.head.appendChild(base);
})();
