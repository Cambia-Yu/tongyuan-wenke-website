(()=>{
 const track=document.getElementById('track'),video=document.getElementById('video'),copy=document.getElementById('heroCopy'),wash=document.getElementById('wash'),shade=document.getElementById('shade'),nav=document.getElementById('nav'),hint=document.getElementById('hint'),stage=document.getElementById('serviceStage'),services=document.getElementById('services');
 const DURATION=5.041667;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const smooth=t=>t*t*(3-2*t);
 const map=(p,a,b)=>smooth(clamp((p-a)/(b-a)));
 const mix=(a,b,t)=>a+(b-a)*t;

 const RESET_P=.90;
 const SLOW_HANDOFF_MS=1050;
 const FAST_HANDOFF_MS=820;

 let handoff=0, handoffRunning=false, handoffDone=false;
 let raf=0, handoffRaf=0;
 let velocityEMA=0, lastInputAt=0;
 let touchY=null, touchT=0;
 let postRevealGuard=false;
 let postRevealPrevMag=0;
 let postRevealRiseCount=0;

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
 function recordVelocity(deltaPx, now=performance.now()){
   const dt=lastInputAt ? clamp(now-lastInputAt,8,120) : 32;
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
   const strongJump = mag >= Math.max(18, postRevealPrevMag*1.7);
   const rising = mag > postRevealPrevMag*1.18 + .8;
   postRevealRiseCount = rising ? postRevealRiseCount+1 : 0;
   postRevealPrevMag = mag;
   return strongJump || postRevealRiseCount>=2;
 }
 function serviceVisibility(p){
   if(handoffRunning) return handoff;
   if(handoffDone) return map(p,.94,1);
   return 0;
 }

 function render(){
   raf=0;
   const p=progressFromY(scrollY);
   const videoP=Math.pow(map(p,.018,.88),1.10);
   if(video.readyState>=1){
     const t=videoP*DURATION;
     if(Math.abs(video.currentTime-t)>.010) video.currentTime=t;
   }

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

   /* v3.9.4 nav choreography:
      1) transparent Hero nav fades out with the Hero copy;
      2) it stays fully absent through the white interstitial;
      3) the same nav fades back in with the Services reveal, now as a white bar. */
   const heroNavOpacity=1-tf;
   const serviceNavOpacity=sv;
   nav.style.opacity=clamp(Math.max(heroNavOpacity,serviceNavOpacity));
   nav.classList.toggle('light',serviceNavOpacity>.002);
   nav.style.pointerEvents=(heroNavOpacity>.08 || serviceNavOpacity>.92)?'auto':'none';

   if(p<RESET_P && !handoffRunning){
     handoff=0;
     handoffDone=false;
     velocityEMA=0;
     lastInputAt=0;
     postRevealGuard=false;
     postRevealPrevMag=0;
     postRevealRiseCount=0;
   }
   if(p>.9985 && !handoffRunning && !handoffDone){ startHandoff(); }
 }
 function schedule(){ if(!raf) raf=requestAnimationFrame(render); }

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

 /* Direct-navigation API. Clicking Services bypasses the scroll narrative and lands
    directly in the completed Services state, including the white navigation bar. */
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

 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule);
 addEventListener('wheel',(e)=>{
   const dy=wheelPixels(e);
   const m=metrics(), y=scrollY;
   if(handoffRunning){e.preventDefault();return;}
   if(handoffDone){
     if(dy<0){postRevealGuard=false;postRevealPrevMag=0;postRevealRiseCount=0;return;}
     if(dy>0 && postRevealGuard){
       const mag=Math.abs(dy);
       if(isFreshDownwardImpulse(mag)){postRevealGuard=false;postRevealPrevMag=0;postRevealRiseCount=0;return;}
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
   }else{e.preventDefault();startHandoff();}
 },{passive:false});

 addEventListener('touchstart',e=>{
   touchY=e.touches[0]?.clientY??null;
   touchT=performance.now();
   if(handoffDone){postRevealGuard=false;postRevealPrevMag=0;postRevealRiseCount=0;}
 },{passive:true});
 addEventListener('touchmove',e=>{
   if(touchY==null) return;
   const nowY=e.touches[0]?.clientY??touchY;
   const nowT=performance.now();
   const dy=touchY-nowY;
   touchY=nowY;
   const dt=Math.max(8,nowT-touchT);
   touchT=nowT;
   const m=metrics(), y=scrollY;
   if(handoffRunning){e.preventDefault();return;}
   if(handoffDone) return;
   if(dy<=0) return;
   if(y<m.endY-1){
     e.preventDefault();
     const instant=Math.abs(dy)/dt;
     velocityEMA=velocityEMA*.68+instant*.32;
     lastInputAt=nowT;
     const next=Math.min(m.endY,y+dy);
     scrollTo(0,next);
     schedule();
     if(next>=m.endY-1) startHandoff();
   }else{e.preventDefault();startHandoff();}
 },{passive:false});
 addEventListener('touchend',()=>{touchY=null;},{passive:true});
 addEventListener('touchcancel',()=>{touchY=null;},{passive:true});
 video.addEventListener('loadedmetadata',schedule);
 schedule();
})();
