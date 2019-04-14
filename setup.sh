#!/bin/sh

# Build Docker images
echo "Building Docker images..."
docker build -f api-gateway/Dockerfile -t api-gateway .
docker build -f user-service/Dockerfile -t user-service .
docker build -f subscription-service/Dockerfile -t subscription-service .
docker build -f content-service/Dockerfile -t content-service .

# Run Kubernetes
echo "Setting up Kubernetes cluster..."

# Jaeger for distributed tracing
kubectl apply -f https://raw.githubusercontent.com/jaegertracing/jaeger-kubernetes/master/all-in-one/jaeger-all-in-one-template.yml

# Consul for dynamic configuration
git clone https://github.com/hashicorp/consul-helm.git
cd consul-helm
git checkout v0.7.0
# Comment out affinity settings in values.yaml
cd ..
helm install -n consul ./consul-helm
helm upgrade consul ./consul-helm -f consul.yaml

# Microservices
kubectl apply -f namespace.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml