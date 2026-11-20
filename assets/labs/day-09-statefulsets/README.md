# Day 9 – StatefulSets

```bash
kubectl apply -f statefulset.yaml
kubectl get statefulsets
kubectl get pods -l app=web
kubectl get services
```

Delete one Pod and watch its replacement:

```bash
kubectl delete pod web-0
kubectl get pods -w
```

Explain stable Pod identities, ordered rollout and the role of persistent storage. This basic example does not configure persistent volumes.
