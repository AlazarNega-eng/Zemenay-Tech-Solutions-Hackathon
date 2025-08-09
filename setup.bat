@echo off
echo 🚀 Setting up Zemenay Blog Docker Environment...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo ✅ Docker is running

REM Create .env.local for frontend if it doesn't exist
if not exist "zemenay-blog-frontend\.env.local" (
    echo 📝 Creating .env.local for frontend...
    copy "zemenay-blog-frontend\env.example" "zemenay-blog-frontend\.env.local"
    echo ✅ Frontend environment file created
)

REM Build and start containers
echo 🔨 Building Docker containers...
docker-compose build

if %errorlevel% equ 0 (
    echo ✅ Containers built successfully
    
    echo 🚀 Starting services...
    docker-compose up -d
    
    if %errorlevel% equ 0 (
        echo ✅ Services started successfully!
        echo.
        echo 🌐 Your application is now running:
        echo    Frontend: http://localhost:3000
        echo    Backend API: http://localhost:8000
        echo    Admin Panel: http://localhost:8000/admin
        echo.
        echo 📝 Next steps:
        echo    1. Configure your database in zemenay-blog-backend\.env
        echo    2. Run migrations: docker-compose exec backend php artisan migrate
        echo    3. Create admin user: docker-compose exec backend php artisan tinker --execute="\\App\\Models\\User::create(['name' => 'Admin', 'email' => 'admin@zemenay.com', 'password' => bcrypt('password')])"
        echo.
        echo 🛠️  Useful commands:
        echo    - View logs: docker-compose logs -f
        echo    - Stop services: docker-compose down
        echo    - Restart services: docker-compose restart
    ) else (
        echo ❌ Failed to start services
        pause
        exit /b 1
    )
) else (
    echo ❌ Failed to build containers
    pause
    exit /b 1
)

pause 