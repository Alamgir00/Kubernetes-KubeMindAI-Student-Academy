# Day 13 – RBAC and Security

```bash
kubectl apply -f rbac.yaml
kubectl auth can-i list pods --as=system:serviceaccount:default:viewer
kubectl auth can-i delete pods --as=system:serviceaccount:default:viewer
```

Explain authentication, authorization, Roles, ClusterRoles and least privilege. Do not use cluster-admin for student exercises.
