# Day 10 – Health Probes

```bash
kubectl apply -f probes.yaml
kubectl get pods -w
kubectl describe pod -l app=probe-demo
```

Explain startup, readiness and liveness probes. Change a probe path to a nonexistent endpoint and inspect events. Restore the correct path.
