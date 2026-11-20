
(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],NS='http://www.w3.org/2000/svg';
function el(tag,attrs={},text){const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=text;return e;}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function init(root){
 if(root.dataset.ready)return;root.dataset.ready='1';
 let cfg;try{cfg=JSON.parse(root.dataset.kmConfig)}catch(e){return}
 const svg=$('.km-svg',root),info=$('.km-component-info',root),stepText=$('.km-current-step',root),stage=$('.km-stage',root),progress=$('.km-progress-label',root);
 const nodes=cfg.nodes,steps=cfg.steps;let current=-1,timer=null;
 const grid=nodes.length>10,cols=grid?4:nodes.length,rows=grid?Math.ceil(nodes.length/cols):1;
 const width=grid?cols*220+100:Math.max(1000,nodes.length*220),height=grid?rows*190+100:300,margin=grid?110:110;
 const pos=nodes.map((_,i)=>{if(!grid)return{x:margin+i*(width-margin*2)/Math.max(1,nodes.length-1),y:142};const row=Math.floor(i/cols),slot=i%cols,col=row%2===0?slot:cols-1-slot;return{x:110+col*220,y:110+row*190};});
 svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('width',width);svg.setAttribute('height',height);
 const defs=el('defs'),marker=el('marker',{id:`arr-${cfg.day}`,markerWidth:10,markerHeight:10,refX:8,refY:3,orient:'auto'});marker.append(el('path',{d:'M0 0 L0 6 L8 3 z',fill:'#6c829b'}));defs.append(marker);svg.append(defs);
 if(grid){
  const rowNames=['CLIENT + API ENTRY','CONTROL PLANE POLICY + PERSISTENCE','CONTROLLER RECONCILIATION','WORKER NODE EXECUTION','HEALTH + SERVICE TRAFFIC'];
  for(let r=0;r<rows;r++){let y=110+r*190;svg.append(el('rect',{class:'km-zone',x:22,y:y-82,width:width-44,height:164,rx:14}));svg.append(el('text',{class:'km-zone-label',x:36,y:y-61},rowNames[r]||`ARCHITECTURE STAGE ${r+1}`));}
 }
 nodes.slice(0,-1).forEach((_,i)=>{
  const a=pos[i],b=pos[i+1];let d;
  if(Math.abs(a.y-b.y)<1){const dir=b.x>a.x?1:-1;d=`M${a.x+dir*66} ${a.y} L${b.x-dir*66} ${b.y}`;}
  else {const fromY=a.y+44,toY=b.y-44;const bend=a.x;d=`M${a.x} ${fromY} L${bend} ${(fromY+toY)/2} L${b.x} ${(fromY+toY)/2} L${b.x} ${toY}`;}
  svg.append(el('path',{class:'km-link',d,'marker-end':`url(#arr-${cfg.day})`}));
  const label=(cfg.edges||[])[i]||'';if(label){const midx=(a.x+b.x)/2,midy=(a.y+b.y)/2;svg.append(el('text',{x:midx,y:midy-10,class:'km-edge-label'},label));}
 });
 nodes.forEach((n,i)=>{
  const p=pos[i],g=el('g',{class:'km-node','data-node':i,tabindex:0,role:'button','aria-label':`${n.name}: ${n.description}`});
  g.append(el('rect',{x:p.x-65,y:p.y-42,width:130,height:84,rx:12}));
  g.append(el('circle',{cx:p.x,cy:p.y-56,r:14}));
  g.append(el('text',{x:p.x,y:p.y-52,class:'km-num'},String(i+1)));
  const words=n.name.split(/\s+/),lines=[];let line='';
  words.forEach(w=>{if((line+' '+w).trim().length>17&&line){lines.push(line);line=w}else line=(line+' '+w).trim()});if(line)lines.push(line);
  const t=el('text',{x:p.x,y:p.y-7-(Math.min(lines.length,3)-1)*7,class:'km-node-label'});
  lines.slice(0,3).forEach((v,j)=>t.append(el('tspan',{x:p.x,dy:j?15:0},v)));g.append(t);
  g.addEventListener('click',()=>showNode(i));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showNode(i)}});svg.append(g);
 });
 svg.append(el('text',{x:25,y:25,class:'km-svg-title'},`DAY ${String(cfg.day).padStart(2,'0')} · ${cfg.title}`));
 svg.append(el('text',{x:25,y:height-14,class:'km-svg-foot'},'Conceptual architecture · click any component for its responsibility'));
 function showNode(i){$$('.km-node',svg).forEach((n,j)=>n.classList.toggle('active',j===i));info.innerHTML=`<strong>${i+1}. ${escapeHtml(nodes[i].name)}</strong><p>${escapeHtml(nodes[i].description)}</p>`;}
 function render(){
  $$('.km-step-list li',root).forEach((li,i)=>li.classList.toggle('active',i===current));
  if(current<0){stepText.textContent='Press Play or Next to start the walkthrough.';stage.textContent='Ready';progress.textContent=`0 / ${steps.length}`;$$('.km-node',svg).forEach(n=>n.classList.remove('active','done'));return;}
  stepText.textContent=`Stage ${current+1}: ${steps[current]}`;stage.textContent=`Stage ${current+1}`;progress.textContent=`${current+1} / ${steps.length}`;
  const ni=Math.min(nodes.length-1,Math.floor(current*nodes.length/steps.length));$$('.km-node',svg).forEach((n,i)=>{n.classList.toggle('active',i===ni);n.classList.toggle('done',i<ni)});
  info.innerHTML=`<strong>${escapeHtml(nodes[ni].name)}</strong><p>${escapeHtml(nodes[ni].description)}</p><p class="km-linking">This workflow stage maps to architecture component ${ni+1}.</p>`;
 }
 function pause(){if(timer)clearInterval(timer);timer=null;root.classList.add('km-paused');}
 function next(){current=current<0?0:(current+1)%steps.length;render();}
 root.addEventListener('click',e=>{
  const b=e.target.closest('[data-km]');if(!b)return;const a=b.dataset.km;
  if(a==='play'){if(timer)return;root.classList.remove('km-paused');if(current>=steps.length-1)current=-1;next();timer=setInterval(()=>{if(current>=steps.length-1){pause();return;}next();},Number($('[data-km="speed"]',root).value));}
  if(a==='pause')pause();
  if(a==='next'){pause();next();}
  if(a==='prev'){pause();current=Math.max(0,current-1);render();}
  if(a==='restart'){pause();current=-1;render();}
  if(a==='reconcile'){const actual=$('[data-actual]',root),bars=$$('.km-replica-track span',root);let n=0;actual.textContent='0';bars.forEach(b=>b.classList.remove('filled'));const t=setInterval(()=>{if(n>=3){clearInterval(t);actual.textContent='3 (converged)';return;}bars[n].classList.add('filled');n++;actual.textContent=String(n);},650);}
 });
 $('[data-km="speed"]',root)?.addEventListener('change',()=>{if(timer){pause();root.querySelector('[data-km="play"]').click();}});
 $$('.km-faults [data-fault]',root).forEach(b=>b.addEventListener('click',()=>fault(b.dataset.fault,root)));
 render();
}
const faults={
forbidden:['API server · authorization','kubectl apply returns Error from server (Forbidden), HTTP 403.','kubectl auth can-i patch deployments -n default; kubectl auth can-i create deployments -n default','Bind the minimum required Role / RoleBinding to the correct identity; verify the current context.'],
admission:['API server · admission','Request rejected by validating policy or webhook; desired state is not persisted.','kubectl apply --dry-run=server -f deployment.yaml; inspect admission webhook / policy logs','Correct the manifest or request an approved policy change; do not bypass controls blindly.'],
invalid:['Client / API validation','YAML parse error, schema error or invalid selector / field value.','kubectl apply --dry-run=server -f deployment.yaml; kubectl explain deployment.spec','Fix indentation, API version, types and selector/template label match.'],
imagepull:['Worker node · kubelet / CRI','Pod shows ErrImagePull or ImagePullBackOff; container never starts.','kubectl describe pod <pod>; kubectl get events --sort-by=.lastTimestamp','Correct image and tag, registry auth, imagePullSecrets or registry connectivity.'],
cpu:['Scheduler','Pod remains Pending with Insufficient cpu event.','kubectl describe pod <pod>; kubectl describe nodes; kubectl top nodes','Right-size CPU requests, rebalance workloads or add node capacity.'],
memory:['Scheduler / node pressure','Pod remains Pending for Insufficient memory, or runtime may OOM-kill if limit exceeded.','kubectl describe pod <pod>; kubectl top nodes; kubectl describe node <node>','Set realistic requests/limits, investigate memory leaks and add capacity if needed.'],
pending:['Scheduler','Pod remains Pending; no feasible node satisfies constraints.','kubectl describe pod <pod>; inspect taints, tolerations, affinity, PVC and events','Resolve scheduling constraints or provision suitable node / storage capacity.'],
crash:['Container process / kubelet','Container repeatedly exits; Pod reports CrashLoopBackOff.','kubectl logs <pod> --previous; kubectl describe pod <pod>','Fix startup command, configuration, dependencies or probe settings; validate before rollout.'],
cni:['Node networking · CNI','Pod sandbox creation fails or Pod cannot get an IP / network connectivity.','kubectl describe pod <pod>; inspect CNI DaemonSet Pods and node plugin logs','Restore CNI health, IPAM capacity, node routes and security rules; verify Pod networking.'],
readiness:['Pod readiness / EndpointSlice','Container runs but Ready=False and is absent from eligible Service endpoints.','kubectl describe pod <pod>; kubectl get endpointslices; inspect probe path and port','Fix health endpoint / port or startup timing; tune thresholds based on real startup behaviour.']
};
function fault(k,root){const out=$('.km-fault-output',root);if(k==='reset'){out.textContent='Scenario reset. Desired state can reconcile normally; no real cluster was changed.';return;}const f=faults[k];out.innerHTML=`<strong>Failure point: ${escapeHtml(f[0])}</strong><p><b>Symptoms:</b> ${escapeHtml(f[1])}</p><p><b>Diagnostics:</b> <code>${escapeHtml(f[2])}</code></p><p><b>Recovery:</b> ${escapeHtml(f[3])}</p>`;}
document.addEventListener('DOMContentLoaded',()=>{$$('.km-explorer').forEach(init);$$('[data-complete-day]').forEach(b=>b.addEventListener('click',()=>{let p=JSON.parse(localStorage.getItem('km-progress')||'{}');p[b.dataset.completeDay]=true;localStorage.setItem('km-progress',JSON.stringify(p));b.nextElementSibling.textContent=' ✓ Saved in this browser.';}));});
})();
