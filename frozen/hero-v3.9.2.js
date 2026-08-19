(()=>{
 const track=document.getElementById('track'),video=document.getElementById('video'),copy=document.getElementById('heroCopy'),wash=document.getElementById('wash'),shade=document.getElementById('shade'),nav=document.getElementById('nav'),hint=document.getElementById('hint'),stage=document.getElementById('serviceStage'),services=document.getElementById('services');
 const DURATION=5.041667;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const smooth=t=>t*t*(3-2*t);
 const map=(p,a,b)=>smooth(clamp((p-a)/(b-a)));
 const mix=(a,b,t)=>a+(b-a)*t;

 const WHITE_P=1;
 const RESET_P=.90;
 const SLOW_HANDOFF_MS=1050;
 const FAST_HANDOFF_MS=820;
 const WHEEL_GESTURE_END_MS=220;

 let handoff=0, handoffRunning=false, handoffDone=false;
 let raf=0, handoffRaf=0;
 let velocityEMA=0, lastInputAt=0;
 let quarantine=false, quarantineTimer=0;
 let lastBlockedWheelAt=0;
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

 // v3.9.2: the first gesture is considered finished only after wheel input has gone quiet.
 // Every residual wheel event restarts this timer, so old momentum can never leak into the next page.
 function armGestureEnd(now=performance.now()){
   quarantine=true;
   lastBlockedWheelAt=now;
   clearTimeout(quarantineTimer);
   quarantineTimer=setTimeout(()=>{
     quarantine=false;
   },WHEEL_GESTURE_END_MS);
 }
 function touchGestureEnded(){
   touchActive=false;
   setTimeout(()=>{ if(!touchActive) quarantine=false; },60);
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

   const darkOut=map(p,.52,.79);
   const lightIn=sv;
   nav.style.opacity=clamp(1-darkOut+lightIn);
   nav.classList.toggle('light',lightIn>.45);

   if(p<RESET_P && !handoffRunning){
     handoff=0;
     handoffDone=false;
     velocityEMA=0;
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
       // Deliberately do NOT release quarantine here.
       // The reveal may finish while gesture #1 still has inertial wheel events in flight.
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

   // During the automatic reveal, ALL wheel input is consumed and treated as gesture #1 tail.
   if(handoffRunning){
     e.preventDefault();
     armGestureEnd(now);
     return;
   }

   // After reveal, continue draining gesture #1 until it has been quiet for 220ms.
   // Only an event arriving after that natural quiet period is a valid new downward gesture.
   if(quarantine){
     // Opposite direction is an explicit new action, so upward navigation remains responsive.
     if(handoffDone && dy<0){
       quarantine=false;
       clearTimeout(quarantineTimer);
       return;
     }
     e.preventDefault();
     armGestureEnd(now);
     return;
   }

   if(handoffDone) return;
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
 },{passive:false});

 addEventListener('touchstart',e=>{
   touchY=e.touches[0]?.clientY??null;
   touchT=performance.now();
   touchActive=true;
   // Touch exposes a real gesture boundary; a new touchstart after reveal is a valid new gesture.
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