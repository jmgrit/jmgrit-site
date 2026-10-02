
(()=>{
 const root=document.documentElement, THEME='jmgrit-theme', DOC_THEME='documentation-generator-theme';
 const stored=localStorage.getItem(THEME)||localStorage.getItem(DOC_THEME); if(stored==='light'||stored==='dark'){root.dataset.theme=stored;localStorage.setItem(THEME,stored);localStorage.setItem(DOC_THEME,stored);}
 function isDark(){return root.dataset.theme==='dark'||(!root.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches)}
 function themeLabel(){document.querySelectorAll('[data-theme-toggle]').forEach(b=>{const d=isDark();b.textContent=d?'Light mode':'Dark mode';b.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode')})}
 addEventListener('DOMContentLoaded',()=>{
  themeLabel();
  document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.addEventListener('click',()=>{root.dataset.theme=isDark()?'light':'dark';localStorage.setItem(THEME,root.dataset.theme);localStorage.setItem(DOC_THEME,root.dataset.theme);themeLabel()}));
  const nav=document.querySelector('[data-nav-links]'); document.querySelector('[data-mobile-toggle]')?.addEventListener('click',e=>{const open=nav?.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(!!open))});
  document.querySelectorAll('[data-year]').forEach(e=>e.textContent=String(new Date().getFullYear()));
 });
})();
