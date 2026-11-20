# Day 15 – Production Troubleshooting

Use a repeatable investigation process:

1. Establish impact and scope.
2. Inspect cluster and node state.
3. Inspect resource status and events.
4. Inspect current and previous logs.
5. Form an evidence-based hypothesis.
6. Apply the smallest safe remediation.
7. Verify recovery and communicate the result.

Useful commands:

```bash
kubectl get nodes
kubectl get pods -A
kubectl get events -A --sort-by=.metadata.creationTimestamp
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl logs <pod-name> --previous
kubectl describe deployment <deployment-name>
```

Submit an incident report with timeline, impact, evidence, root cause and recovery.
