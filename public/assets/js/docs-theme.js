(()=>{
  function firstStrongText(el){return (el.querySelector('strong')?.textContent||'').trim().toUpperCase()}
  function applySemanticStyling(){
    document.querySelectorAll('.content blockquote').forEach(q=>{
      const t=firstStrongText(q);
      if(t.startsWith('IMPORTANT')||t.startsWith('HARD STOP')) q.classList.add('jm-hard-stop');
      else if(t.startsWith('RECOMMENDED STORAGE')||t.startsWith('WARNING')) q.classList.add('jm-recommend');
      else if(t.startsWith('SAVE STATE')||t.startsWith('WORKFLOW')) q.classList.add('jm-save-state');
    });
    document.querySelectorAll('.step-body p').forEach(p=>{
      const t=firstStrongText(p);
      if(t.startsWith('SAVE STATE')) p.classList.add('jm-save-line');
      if(t.startsWith('WARNING')||t.startsWith('HARD STOP')||t==='STOP:'||t.startsWith('STOP:')) p.classList.add('jm-warning-line');
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applySemanticStyling,{once:true});
  else applySemanticStyling();
})();
