#!/bin/bash

# Zemenay Blog Docker Setup Script

echo "🚀 Setting up Zemenay Blog Docker Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"

# Create .env.local for frontend if it doesn't exist
if [ ! -f "zemenay-blog-frontend/.env.local" ]; then
    echo "📝 Creating .env.local for frontend..."
    cp zemenay-blog-frontend/env.example zemenay-blog-frontend/.env.local
    echo "✅ Frontend environment file created"
fi

# Build and start containers
echo "🔨 Building Docker containers..."
if docker compose version >/dev/null 2>&1; then
    DC="docker compose"
else
    DC="docker-compose"
fi

$DC build

if [ $? -eq 0 ]; then
    echo "✅ Containers built successfully"
    
    echo "🚀 Starting services..."
    $DC up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ Services started successfully!"
        echo ""
        echo "🌐 Your application is now running:"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend API: http://localhost:8000"
        echo "   Admin Panel: http://localhost:8000/admin"
        echo ""
        echo "📝 Next steps:"
        echo "   1. Configure your database in zemenay-blog-backend/.env"
        echo "   2. Run migrations: $DC exec backend php artisan migrate"
        echo "   3. Create admin user: $DC exec backend php artisan tinker --execute=\"\\App\\Models\\User::create(['name' => 'Admin', 'email' => 'admin@zemenay.com', 'password' => bcrypt('password')])\""
        echo ""
        echo "🛠️  Useful commands:"
        echo "   - View logs: $DC logs -f"
        echo "   - Stop services: $DC down"
        echo "   - Restart services: $DC restart"
    else
        echo "❌ Failed to start services"
        exit 1
    fi
else
    echo "❌ Failed to build containers"
    exit 1
fi 