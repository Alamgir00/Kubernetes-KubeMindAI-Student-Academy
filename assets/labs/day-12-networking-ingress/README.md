# Day 12 – Networking, DNS and Ingress

Apply the Day 4 Deployment, then:

```bash
kubectl apply -f service.yaml
kubectl get services
kubectl get endpointslices
kubectl run dns-test --image=busybox:1.36 -it --rm --restart=Never -- nslookup web-service
```

Ingress requires an installed Ingress controller. NetworkPolicy requires a CNI that enforces policies. Explain these dependencies before the advanced exercises.
