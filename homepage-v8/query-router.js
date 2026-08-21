(()=>{
  const q=new URLSearchParams(location.search);
  const domain=q.get('domain');
  const caseId=q.get('case');
  const page=q.get('page');
  const article=q.get('article');
  const path=
    domain==='supply-chain'?'domains/supply-chain/index.html':
    caseId==='supply-chain-research'?'cases/supply-chain-research/index.html':
    caseId==='settlement-exception'?'cases/settlement-exception/index.html':
    page==='blog'?'blog/index.html':
    article==='deepseek-harness'?'blog/deepseek-harness/index.html':null;
  if(!path) return;
  document.documentElement.style.visibility='hidden';
  fetch('https://raw.githubusercontent.com/Cambia-Yu/tongyuan-wenke-website/redesign/website-v1/'+path+'?v='+Date.now(),{cache:'no-store'})
    .then(r=>{if(!r.ok) throw new Error(String(r.status)); return r.text()})
    .then(html=>{document.open();document.write(html);document.close()})
    .catch(()=>{document.documentElement.style.visibility='visible'});
})();