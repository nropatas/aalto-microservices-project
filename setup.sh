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

# Microservices
kubectl apply -f namespace.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml