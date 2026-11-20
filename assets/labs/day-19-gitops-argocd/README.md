# Day 19 – GitOps and Argo CD

Install Argo CD using its official installation instructions in the training cluster.

```bash
kubectl get pods -n argocd
kubectl get applications -n argocd
```

Connect an approved training Git repository and create an Application resource.

Introduce controlled drift by changing a training resource outside Git. Observe application status, then reconcile the declared Git state.

Explain desired state, reconciliation, drift and sync.
