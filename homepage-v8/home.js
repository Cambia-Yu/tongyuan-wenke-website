(()=>{
  const base=document.createElement('script');
  base.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@9296a3dc5a40de33639edcca74628ea907d3a78d/homepage-v7/home.js';
  base.onload=()=>{
    document.documentElement.dataset.homeVersion='v8';
    document.querySelectorAll('a[href="#work"]').forEach(a=>a.textContent='业务场景');
    window.dispatchEvent(new CustomEvent('twk:v8-base-ready'));
    const scenarios=document.createElement('script');
    scenarios.src='https://cdn.jsdelivr.net/gh/Cambia-Yu/tongyuan-wenke-website@4a26242c27f6257fbb8d8c8c764d708badd21ca2/homepage-v8/scenarios.js';
    scenarios.onerror=()=>console.error('business scenarios module load failed');
    document.head.appendChild(scenarios);
  };
  base.onerror=()=>console.error('homepage v7 base load failed');
  document.head.appendChild(base);
})();
