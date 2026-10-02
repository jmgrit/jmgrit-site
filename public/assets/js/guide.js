(()=>{
 const key='jmgrit-p2v-1.2.9';
 const guideId='windows-11-to-proxmox', guideVersion='1.2.9';
 const valuesKey=key+'-values', progressKey=key+'-progress', notesKey=key+'-notes';
 let values={}; try{values=JSON.parse(localStorage.getItem(valuesKey)||'{}')}catch{}
 let progress={}; try{progress=JSON.parse(localStorage.getItem(progressKey)||'{}')}catch{}
 let notes={}; try{notes=JSON.parse(localStorage.getItem(notesKey)||'{}')}catch{}
 const templates=[];
 function cleanValues(src){const out={};if(!src||typeof src!=='object'||Array.isArray(src))return out;for(const [k,v] of Object.entries(src)){if(/^[A-Z0-9_]+$/.test(k)&&(typeof v==='string'||typeof v==='number'))out[k]=String(v)}return out}
 function cleanProgress(src){const out={};if(!src||typeof src!=='object'||Array.isArray(src))return out;for(const [k,v] of Object.entries(src)){if(/^\d{3}$/.test(k)&&typeof v==='boolean')out[k]=v}return out}
 function cleanNotes(src){const out={};if(!src||typeof src!=='object'||Array.isArray(src))return out;for(const [k,v] of Object.entries(src)){if(/^[A-Za-z0-9_.:-]+$/.test(k)&&typeof v==='string')out[k]=v}return out}
 values=cleanValues(values);progress=cleanProgress(progress);notes=cleanNotes(notes);
 function derive(){
  if(values.PROXMOX_IP && values.NETWORK_CIDR && !values.PROXMOX_IP_CIDR){const m=String(values.NETWORK_CIDR).match(/\/(\d{1,2})$/); if(m) values.PROXMOX_IP_CIDR=values.PROXMOX_IP+'/'+m[1]}
  if(values.VHDX_USB_DRIVE && values.SOURCE_COMPUTER_NAME && !values.VHDX_WINDOWS_PATH){let d=String(values.VHDX_USB_DRIVE).replace(/[\\/]+$/,''); values.VHDX_WINDOWS_PATH=d+'\\'+String(values.SOURCE_COMPUTER_NAME).toUpperCase()+'.vhdx'}
 }
 function substitute(s){derive(); return String(s).replace(/\{\{([A-Z0-9_]+)\}\}/g,(m,k)=>values[k]||m)}
 function applyTemplates(){derive(); templates.forEach(t=>{if(t.node.nodeType===3)t.node.nodeValue=substitute(t.template);else t.node.textContent=substitute(t.template)}); document.querySelectorAll('[data-var-input]').forEach(i=>{const k=i.dataset.varInput;if(document.activeElement!==i)i.value=values[k]||''}); document.querySelectorAll('[data-user-variable-input]').forEach(i=>{const k=i.dataset.userVariableInput;if(document.activeElement!==i)i.value=values[k]||''})}
 function rememberTemplates(){const root=document.querySelector('[data-guide-content]'); if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); let n;while(n=walker.nextNode()){if(/\{\{[A-Z0-9_]+\}\}/.test(n.nodeValue||''))templates.push({node:n,template:n.nodeValue})}}
 function persistAll(){derive();localStorage.setItem(valuesKey,JSON.stringify(values));localStorage.setItem(progressKey,JSON.stringify(progress));localStorage.setItem(notesKey,JSON.stringify(notes))}
 function saveValues(){derive();localStorage.setItem(valuesKey,JSON.stringify(values));applyTemplates()}
 function bindValues(){document.querySelectorAll('[data-var-input],[data-user-variable-input]').forEach(i=>{const k=i.dataset.varInput||i.dataset.userVariableInput;if(!k)return;i.value=values[k]||'';if(i.readOnly){i.tabIndex=-1;return}i.addEventListener('input',()=>{values[k]=i.value.trim();saveValues()})})}
 function updateProgress(){const all=[...document.querySelectorAll('.step-check')];const done=all.filter(c=>c.checked).length;const pct=all.length?Math.round(done/all.length*100):0;document.querySelector('[data-progress-fill]')?.style.setProperty('width',pct+'%');const l=document.querySelector('[data-progress-label]');if(l)l.textContent=done+' / '+all.length+' steps'}
 function bindProgress(){document.querySelectorAll('.step-check').forEach(c=>{const id=c.dataset.step;c.checked=!!progress[id];if(c.dataset.boundProgress==='1')return;c.dataset.boundProgress='1';c.addEventListener('change',()=>{progress[id]=c.checked;localStorage.setItem(progressKey,JSON.stringify(progress));updateProgress()})});updateProgress()}
 function bindScratchpads(){document.querySelectorAll('[data-scratch-key]').forEach(t=>{const k=t.dataset.scratchKey;t.value=notes[k]||'';if(t.dataset.boundScratch==='1')return;t.dataset.boundScratch='1';t.addEventListener('input',()=>{notes[k]=t.value;localStorage.setItem(notesKey,JSON.stringify(notes))})})}
 function codeButtons(){document.querySelectorAll('.step-body pre,.guide-content pre').forEach(pre=>{if(pre.closest('.code-wrap'))return;const w=document.createElement('div');w.className='code-wrap';pre.parentNode.insertBefore(w,pre);w.appendChild(pre);const b=document.createElement('button');b.type='button';b.className='copy-code';b.textContent='Copy';b.addEventListener('click',async()=>{const txt=substitute(pre.innerText);try{await navigator.clipboard.writeText(txt);b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1200)}catch{b.textContent='Select'}});w.appendChild(b)})}
 function markCallouts(){document.querySelectorAll('.step-body p').forEach(p=>{const t=p.textContent.trim();if(t.startsWith('STOP CHECK:'))p.classList.add('stop-check');if(t.startsWith('HARD STOP:'))p.classList.add('hard-stop');if(t.startsWith('SAVE STATE:'))p.classList.add('save-state')})}
 function exportState(){
  persistAll();
  const payload={schema:'jmgrit-guide-state',schemaVersion:1,guide:guideId,guideVersion,exportedAt:new Date().toISOString(),storage:'browser-local-only',values,progress,notes};
  const blob=new Blob([JSON.stringify(payload,null,2)+'\n'],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');const stamp=new Date().toISOString().replace(/[:.]/g,'-');a.href=url;a.download=`jmgrit-${guideId}-state-${stamp}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)
 }
 function importStateFile(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{try{const data=JSON.parse(String(reader.result||''));if(!data||data.schema!=='jmgrit-guide-state'||data.guide!==guideId)throw new Error('This file is not a JMGRIT Windows 11 → Proxmox guide-state export.');const nextValues=cleanValues(data.values),nextProgress=cleanProgress(data.progress),nextNotes=cleanNotes(data.notes);if(!confirm('Replace the locally saved values, completed steps, and scratchpad notes in this browser with the imported state?'))return;values=nextValues;progress=nextProgress;notes=nextNotes;persistAll();location.reload()}catch(err){alert('Import failed: '+(err?.message||'Invalid JSON file.'))}};
  reader.onerror=()=>alert('Import failed: the selected file could not be read.');reader.readAsText(file)
 }
 addEventListener('DOMContentLoaded',()=>{
  rememberTemplates();bindValues();applyTemplates();bindProgress();bindScratchpads();codeButtons();markCallouts();
  document.querySelector('[data-reset-progress]')?.addEventListener('click',()=>{if(confirm('Reset step completion for this guide?')){progress={};localStorage.removeItem(progressKey);document.querySelectorAll('.step-check').forEach(c=>c.checked=false);updateProgress()}});
  document.querySelector('[data-clear-values]')?.addEventListener('click',()=>{if(confirm('Clear saved guide values on this device?')){values={};localStorage.removeItem(valuesKey);location.reload()}});
  document.querySelectorAll('[data-export-state]').forEach(b=>b.addEventListener('click',exportState));
  const picker=document.querySelector('[data-import-state-file]');
  document.querySelectorAll('[data-import-state]').forEach(b=>b.addEventListener('click',()=>{if(picker){picker.value='';picker.click()}}));
  picker?.addEventListener('change',()=>importStateFile(picker.files?.[0]));
  document.querySelectorAll('a[href^="http"]').forEach(a=>{if(!a.href.startsWith(location.origin)){a.target='_blank';a.rel='noopener noreferrer'}})
 });
})();
