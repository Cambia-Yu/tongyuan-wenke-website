(()=>{
 const track=document.getElementById('track'),video=document.getElementById('video'),copy=document.getElementById('heroCopy'),wash=document.getElementById('wash'),shade=document.getElementById('shade'),nav=document.getElementById('nav'),hint=document.getElementById('hint'),stage=document.getElementById('serviceStage'),services=document.getElementById('services');
 const DURATION=5.041667;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const smooth=t=>t*t*(3-2*t);
 const map=(p,a,b)=>smooth(clamp((p-a)/(b-a)));
 const mix=(a,b,t)=>a+(b-a)*t;

 // v3.9: 2.4 screens ends exactly on the pure-white frame; gesture #2 can re-enter immediately.
 // There is no invisible distance between WHITE and the next real page.
 const WHITE_P=1;
 const RESET_P=.90;
 const SLOW_HANDOFF_MS=1050;
 const FAST_HANDOFF_MS=820;
 const WHEEL_GESTURE_END_MS=220;
 const NEW_GESTURE_GAP_MS=85; // a fresh intentional gesture may break quarantine early

 let handoff=0, handoffRunning=false, handoffDone=false;
 let raf=0, handoffRaf=0;
 let velocityEMA=0, lastInputAt=0;
 let quarantine=false, quarantineTimer=0;
 let lastBlockedWheelAt=0, queuedSecondGesture=false;
 let touchY=null, touchT=0, touchActive=false;

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

 // Consume only the tail of the SAME downward gesture that reached white.
 // Once wheel events have been quiet for 220ms, the next gesture is native page scrolling.
 function armGestureEnd(now=performance.now()){
   quarantine=true;
   lastBlockedWheelAt=now;
   clearTimeout(quarantineTimer);
   quarantineTimer=setTimeout(()=>{
     // Fallback release for a gesture that simply tails off.
     quarantine=false;
   },WHEEL_GESTURE_END_MS);
 }
 function touchGestureEnded(){
   touchActive=false;
   // Touch input has an explicit end event; release after a tiny settle window.
   setTimeout(()=>{ if(!touchActive) quarantine=false; },60);
 }

 function serviceVisibility(p){
   if(handoffRunning) return handoff;
   if(handoffDone) return map(p,.94,1); // reverse scrolling fades continuously into pure white
   return 0;
 }

 function render(){
   raf=0;
   const p=progressFromY(scrollY);

   // Keep the already-smooth scrub path from v3.5/v3.6; only the timing map changes
   // because white is now the physical end of the 2.4-screen track.
   const videoP=Math.pow(map(p,.018,.88),1.10);
   if(video.readyState>=1){
     const t=videoP*DURATION;
     if(Math.abs(video.currentTime-t)>.010) video.currentTime=t;
   }

   const tf=map(p,.28,.62);
   copy.style.opacity=1-tf;
   copy.style.transform=`translateY(calc(-43% - ${tf*30}px))`;
   hint.style.opacity=1-map(p,.04,.18);

   // Reach full white BEFORE the physical end. The last part is intentionally a stable white landing.
   const white=map(p,.78,.94);
   wash.style.opacity=white;
   shade.style.opacity=1-map(p,.58,.86);

   const sv=serviceVisibility(p);
   stage.style.opacity=sv;
   stage.classList.toggle('ready',sv>.98);
   services.style.opacity=sv;
   services.style.transform=`translateY(${(1-sv)*18}px)`;

   const darkOut=map(p,.52,.79);
   const lightIn=sv;
   nav.style.opacity=clamp(1-darkOut+lightIn);
   nav.classList.toggle('light',lightIn>.45);

   // If the user has genuinely scrolled back into the Hero, re-arm the white handoff.
   // No scroll position is changed here; this is only state reset.
   if(p<RESET_P && !handoffRunning){
     handoff=0;
     handoffDone=false;
     velocityEMA=0;
   }

   // Keyboard / scrollbar / accessibility path: reaching the physical end also triggers handoff.
   if(p>.9985 && !handoffRunning && !handoffDone){ startHandoff(); }
 }
 function schedule(){ if(!raf) raf=requestAnimationFrame(render); }

 function startHandoff(){
   if(handoffRunning||handoffDone) return;
   const duration=adaptiveHandoffMs();
   handoffRunning=true;
   handoffDone=false;
   handoff=0;

   // IMPORTANT: no scrollTo() here. White is already the real end of the Hero.
   // We only animate the service layer and quarantine residual momentum from this same gesture.
   armGestureEnd();
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
       // If a genuinely new second gesture already began while the reveal was finishing,
       // release immediately so the remaining events of THAT gesture can scroll natively.
       if(queuedSecondGesture){
         quarantine=false;
         queuedSecondGesture=false;
         clearTimeout(quarantineTimer);
       }
       schedule();
     }
   }
   handoffRaf=requestAnimationFrame(tick);
 }

 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule);

 addEventListener('wheel',(e)=>{
   const dy=wheelPixels(e);
   const m=metrics(), y=scrollY;
   const now=performance.now();

   // During the automatic white->services reveal we still consume input so the first gesture
   // cannot leak through. But if there has been a real quiet gap and a new downward gesture
   // starts, remember it as gesture #2. Once the reveal finishes, its remaining wheel events
   // are allowed through immediately instead of forcing the user to gesture a third time.
   if(handoffRunning){
     const gap=lastBlockedWheelAt ? now-lastBlockedWheelAt : 0;
     if(dy>0 && gap>=NEW_GESTURE_GAP_MS){
       queuedSecondGesture=true;
     }
     e.preventDefault();
     armGestureEnd(now);
     return;
   }

   // After reveal, quarantine is ONLY for the tail of gesture #1. A new gesture can break
   // quarantine early after a short real pause; its very first event is allowed to scroll.
   if(quarantine){
     const gap=lastBlockedWheelAt ? now-lastBlockedWheelAt : 0;
     const freshSecondGesture=handoffDone && dy>0 && gap>=NEW_GESTURE_GAP_MS;
     if(freshSecondGesture){
       quarantine=false;
       queuedSecondGesture=false;
       clearTimeout(quarantineTimer);
       // Do not preventDefault: this first event of gesture #2 becomes normal page scrolling.
       return;
     }
     e.preventDefault();
     armGestureEnd(now);
     return;
   }

   // Once reveal is complete there is deliberately NO gate in either direction.
   // The second downward gesture scrolls natively into Project Practices;
   // upward gestures scroll natively and continuously back through Services -> white -> video.
   if(handoffDone) return;

   // Upward motion is never intercepted.
   if(dy<=0) return;

   // Before white, cap the current downward gesture at the real end of the 2.4-screen track.
   // This guarantees even a huge first swipe cannot skip the white landing.
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
 },{passive:false});

 addEventListener('touchstart',e=>{
   touchY=e.touches[0]?.clientY??null;
   touchT=performance.now();
   touchActive=true;
   // Touch has an explicit gesture boundary, so a new touchstart is unambiguously a new gesture.
   if(handoffRunning && quarantine) queuedSecondGesture=true;
   if(handoffDone && quarantine){
     quarantine=false;
     clearTimeout(quarantineTimer);
   }
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

   if(handoffRunning || quarantine){
     e.preventDefault();
     return;
   }
   if(handoffDone) return; // native in both directions after reveal
   if(dy<=0) return;       // upward is always native

   if(y<m.endY-1){
     e.preventDefault();
     const instant=Math.abs(dy)/dt;
     velocityEMA=velocityEMA*.68+instant*.32;
     lastInputAt=nowT;
     const next=Math.min(m.endY,y+dy);
     scrollTo(0,next);
     schedule();
     if(next>=m.endY-1){
       quarantine=true;
       startHandoff();
     }
   }else{
     e.preventDefault();
     quarantine=true;
     startHandoff();
   }
 },{passive:false});

 addEventListener('touchend',()=>{
   touchY=null;
   touchGestureEnded();
 },{passive:true});
 addEventListener('touchcancel',()=>{
   touchY=null;
   touchGestureEnded();
 },{passive:true});

 video.addEventListener('loadedmetadata',schedule);
 schedule();
})();