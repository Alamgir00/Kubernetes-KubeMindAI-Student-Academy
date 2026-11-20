# Day 5 – Services and Service Discovery

Apply the Day 4 Deployment first.

```bash
kubectl apply -f service.yaml
kubectl get services
kubectl get endpointslices
kubectl describe service frontend
```

Test DNS from a temporary client:
```bash
kubectl run client --image=busybox:1.36 -it --rm --restart=Never -- nslookup frontend
```

Break the Service selector and inspect its EndpointSlices. Restore the selector and verify that endpoints return.
