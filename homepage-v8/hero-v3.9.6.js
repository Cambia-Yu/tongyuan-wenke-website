(()=>{
  window.__twkStopHeroPreboot?.();

  const track=document.getElementById('track');
  const video=document.getElementById('video');
  const copy=document.getElementById('heroCopy');
  const wash=document.getElementById('wash');
  const shade=document.getElementById('shade');
  const nav=document.getElementById('nav');
  const hint=document.getElementById('hint');
  const stage=document.getElementById('serviceStage');
  const services=document.getElementById('services');
  if(!track||!video||!copy||!wash||!shade||!nav||!hint||!stage||!services) return;

  video.removeAttribute('poster');
  video.muted=true;
  video.playsInline=true;
  video.preload='auto';
  video.pause();

  const DURATION=5.041667;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const smooth=t=>t*t*(3-2*t);
  const map=(p,a,b)=>smooth(clamp((p-a)/(b-a)));
  const mix=(a,b,t)=>a+(b-a)*t;

  const RESET_P=.90;
  const SLOW_HANDOFF_MS=1050;
  const FAST_HANDOFF_MS=820;
  const SEEK_EPS=.012;
  const PRESENT_EPS=.045;
  const SEEK_WATCHDOG_MS=420;

  let handoff=0, handoffRunning=false, handoffDone=false;
  let raf=0, handoffRaf=0;
  let velocityEMA=0, lastInputAt=0;
  let touchY=null, touchT=0;
  let postRevealGuard=false, postRevealPrevMag=0, postRevealRiseCount=0;

  // Scroll scrubbing state. The key rule is: never flood the decoder with
  // overlapping seeks. Scroll may update desiredVideoTime at 100+ Hz, but the
  // media element receives one seek at a time and then catches up to the newest
  // requested position when that seek has actually settled.
  let desiredVideoTime=0;
  let seekBusy=false;
  let seekWatchdog=0;
  let lastIssuedTime=0;
  let lastPresentedTime=0;
  let hasPresentedFrame=false;
  let frameCallbackId=0;
  let destroyed=false;

  function metrics(){
    const r=track.getBoundingClientRect();
    const total=track.offsetHeight-innerHeight;
    const top=scrollY+r.top;
    return {top,total,endY:top+total};
  }
  function progressFromY(y){
    const m=metrics();
    return clamp((y-m.top)/Math.max(m.total,1));
  }
  function wheelPixels(e){
    if(e.deltaMode===1) return e.deltaY*18;
    if(e.deltaMode===2) return e.deltaY*innerHeight;
    return e.deltaY;
  }
  function recordVelocity(deltaPx,now=performance.now()){
    const dt=lastInputAt?clamp(now-lastInputAt,8,120):32;
    const instant=Math.abs(deltaPx)/dt;
    velocityEMA=velocityEMA*.68+instant*.32;
    lastInputAt=now;
  }
  function adaptiveHandoffMs(){
    const speed=clamp((velocityEMA-.55)/(3.2-.55));
    return Math.round(mix(SLOW_HANDOFF_MS,FAST_HANDOFF_MS,smooth(speed)));
  }
  function hardResetAtRevealEnd(){
    velocityEMA=0;
    lastInputAt=0;
    postRevealGuard=true;
    postRevealPrevMag=0;
    postRevealRiseCount=0;
  }
  function isFreshDownwardImpulse(mag){
    if(postRevealPrevMag===0){
      postRevealPrevMag=mag;
      postRevealRiseCount=0;
      return false;
    }
    const strongJump=mag>=Math.max(18,postRevealPrevMag*1.7);
    const rising=mag>postRevealPrevMag*1.18+.8;
    postRevealRiseCount=rising?postRevealRiseCount+1:0;
    postRevealPrevMag=mag;
    return strongJump||postRevealRiseCount>=2;
  }
  function serviceVisibility(p){
    if(handoffRunning) return handoff;
    if(handoffDone) return map(p,.94,1);
    return 0;
  }

  function mediaDuration(){
    return Number.isFinite(video.duration)&&video.duration>0?video.duration:DURATION;
  }
  function targetTime(){
    const d=mediaDuration();
    return clamp(desiredVideoTime,0,Math.max(0,d-.001));
  }
  function clearSeekWatchdog(){
    if(seekWatchdog){
      clearTimeout(seekWatchdog);
      seekWatchdog=0;
    }
  }
  function scheduleSeekWatchdog(){
    clearSeekWatchdog();
    seekWatchdog=setTimeout(()=>{
      seekWatchdog=0;
      if(destroyed) return;

      // A seek can occasionally report currentTime immediately while the
      // decoded/presented frame is still the old first frame. Do not let that
      // stale state permanently block the queue.
      const wanted=targetTime();
      const presentedGap=hasPresentedFrame?Math.abs(lastPresentedTime-wanted):Infinity;
      const issuedGap=Math.abs(lastIssuedTime-wanted);
      seekBusy=false;

      if(presentedGap>PRESENT_EPS||issuedGap>SEEK_EPS){
        issueSeek(true);
      }
    },SEEK_WATCHDOG_MS);
  }
  function issueSeek(force=false){
    if(destroyed||video.readyState<2) return;
    const wanted=targetTime();

    if(!force){
      if(seekBusy) return;
      const currentGap=Math.abs(video.currentTime-wanted);
      const presentedGap=hasPresentedFrame?Math.abs(lastPresentedTime-wanted):currentGap;
      if(currentGap<=SEEK_EPS&&presentedGap<=PRESENT_EPS) return;
    }

    seekBusy=true;
    lastIssuedTime=wanted;
    try{
      video.currentTime=wanted;
      scheduleSeekWatchdog();
    }catch(_){
      seekBusy=false;
      clearSeekWatchdog();
    }
  }
  function settleSeek(){
    seekBusy=false;
    clearSeekWatchdog();
    schedule();

    // The scroll position may have moved while the browser was decoding the
    // previous target. Immediately consume only the latest target.
    const wanted=targetTime();
    if(Math.abs(video.currentTime-wanted)>SEEK_EPS||
       (hasPresentedFrame&&Math.abs(lastPresentedTime-wanted)>PRESENT_EPS)){
      issueSeek();
    }
  }
  function requestFrameProbe(){
    if(typeof video.requestVideoFrameCallback!=='function') return;
    const onFrame=(_,metadata)=>{
      if(destroyed) return;
      if(Number.isFinite(metadata?.mediaTime)){
        lastPresentedTime=metadata.mediaTime;
        hasPresentedFrame=true;
      }
      frameCallbackId=video.requestVideoFrameCallback(onFrame);
    };
    frameCallbackId=video.requestVideoFrameCallback(onFrame);
  }

  function render(){
    raf=0;
    const p=progressFromY(scrollY);
    const videoP=Math.pow(map(p,.018,.88),1.10);
    desiredVideoTime=videoP*DURATION;
    issueSeek();

    const tf=map(p,.28,.62);
    copy.style.opacity=1-tf;
    copy.style.transform=`translateY(calc(-43% - ${tf*30}px))`;
    hint.style.opacity=1-map(p,.04,.18);

    const white=map(p,.78,.94);
    wash.style.opacity=white;
    shade.style.opacity=1-map(p,.58,.86);

    const sv=serviceVisibility(p);
    stage.style.opacity=sv;
    stage.classList.toggle('ready',sv>.98);
    services.style.opacity=sv;
    services.style.transform=`translateY(${(1-sv)*18}px)`;

    const heroNavOpacity=1-tf;
    const serviceNavOpacity=sv;
    nav.style.opacity=clamp(Math.max(heroNavOpacity,serviceNavOpacity));
    nav.classList.toggle('light',serviceNavOpacity>.002);
    nav.style.pointerEvents=(heroNavOpacity>.08||serviceNavOpacity>.92)?'auto':'none';

    if(p<RESET_P&&!handoffRunning){
      handoff=0;
      handoffDone=false;
      velocityEMA=0;
      lastInputAt=0;
      postRevealGuard=false;
      postRevealPrevMag=0;
      postRevealRiseCount=0;
    }
    if(p>.9985&&!handoffRunning&&!handoffDone) startHandoff();
  }
  function schedule(){
    if(!raf) raf=requestAnimationFrame(render);
  }

  function startHandoff(){
    if(handoffRunning||handoffDone) return;
    const duration=adaptiveHandoffMs();
    handoffRunning=true;
    handoffDone=false;
    handoff=0;
    const start=performance.now();
    function tick(now){
      const t=clamp((now-start)/duration);
      handoff=smooth(t);
      schedule();
      if(t<1){
        handoffRaf=requestAnimationFrame(tick);
      }else{
        handoff=1;
        handoffRunning=false;
        handoffDone=true;
        hardResetAtRevealEnd();
        schedule();
      }
    }
    handoffRaf=requestAnimationFrame(tick);
  }

  function jumpToServices(){
    if(handoffRaf) cancelAnimationFrame(handoffRaf);
    handoff=1;
    handoffRunning=false;
    handoffDone=true;
    hardResetAtRevealEnd();
    const m=metrics();
    scrollTo({top:m.endY,behavior:'auto'});
    schedule();
  }
  window.twkHero={jumpToServices};

  function onScroll(){schedule();}
  function onResize(){schedule();}
  function onWheel(e){
    const dy=wheelPixels(e),m=metrics(),y=scrollY;
    if(handoffRunning){e.preventDefault();return;}
    if(handoffDone){
      if(dy<0){postRevealGuard=false;postRevealPrevMag=0;postRevealRiseCount=0;return;}
      if(dy>0&&postRevealGuard){
        const mag=Math.abs(dy);
        if(isFreshDownwardImpulse(mag)){
          postRevealGuard=false;postRevealPrevMag=0;postRevealRiseCount=0;return;
        }
        e.preventDefault();return;
      }
      return;
    }
    if(dy<=0) return;
    if(y<m.endY-1){
      e.preventDefault();
      recordVelocity(dy);
      const next=Math.min(m.endY,y+Math.max(1,dy));
      scrollTo(0,next);
      schedule();
      if(next>=m.endY-1) startHandoff();
    }else{
      e.preventDefault();
      startHandoff();
    }
  }
  function onTouchStart(e){
    touchY=e.touches[0]?.clientY??null;
    touchT=performance.now();
    if(handoffDone){postRevealGuard=false;postRevealPrevMag=0;postRevealRiseCount=0;}
  }
  function onTouchMove(e){
    if(touchY==null) return;
    const nowY=e.touches[0]?.clientY??touchY;
    const nowT=performance.now();
    const dy=touchY-nowY;
    touchY=nowY;
    const dt=Math.max(8,nowT-touchT);
    touchT=nowT;
    const m=metrics(),y=scrollY;
    if(handoffRunning){e.preventDefault();return;}
    if(handoffDone||dy<=0) return;
    if(y<m.endY-1){
      e.preventDefault();
      const instant=Math.abs(dy)/dt;
      velocityEMA=velocityEMA*.68+instant*.32;
      lastInputAt=nowT;
      const next=Math.min(m.endY,y+dy);
      scrollTo(0,next);
      schedule();
      if(next>=m.endY-1) startHandoff();
    }else{
      e.preventDefault();
      startHandoff();
    }
  }
  function onTouchEnd(){touchY=null;}
  function onMediaReady(){
    video.pause();
    issueSeek(true);
    schedule();
  }

  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',onResize);
  addEventListener('wheel',onWheel,{passive:false});
  addEventListener('touchstart',onTouchStart,{passive:true});
  addEventListener('touchmove',onTouchMove,{passive:false});
  addEventListener('touchend',onTouchEnd,{passive:true});
  addEventListener('touchcancel',onTouchEnd,{passive:true});

  ['loadeddata','canplay','seeked'].forEach(name=>video.addEventListener(name,name==='seeked'?settleSeek:onMediaReady));
  video.addEventListener('loadedmetadata',()=>{schedule();});
  video.addEventListener('error',()=>{seekBusy=false;clearSeekWatchdog();});

  requestFrameProbe();
  video.load();
  schedule();

  // Make cleanup explicit so a later homepage shell can replace this version
  // without leaving stale scroll listeners or RAF loops behind.
  window.__twkDestroyHeroScrubber=()=>{
    if(destroyed) return;
    destroyed=true;
    clearSeekWatchdog();
    if(raf) cancelAnimationFrame(raf);
    if(handoffRaf) cancelAnimationFrame(handoffRaf);
    if(frameCallbackId&&typeof video.cancelVideoFrameCallback==='function'){
      try{video.cancelVideoFrameCallback(frameCallbackId);}catch(_){ }
    }
    removeEventListener('scroll',onScroll);
    removeEventListener('resize',onResize);
    removeEventListener('wheel',onWheel);
    removeEventListener('touchstart',onTouchStart);
    removeEventListener('touchmove',onTouchMove);
    removeEventListener('touchend',onTouchEnd);
    removeEventListener('touchcancel',onTouchEnd);
    delete window.__twkDestroyHeroScrubber;
  };
})();
