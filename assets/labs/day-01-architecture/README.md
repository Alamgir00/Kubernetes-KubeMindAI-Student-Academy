# Day 1 – Kubernetes Architecture

## Objective
Understand the control plane, worker nodes and reconciliation.

## Real AWS lab
Run on your Ubuntu EC2 training instance:

```bash
kubectl cluster-info
kubectl get nodes -o wide
kubectl get pods -A
kubectl get componentstatuses
```

Note: componentstatuses is deprecated and may not provide useful results on modern clusters.

## Investigation
```bash
kubectl get pods -n kube-system
kubectl describe node kubemindai-control-plane
```

## Explain
Describe how the API server, scheduler, controllers, kubelet and container runtime work together.
