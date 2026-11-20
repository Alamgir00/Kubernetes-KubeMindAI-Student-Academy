# Day 20 – Monitoring and Capstone

Install Prometheus and Grafana using an approved training chart and the instructor's documented configuration.

```bash
kubectl get pods -A
kubectl get services -A
kubectl top nodes
kubectl top pods
helm list -A
```

Metrics commands require a working metrics provider. Prometheus and Grafana are additional components, not built-in Kubernetes services.

Capstone:
1. Deploy an application.
2. Expose it through a Service.
3. Add health checks and resource settings.
4. Introduce a controlled failure.
5. Diagnose it using events, logs and metrics.
6. Recover safely.
7. Present an incident report and architecture explanation.
