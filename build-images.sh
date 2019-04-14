#!/bin/sh

echo "Building api-gateway..."
docker build -f api-gateway/Dockerfile -t api-gateway .

echo "Building user-service..."
docker build -f user-service/Dockerfile -t user-service .

echo "Building subscription-service..."
docker build -f subscription-service/Dockerfile -t subscription-service .

echo "Building content-service..."
docker build -f content-service/Dockerfile -t content-service .