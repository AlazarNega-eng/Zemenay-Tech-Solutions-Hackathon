<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user for Filament
        if (!User::where('email', 'admin@zemenay.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@zemenay.com',
                'password' => Hash::make('password'),
            ]);
        }

        // Only create test user if it doesn't exist
        if (!User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }

        // Create some sample posts
        Post::factory(5)->create();
    }
}
