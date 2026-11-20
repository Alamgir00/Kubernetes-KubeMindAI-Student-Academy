# Day 7 – ConfigMaps and Secrets

```bash
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl get configmaps
kubectl describe configmap app-config
kubectl get secrets
```

Explain why Secrets require access control and why base64 is not encryption. Use dummy training credentials only. Never commit real secrets to Git.
