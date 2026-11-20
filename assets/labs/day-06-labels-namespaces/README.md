# Day 6 – Labels, Selectors and Namespaces

```bash
kubectl create namespace dev
kubectl create namespace test
kubectl create deployment web --image=nginx:1.27 -n dev
kubectl label deployment web tier=frontend -n dev
kubectl get pods -n dev --show-labels
kubectl get pods -A -l tier=frontend
kubectl get pods -l app=web -n dev
```

Break: query with a label that does not exist. Explain why no resources are returned.

Recover: inspect labels and correct the selector.
