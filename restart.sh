#!/bin/bash

if docker compose version >/dev/null 2>&1; then
    DC="docker compose"
else
    DC="docker-compose"
fi

echo "Stopping and removing existing containers..."
$DC down

echo
echo "Building and starting containers..."
$DC up --build -d

echo
echo "Waiting for services to start..."
sleep 15

echo
echo "Checking container status..."
$DC ps

echo
echo "Testing backend connectivity..."
curl -s http://localhost:8000/api/posts || echo "Backend not ready yet"

echo
echo "Testing frontend..."
curl -s http://localhost:3000 || echo "Frontend not ready yet"

echo
echo "Services should be available at:"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Admin Panel: http://localhost:8000/admin"
echo
echo "Press Enter to view logs..."
read

echo
echo "Showing logs (press Ctrl+C to exit)..."
$DC logs -f
