(()=>{
  const root=document.documentElement;
  const THEME='documentation-generator-theme';
  const LEGACY='jmgrit-theme';
  const stored=localStorage.getItem(THEME)||localStorage.getItem(LEGACY);
  if(stored==='light'||stored==='dark') root.dataset.theme=stored;
  else if(matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme='dark';
  else root.dataset.theme='light';
  function isDark(){return root.dataset.theme==='dark'}
  function updateThemeLabels(){
    document.querySelectorAll('[data-theme-toggle]').forEach(b=>{
      const d=isDark();
      const label=b.querySelector('[data-theme-label]');
      const icon=b.querySelector('[data-theme-icon]');
      if(label) label.textContent=d?'Light':'Dark'; else b.textContent=d?'Light':'Dark';
      if(icon) icon.textContent=d?'☀':'☾';
      b.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');
      b.setAttribute('aria-checked',String(d));
    });
  }
  function setTheme(theme){
    root.dataset.theme=theme;
    localStorage.setItem(THEME,theme);
    localStorage.setItem(LEGACY,theme);
    updateThemeLabels();
  }
  addEventListener('DOMContentLoaded',()=>{
    updateThemeLabels();
    document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.addEventListener('click',()=>setTheme(isDark()?'light':'dark')));
    const nav=document.querySelector('[data-nav-links]');
    document.querySelector('[data-mobile-toggle]')?.addEventListener('click',e=>{
      const open=nav?.classList.toggle('open');
      e.currentTarget.setAttribute('aria-expanded',String(!!open));
    });
    document.querySelectorAll('[data-year]').forEach(e=>e.textContent=String(new Date().getFullYear()));
  });
})();

// Pointer-driven emblem spinner. Speeds are degrees per second.
(()=>{
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-emblem-spinner]').forEach(spinner=>{
    const artwork=spinner.querySelector('img');
    let angle=0,hue=0,speed=0,hover=false,drag=null,frame=0,lastFrame=0,suppressClick=false,coast=false,holdUntil=0;
    const clamp=v=>Math.max(-3600,Math.min(3600,v));
    const draw=()=>{
      artwork.style.transform=`rotate(${angle}deg)`;
      artwork.style.filter=Math.abs(speed)>.3?`hue-rotate(${hue}deg) saturate(${1.2+Math.min(Math.abs(speed)/2000,.6)})`:'';
    };
    function tick(now){
      const dt=Math.min((now-lastFrame)/1000,.05);lastFrame=now;
      if(!drag){
        const target=hover&&!reducedMotion.matches?(speed<0?-24:24):0;
        // A flick keeps its launch speed briefly, then loses momentum gently.
        if(now>=holdUntil){
          const friction=coast?.18:.85;
          speed=target+(speed-target)*Math.exp(-friction*dt);
          if(coast&&Math.abs(speed)<36)coast=false;
        }
        angle=(angle+speed*dt)%360;
        if(Math.abs(speed)>.3)hue=(hue+Math.min(120,20+Math.abs(speed)*.12)*dt)%360;
        draw();
      }
      if(drag||Math.abs(speed)>.3||(hover&&!reducedMotion.matches)) frame=requestAnimationFrame(tick);
      else{speed=0;frame=0;draw()}
    }
    function animate(){if(!frame){lastFrame=performance.now();frame=requestAnimationFrame(tick)}}
    function point(e){
      const box=spinner.getBoundingClientRect(),x=e.clientX-box.left-box.width/2,y=e.clientY-box.top-box.height/2;
      return {theta:Math.atan2(y,x)*180/Math.PI,radius:Math.hypot(x,y),minRadius:Math.min(box.width,box.height)*.18};
    }
    spinner.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){hover=true;animate()}});
    spinner.addEventListener('pointerleave',()=>{hover=false});
    spinner.addEventListener('pointerdown',e=>{
      if(e.button!==0||drag)return;
      const p=point(e);if(p.radius<p.minRadius)return;
      e.preventDefault();suppressClick=false;speed=0;coast=false;holdUntil=0;
      drag={id:e.pointerId,theta:p.theta,x:e.clientX,y:e.clientY,time:e.timeStamp,lastMove:e.timeStamp,flickSpeed:0,flickTime:e.timeStamp,moved:false};
      spinner.setPointerCapture(e.pointerId);spinner.classList.add('is-dragging');animate();
    });
    spinner.addEventListener('pointermove',e=>{
      if(!drag||drag.id!==e.pointerId)return;
      const p=point(e),dt=(e.timeStamp-drag.time)/1000;
      const delta=((p.theta-drag.theta+540)%360)-180;
      if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>3)drag.moved=true;
      if(p.radius>=p.minRadius&&dt>0){
        angle=(angle+delta)%360;hue=(hue+Math.min(Math.abs(delta)*.3,12))%360;
        // Shorter time over the same arc produces a stronger flick.
        const measured=clamp(delta/Math.max(dt,.004));
        speed=clamp(speed*.25+measured*.75);drag.lastMove=e.timeStamp;
        // Preserve the last useful flick through near-stationary release events.
        if(Math.abs(measured)>40){drag.flickSpeed=speed;drag.flickTime=e.timeStamp}
        draw();
      }else speed=0;
      drag.theta=p.theta;drag.time=e.timeStamp;
    });
    function release(e,cancelled=false){
      if(!drag||drag.id!==e.pointerId)return;
      suppressClick=drag.moved;
      const flick=drag.flickSpeed*Math.exp(-Math.max(0,e.timeStamp-drag.flickTime)/600);
      speed=cancelled?0:clamp(flick*2.8);
      coast=!cancelled&&Math.abs(speed)>36;
      holdUntil=coast?performance.now()+3500:0;
      const id=drag.id;drag=null;spinner.classList.remove('is-dragging');
      if(spinner.hasPointerCapture(id))spinner.releasePointerCapture(id);
      animate();
    }
    spinner.addEventListener('pointerup',e=>release(e));
    spinner.addEventListener('pointercancel',e=>release(e,true));
    spinner.addEventListener('lostpointercapture',e=>{if(drag)release(e,true)});
    spinner.addEventListener('click',e=>{
      if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false}
    },true);
    const keyboardTarget=spinner.closest('a')||spinner;
    keyboardTarget.addEventListener('keydown',e=>{
      if(e.code==='Space'||(e.code==='Enter'&&!spinner.closest('a'))){
        e.preventDefault();speed=clamp(speed+720);animate();
      }
    });
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){if(frame)cancelAnimationFrame(frame);frame=0;speed=0;hover=false;
        if(drag)release({pointerId:drag.id,timeStamp:performance.now()},true);
      }
    });
  });
})();
