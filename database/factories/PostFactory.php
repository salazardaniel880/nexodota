<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\posts;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = posts::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            // Agrega otros campos según tu tabla
        ];
    }
}

