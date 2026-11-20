
(()=>{'use strict';
const $=s=>document.querySelector(s),screen=$('#terminal'),input=$('#command');let state={replicas:3,fault:'',nodeReady:true,namespace:'default',pods:['web-7d9f','web-7d9f-b','web-7d9f-c'],history:[]};
const initial=()=>{state={replicas:3,fault:'',nodeReady:true,namespace:'default',pods:['web-7d9f','web-7d9f-b','web-7d9f-c'],history:[]};renderState();};
function renderState(){$('#replica-count').textContent=state.replicas;$('#ready-count').textContent=state.fault?0:state.replicas;$('#node-count').textContent=state.nodeReady?2:1;$('#fault-status').textContent=state.fault?`Injected fault: ${state.fault} (simulated)`:'Cluster healthy. Fault injection is simulated.';}
function pods(){return state.pods.slice(0,state.replicas).map((p,i)=>`${p.padEnd(24)}${state.fault==='pending'?'Pending':state.fault==='imagepull'?'ImagePullBackOff':state.fault==='crash'?'CrashLoopBackOff':'1/1 Running'}   0   2m`).join('\n')||'No resources found.'}
function execute(raw){
 const c=raw.trim(),l=c.toLowerCase();if(!c)return '';
 if(l==='help'||l==='man kubectl')return `Supported training commands:
Linux: pwd, whoami, uname -a, ls, cat README.md, df -h, free -m, ps aux, top, echo <text>, clear
Docker: docker version, docker ps, docker images, docker build -t <name> ., docker run <image>
kubectl: get nodes|pods|deployments|services|events|namespaces, describe pod <name>, logs <pod>, logs <pod> --previous, apply -f <file>, delete pod <name>, scale deployment web --replicas=N, rollout status deployment/web, config current-context, auth can-i ...
Helm: helm version, list -A, status <release>, history <release>, rollback <release> <revision>
Simulation: sim fault imagepull|pending|crashloop|node, sim reset`;
 if(l==='clear')return '__CLEAR__';if(l==='pwd')return '/home/student/kubemindai';if(l==='whoami')return 'student';if(l==='uname -a')return 'Linux kubemindai 6.8.0-training x86_64 GNU/Linux';if(l==='ls')return 'README.md  deployment.yaml  service.yaml  labs/';if(l==='cat readme.md')return 'KubeMindAI training workspace. Commands are simulated.';if(l==='df -h')return 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/root        40G   12G   28G  30% /';if(l==='free -m')return '              total  used  free\nMem:           8192  2048  6144';if(l==='ps aux'||l==='top')return 'USER  PID %CPU %MEM COMMAND\nroot    1  0.1  0.2 /sbin/init\nstudent 42 0.0 0.1 bash';
 if(l==='docker version')return 'Client: Docker Engine (simulated) 27.x\nServer: Docker Engine (simulated) 27.x';if(l==='docker ps')return 'CONTAINER ID   IMAGE        STATUS        PORTS\nc0ffee123abc   nginx:1.27   Up 4 minutes  0.0.0.0:8080->80/tcp';if(l==='docker images')return 'REPOSITORY   TAG    IMAGE ID      SIZE\nnginx        1.27   8f2b...       192MB';if(l.startsWith('docker build'))return 'Step 1/4 : FROM nginx:1.27\nSuccessfully built a1b2c3d4 (simulated)\nSuccessfully tagged '+(c.match(/-t\s+(\S+)/)||[])[1]+' (simulated)';if(l.startsWith('docker run'))return 'Container started in detached training mode (simulated).';
 if(l==='kubectl config current-context')return 'training-cluster';if(l.startsWith('kubectl auth can-i'))return 'yes';if(l==='kubectl get nodes')return 'NAME           STATUS   ROLES           AGE   VERSION\ncontrol-plane  Ready    control-plane   8d    v1.34.1\nworker-1       '+(state.nodeReady?'Ready':'NotReady')+'    <none>          8d    v1.34.1';if(l.startsWith('kubectl get pods'))return 'NAME                     READY   STATUS             RESTARTS   AGE\n'+pods();if(l.startsWith('kubectl get deploy'))return 'NAME   READY   UP-TO-DATE   AVAILABLE\nweb    '+(state.fault?'0':'3')+'/'+state.replicas+'      '+state.replicas+'            '+(state.fault?0:state.replicas);if(l.startsWith('kubectl get configmaps')||l.startsWith('kubectl get cm'))return 'NAME         DATA   AGE\\napp-config   2      5m';
 if(l.startsWith('kubectl get secrets'))return 'NAME              TYPE     DATA   AGE\\napp-credentials   Opaque   2      5m';
 if(l.startsWith('kubectl get pvc'))return 'NAME         STATUS   VOLUME       CAPACITY   ACCESS MODES   STORAGECLASS\\ndata-claim   Bound    pvc-123abc   5Gi        RWO            standard';
 if(l.startsWith('kubectl get storageclass'))return 'NAME       PROVISIONER       RECLAIMPOLICY   VOLUMEBINDINGMODE\\nstandard   csi.example.cloud Delete          WaitForFirstConsumer';
 if(l.startsWith('kubectl get endpointslices'))return 'NAME      ADDRESSTYPE   PORTS   ENDPOINTS\\nweb-abc   IPv4          80      10.244.1.8,10.244.2.9';
 if(l.startsWith('kubectl get hpa'))return 'NAME   REFERENCE       TARGETS   MINPODS   MAXPODS   REPLICAS\\nweb    Deployment/web  35%/70%  2         8         3';
 if(l.startsWith('kubectl get ingress'))return 'NAME   CLASS   HOSTS              ADDRESS\\nweb    nginx   app.example.test   203.0.113.10';
 if(l.startsWith('kubectl create configmap'))return 'configmap/app-config created (simulated)';
 if(l.startsWith('kubectl create secret'))return 'secret/app-credentials created (simulated)';
 if(l.startsWith('kubectl get svc')||l.startsWith('kubectl get services'))return 'NAME         TYPE        CLUSTER-IP     PORT(S)\nkubernetes   ClusterIP   10.96.0.1      443/TCP\nweb          ClusterIP   10.96.10.20    80/TCP';if(l.startsWith('kubectl get ns')||l.startsWith('kubectl get namespaces'))return 'NAME              STATUS\ndefault           Active\nkube-system       Active\nkube-public       Active\ntraining          Active';if(l.startsWith('kubectl get events'))return state.fault?'LAST SEEN   TYPE      REASON             MESSAGE\n1m          Warning   '+state.fault+'    Simulated training event':'No recent events.';if(l.startsWith('kubectl describe pod'))return 'Name: web-7d9f\nNamespace: '+state.namespace+'\nStatus: '+(state.fault||'Running')+'\nNode: worker-1\nEvents: '+(state.fault||'Started container nginx');if(l.startsWith('kubectl logs'))return state.fault==='crash'?'FATAL: simulated application startup failure':'INFO Starting nginx\nINFO Listening on port 80';if(l.startsWith('kubectl apply'))return 'deployment.apps/web configured (simulated)\nNote: this mock does not parse or submit real Kubernetes YAML.';if(l.startsWith('kubectl scale')){let m=l.match(/--replicas=(\d+)/);if(m){state.replicas=Math.max(0,Math.min(20,+m[1]));renderState();return `deployment.apps/web scaled\nReplicas: ${state.replicas} (simulated)`;}}if(l.startsWith('kubectl delete pod'))return 'pod deleted (simulated). A Deployment controller would recreate it.';if(l.startsWith('kubectl rollout status'))return state.fault?'Waiting for deployment "web" rollout to finish: '+state.fault:'deployment "web" successfully rolled out';if(l==='kubectl get all')return 'PODS:\n'+pods()+'\n\nDEPLOYMENT web replicas='+state.replicas+'\nSERVICE web ClusterIP 10.96.10.20';
 if(l==='helm version')return 'version.BuildInfo{Version:"v3.16.0", GitCommit:"training-sim"}';if(l.startsWith('helm list'))return 'NAME       NAMESPACE  REVISION  STATUS    CHART\nweb-stack  default    3         deployed  web-1.2.0';if(l.startsWith('helm status'))return 'NAME: web-stack\nSTATUS: deployed\nREVISION: 3\nRESOURCES: Deployment/web, Service/web';if(l.startsWith('helm history'))return 'REVISION  STATUS      CHART\n1         superseded  web-1.0.0\n2         superseded  web-1.1.0\n3         deployed    web-1.2.0';if(l.startsWith('helm rollback'))return 'Rollback completed in training simulation. New release revision created.';
 if(l.startsWith('sim fault')){let f=l.split(/\s+/)[2];state.fault=f==='imagepull'?'ImagePullBackOff':f==='pending'?'Pending':f==='crashloop'?'CrashLoopBackOff':f==='node'?'NodeNotReady':'';if(f==='node')state.nodeReady=false;renderState();return 'Scenario enabled: '+state.fault+' (simulated).'}if(l==='sim reset'){initial();return 'Simulation reset. Training cluster restored.'}
 if(l.startsWith('echo '))return c.slice(5);return `Error: command not supported in this training simulator.\nType help for available commands.`;
}
function run(c){let result=execute(c);if(result==='__CLEAR__'){screen.textContent='Terminal cleared.\nstudent@kubemindai:~$ ';return}screen.textContent+=`\nstudent@kubemindai:~$ ${c}\n${result}\nstudent@kubemindai:~$ `;screen.scrollTop=screen.scrollHeight;}
$('#command-form').addEventListener('submit',e=>{e.preventDefault();run(input.value.trim());input.value='';input.focus()});$$('[data-command]').forEach(b=>b.addEventListener('click',()=>run(b.dataset.command)));$('#help').addEventListener('click',()=>run('help'));$('#clear').addEventListener('click',()=>{screen.textContent='Terminal cleared.\nstudent@kubemindai:~$ '});$('#reset').addEventListener('click',()=>{initial();screen.textContent='Training session reset.\nstudent@kubemindai:~$ '});$$('[data-fault]').forEach(b=>b.addEventListener('click',()=>run(b.dataset.fault==='none'?'sim reset':'sim fault '+(b.dataset.fault==='crash'?'crashloop':b.dataset.fault))));
const questions=[
['What component exposes the Kubernetes API?',['kubelet','kube-apiserver','kube-proxy','CoreDNS'],1,'The API server is the front door for Kubernetes API operations.'],
['Where is cluster API state durably stored in a standard control plane?',['etcd','containerd','CoreDNS','kubelet'],0,'etcd is the consistent key-value store used by the API server.'],
['Which component binds unscheduled Pods to nodes?',['Deployment controller','kubelet','kube-scheduler','CoreDNS'],2,'The scheduler filters and scores nodes, then binds Pods.'],
['Which controller creates a ReplicaSet for a Deployment?',['ReplicaSet controller','Deployment controller','Job controller','EndpointSlice controller'],1,'The Deployment controller manages ReplicaSets and rollout revisions.'],
['A successful kubectl apply guarantees all Pods are Ready.',['True','False'],1,'Apply acceptance is separate from asynchronous reconciliation and readiness.'],
['What does a Service selector match?',['Node labels','Pod labels','PVC names','Container image tags'],1,'A Service selects Pods using matching labels.'],
['What is the primary purpose of a ConfigMap?',['Store non-confidential configuration','Encrypt etcd','Schedule Pods','Create storage volumes'],0,'ConfigMaps provide configuration data to workloads.'],
['Base64-encoding a Kubernetes Secret makes it encrypted.',['True','False'],1,'Base64 is encoding, not encryption; protect Secrets with RBAC and encryption at rest.'],
['Which object requests persistent storage for a Pod?',['StorageClass','PersistentVolumeClaim','EndpointSlice','Ingress'],1,'A PVC is a namespaced request for storage.'],
['Which workload provides stable Pod identities and ordered deployment?',['Deployment','DaemonSet','StatefulSet','CronJob'],2,'StatefulSets provide stable ordinals, network identity and storage association.'],
['Which probe controls whether a Pod is eligible for Service traffic?',['Liveness','Readiness','Startup','Exec'],1,'Readiness status is used when determining eligible Service endpoints.'],
['What happens when a container exceeds its memory limit?',['CPU throttling only','The node always reboots','It may be OOM-killed','The Service is deleted'],2,'A container can be terminated by the kernel due to memory limit enforcement.'],
['Which component resolves Kubernetes Service DNS names?',['CoreDNS','etcd','kube-scheduler','CRI'],0,'CoreDNS commonly serves cluster DNS queries.'],
['What does a RoleBinding do?',['Defines a Pod template','Grants a role to subjects in a namespace','Creates a cluster node','Stores credentials'],1,'RoleBinding grants permissions in a namespace; ClusterRoleBinding grants cluster-wide scope.'],
['What is a DaemonSet commonly used for?',['One node-level Pod per eligible node','One Pod per HTTP request','Scheduled batch execution','Ingress routing'],0,'DaemonSets are used for agents such as logging, monitoring and networking components.'],
['A Pod is Pending. Which first diagnostic is most useful?',['kubectl logs','kubectl describe pod','helm list','docker images'],1,'Describe shows scheduling conditions and recent events.'],
['What does helm template do?',['Deletes a release','Renders chart templates locally','Joins a node','Creates a PVC'],1,'helm template renders manifests without installing them.'],
['What is a canary deployment?',['Replace every node OS','Expose a small portion of traffic to a new version','Encrypt Secrets','Disable readiness probes'],1,'Canary releases validate a candidate on a limited cohort before wider promotion.'],
['In EKS, who operates the Kubernetes control plane?',['Each application team','AWS as the managed service provider','The kubelet','ECR'],1,'Amazon EKS operates the managed Kubernetes control plane; customers manage worker capacity and configuration.'],
['What does GitOps reconciliation compare?',['Local shell history and logs','Desired Git state and live cluster state','CPU and memory limits only','Docker layers'],1,'Argo CD compares the configured source state with live Kubernetes resources.']
];
const hints=[
'Think about the component that receives and validates Kubernetes API requests.',
'The standard control-plane key-value store is the source of durable API object state.',
'The scheduling component chooses a node for each unscheduled Pod.',
'The Deployment controller manages rollout revisions through ReplicaSets.',
'Separate API acceptance from asynchronous controllers and node agents.',
'A Service selector is matched against metadata on backend workload objects.',
'Choose the object intended for ordinary application settings rather than credentials.',
'Encoding and encryption are different security properties.',
'A claim is the workload-facing request for persistent storage.',
'Stable ordinals and persistent identity point to the stateful workload controller.',
'Traffic eligibility depends on whether the application is ready to serve requests.',
'Memory limits can cause a process to be terminated by the kernel.',
'Cluster DNS is commonly implemented by CoreDNS.',
'A namespaced binding associates a role with a user or ServiceAccount.',
'Node-level agents need a workload controller that covers eligible nodes.',
'Pod events and conditions explain why a Pod cannot be scheduled or started.',
'Helm template renders manifests without applying them to a cluster.',
'Canary means deliberately limiting exposure of a new version.',
'Amazon operates the managed control plane for EKS.',
'GitOps compares desired source state with live cluster state.'
];
function renderQuiz(){
 const box=$('#quiz');box.innerHTML='';
 questions.forEach((q,i)=>{
  const d=document.createElement('div');d.className='question';
  d.innerHTML=`<strong>${i+1}. ${q[0]}</strong>`+q[1].map((a,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${String.fromCharCode(65+j)}. ${a}</label>`).join('')+`<button class="sim-btn secondary" type="button" data-hint="${i}">Show hint</button><p id="hint-${i}" class="sim-help" hidden>${hints[i]}</p>`;
  box.append(d);
 });
 box.querySelectorAll('[data-hint]').forEach(b=>b.addEventListener('click',()=>{const h=$(`#hint-${b.dataset.hint}`);h.hidden=!h.hidden;b.textContent=h.hidden?'Show hint':'Hide hint';}));
}
$('#submit-quiz').addEventListener('click',()=>{let score=0,review=[];questions.forEach((q,i)=>{const v=$(`input[name="q${i}"]:checked`);if(v&&+v.value===q[2])score++;review.push(`<div class="question"><strong>${i+1}. ${v&&+v.value===q[2]?'<span class="good">Correct</span>':'<span class="bad">Review</span>'}</strong><p>${q[3]}</p></div>`)});const pct=Math.round(score/questions.length*100);localStorage.setItem('km-quiz-result',JSON.stringify({score,total:questions.length,pct,date:new Date().toISOString()}));$('#quiz-result').innerHTML=`<h3>Score: ${score}/${questions.length} (${pct}%)</h3><p>${pct>=80?'Excellent work. Review explanations to reinforce the concepts.':'Review the explanations and retry after revisiting the relevant lessons.'}</p>${review.join('')}`;renderProgress();});
$('#retry-quiz').addEventListener('click',()=>{renderQuiz();$('#quiz-result').textContent='Answers reset.'});
function renderProgress(){const p=JSON.parse(localStorage.getItem('km-progress')||'{}'),days=Object.keys(p).filter(k=>p[k]).length;$('#progress-text').textContent=`${days} of 21 lessons marked complete in this browser.`;$('#progress-list').innerHTML=Array.from({length:21},(_,i)=>`<span style="padding:5px 8px;border-radius:6px;background:${p[i]?'#075b46':'#1e334e'}">${p[i]?'✓':'○'} Day ${String(i).padStart(2,'0')}</span>`).join('');const q=JSON.parse(localStorage.getItem('km-quiz-result')||'null');$('#score-summary').textContent=q?`Latest assessment: ${q.score}/${q.total} (${q.pct}%) · ${new Date(q.date).toLocaleString()}`:'No assessment submitted yet.';}
function $$(s){return [...document.querySelectorAll(s)]}renderQuiz();renderState();renderProgress();
})();
