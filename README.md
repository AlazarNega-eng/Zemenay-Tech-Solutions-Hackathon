# Zemenay Tech Blog - Hackathon Submission

## 🚀 One-Command Installation & Launch

This project is fully containerized using Docker. No need to install PHP, Node, or Composer on your local machine.

**Prerequisites:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Quick Start (Windows):
1. **Run the setup script:**
   ```cmd
   setup.bat
   ```

### Quick Start (Linux/Mac):
1. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

### Manual Setup:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd zemenay-hackathon
   ```

2. **Configure Environment:**
   - Navigate to `zemenay-blog-backend` and copy `.env.example` to `.env`.
   - Fill in your Supabase database credentials in the `zemenay-blog-backend/.env` file.
   - In `zemenay-blog-frontend`, copy `env.example` to `.env.local`:
     ```bash
     cp zemenay-blog-frontend/env.example zemenay-blog-frontend/.env.local
     ```

3. **Start Services:**
   From the root `zemenay-hackathon` directory, run:
   ```bash
   docker-compose up -d
   ```

4. **Database Migration & Setup:**
   Run the database migrations and create a default admin user inside the container:
   ```bash
   docker-compose exec backend php artisan migrate
   docker-compose exec backend php artisan tinker --execute="\\App\\Models\\User::create(['name' => 'Admin', 'email' => 'admin@zemenay.com', 'password' => bcrypt('password')])"
   ```

**That's it!**
- Frontend is running at: [http://localhost:3000](http://localhost:3000)
- Backend API is running at: [http://localhost:8000](http://localhost:8000)
- Admin Panel is at: [http://localhost:8000/admin](http://localhost:8000/admin)
  - **Login:** `admin@zemenay.com`
  - **Password:** `password`

## 🛠️ Development Commands

### Start all services:
```bash
docker-compose up -d
```

### Stop all services:
```bash
docker-compose down
```

### View logs:
```bash
docker-compose logs -f
```

### Access backend container:
```bash
docker-compose exec backend bash
```

### Access frontend container:
```bash
docker-compose exec frontend sh
```

### Run Laravel commands:
```bash
docker-compose exec backend php artisan [command]
```

### Run Next.js commands:
```bash
docker-compose exec frontend npm [command]
```

## 📁 Project Structure

```
zemenay-hackathon/
├── zemenay-blog-backend/   # Laravel API with Filament Admin
│   ├── app/
│   ├── public/
│   ├── docker/
│   │   └── nginx.conf
│   └── Dockerfile
├── zemenay-blog-frontend/  # Next.js Frontend
│   ├── src/
│   ├── public/
│   └── Dockerfile
├── docker-compose.yml      # Main orchestration file
├── setup.sh               # Linux/Mac setup script
└── setup.bat              # Windows setup script
```

## 🔧 Services

- **Backend (Laravel)**: PHP 8.2 CLI with Laravel's built-in server on port 8000
- **Frontend (Next.js)**: React application running on port 3000

## 🚀 Features

- **Modern Tech Stack**: Laravel 12 + Next.js 15 + TypeScript
- **Admin Panel**: Filament Admin for content management
- **Responsive Design**: Tailwind CSS with dark/light themes
- **Containerized**: Easy deployment with Docker
- **API-First**: RESTful API for frontend consumption

## 📝 Environment Variables

### Backend (.env)
```env
APP_NAME=ZemenayBlog
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=your-supabase-host
DB_PORT=5432
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🐛 Troubleshooting

### Network Issues During Build:
The current setup uses volume mounts and pre-built images to avoid network issues during build.

### Port conflicts:
If ports 3000 or 8000 are already in use, modify the ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change 3000 to 3001
```

### Permission issues:
```bash
docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache
```

### Database connection issues:
Ensure your Supabase credentials are correctly set in the backend `.env` file.

### TypeScript/ESLint errors:
The frontend is configured to run in development mode to avoid build-time linting issues.

## 📄 License

This project is part of the Zemenay Tech Solutions Hackathon submission. 