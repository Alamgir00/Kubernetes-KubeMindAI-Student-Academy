# Day 2 – Cluster Setup and kubectl

## Objective
Understand cluster access and kubeconfig contexts.

## Practice
```bash
kubectl version --client
kind version
docker ps
kubectl config get-contexts
kubectl config current-context
kubectl cluster-info
kubectl get nodes
```

## Break
Switch to a nonexistent context:
```bash
kubectl config use-context missing-context
```

## Recover
```bash
kubectl config get-contexts
kubectl config use-context kind-kubemindai
kubectl get nodes
```
The context name may differ; inspect the actual list before switching.
