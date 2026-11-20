# Day 18 – AWS EKS

This is an optional cloud-cost lab. Review AWS pricing and obtain instructor approval before creating an EKS cluster.

Check identity:

```bash
aws --version
aws sts get-caller-identity
```

Configure kubeconfig using an approved AWS identity:

```bash
aws eks update-kubeconfig --region <region> --name <cluster-name>
kubectl get nodes
```

Explain the managed control plane, worker nodes, IAM authentication, Kubernetes RBAC and VPC networking. Never paste AWS secrets into course submissions.
