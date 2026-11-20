# Day 8 – Persistent Volumes and Storage

First inspect available StorageClasses:

```bash
kubectl get storageclass
kubectl apply -f pvc.yaml
kubectl get pvc
kubectl describe pvc lab-data
```

If the claim remains Pending, investigate whether a StorageClass or provisioner exists. Do not assume the default kind cluster has dynamic storage provisioned.

Explain PV, PVC, StorageClass and reclaim policy.
