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
