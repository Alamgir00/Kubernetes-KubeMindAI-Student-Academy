# Day 16 – Helm

Install Helm using its official installation instructions for the student's operating system.

```bash
helm version
helm repo list
helm list -A
helm search repo nginx
```

After adding an approved chart repository, inspect a chart:

```bash
helm show values <chart>
helm template training <chart>
```

Install, inspect, upgrade and roll back a training release. Explain chart, values, templates and release history.
