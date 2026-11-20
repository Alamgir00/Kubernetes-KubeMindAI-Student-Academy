# Day 3 – Pods and Container Lifecycle

## Create
```bash
kubectl apply -f pod.yaml
kubectl get pods -o wide
kubectl describe pod nginx-lab
kubectl logs nginx-lab
```

## Break
```bash
kubectl set image pod/nginx-lab nginx=nginx:does-not-exist
kubectl describe pod nginx-lab
kubectl get events --sort-by=.metadata.creationTimestamp
```

## Recover
```bash
kubectl delete pod nginx-lab
kubectl apply -f pod.yaml
kubectl get pods -w
```

Explain Pod phase, container state, kubelet and image-pull failures.
