# Day 17 – Deployment Strategies

Use a test Deployment:

```bash
kubectl get deployment frontend
kubectl rollout history deployment/frontend
kubectl set image deployment/frontend nginx=nginx:1.28
kubectl rollout status deployment/frontend
kubectl rollout undo deployment/frontend
```

Explain rolling, recreate, canary and blue-green strategies. Canary and blue-green need traffic routing or multiple workload versions; a simple Deployment alone does not implement a complete canary system.
