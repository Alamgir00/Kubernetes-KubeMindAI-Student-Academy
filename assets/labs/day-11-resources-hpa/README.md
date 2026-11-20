# Day 11 – Requests, Limits and HPA

```bash
kubectl apply -f resources.yaml
kubectl describe pod -l app=resource-demo
kubectl top nodes
kubectl top pods
```

Metrics commands require a working metrics provider. HPA labs must wait until Metrics Server or another supported metrics provider is installed and reporting metrics.

Explain scheduling requests, runtime limits, CPU throttling and OOMKilled.
