#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Generate application key if not exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env 2>/dev/null || echo "APP_KEY=base64:BYtHTrpNErQuPFlMADffXKbCe1HW05cErOCOhzeqIYs=" > .env
    echo "APP_ENV=local" >> .env
    echo "APP_DEBUG=true" >> .env
    echo "APP_URL=http://localhost:8000" >> .env
    echo "DB_CONNECTION=sqlite" >> .env
    echo "DB_DATABASE=/var/www/html/database/database.sqlite" >> .env
    echo "CACHE_DRIVER=file" >> .env
    echo "SESSION_DRIVER=file" >> .env
    echo "QUEUE_CONNECTION=sync" >> .env
    echo "LOG_LEVEL=debug" >> .env
fi

# Set permissions
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache
chmod 775 /var/www/html/database/database.sqlite

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Seed database if needed
echo "Seeding database..."
php artisan db:seed --force

# Start PHP development server
echo "Starting Laravel development server..."
php artisan serve --host=0.0.0.0 --port=8000
