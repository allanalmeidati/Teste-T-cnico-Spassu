<?php

namespace Tests\Feature;

use App\Models\Assunto;
use Faker\Factory as FakerFactory;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

class AssuntoControllerTest extends TestCase
{
    use DatabaseTransactions;

    private $faker;

    public function setUp(): void
    {
        parent::setUp();

        $this->faker = FakerFactory::create();
    }

    public function testListarAssuntos()
    {
        $assunto1 = Assunto::create(['Descricao' => substr($this->faker->name, 0, 10)]);
        $assunto2 = Assunto::create(['Descricao' => substr($this->faker->name, 0, 10)]);

        $response = $this->get('/api/assunto');

        $response->assertStatus(Response::HTTP_OK);

        $response->assertJsonFragment($assunto1->toArray());
        $response->assertJsonFragment($assunto2->toArray());
    }
    public function testCriarAssunto()
    {
        $data = ['Descricao' => substr($this->faker->name, 0, 10)];

        $response = $this->post('/api/assunto', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('Assunto', $data);
    }

    public function testRecuperarAssunto()
    {
        $autor = Assunto::create(['Descricao' => substr($this->faker->name, 0, 10)]);

        $response = $this->get("/api/assunto/{$autor->CodAs}");

        $response->assertStatus(200);
        $response->assertJson(['assunto' => $autor->toArray()]);
    }

    public function testAtualizarAssunto()
    {
        $assunto = Assunto::create(['Descricao' => substr($this->faker->name, 0, 10)]);

        $data = ['Descricao' => substr($this->faker->name, 0, 10)];

        $response = $this->put("/api/assunto/{$assunto->CodAs}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('assunto', $data);
    }

    public function testExcluirAssunto()
    {
        $assunto = Assunto::create(['Descricao' => substr($this->faker->name, 0, 10)]);

        $response = $this->delete("/api/assunto/{$assunto->CodAs}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('assunto', ['CodAs' => $assunto->CodAs]);
    }
}
