# Day 14 – Jobs and CronJobs

```bash
kubectl apply -f job.yaml
kubectl get jobs
kubectl get pods
kubectl logs job/date-check
kubectl apply -f cronjob.yaml
kubectl get cronjobs
```

The CronJob runs every five minutes in this exercise. Delete it when finished. Explain finite tasks versus continuously running applications.
