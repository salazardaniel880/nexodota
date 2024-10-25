<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\posts;

class PostSeeder extends Seeder
{
    public function run()
    {
        posts::factory()->count(5)->create(); // Crea 5 registros
    }
}
