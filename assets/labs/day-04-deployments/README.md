# Day 4 – ReplicaSets and Deployments

## Create and inspect
```bash
kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get replicasets
kubectl get pods
```

## Scale
```bash
kubectl scale deployment frontend --replicas=5
kubectl rollout status deployment/frontend
```

## Update
```bash
kubectl set image deployment/frontend nginx=nginx:1.28
kubectl rollout history deployment/frontend
```

## Break and recover
```bash
kubectl set image deployment/frontend nginx=nginx:does-not-exist
kubectl get pods
kubectl describe deployment frontend
kubectl rollout undo deployment/frontend
kubectl rollout status deployment/frontend
```

Explain desired replicas, selectors, rolling updates and rollback.
