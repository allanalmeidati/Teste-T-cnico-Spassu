<?php

namespace Tests\Feature;

use App\Models\Autor;
use Illuminate\Http\Response;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Faker\Factory as FakerFactory;

class AutorControllerTest extends TestCase
{

    use DatabaseTransactions;

    private $faker;

    public function setUp(): void
    {
        parent::setUp();

        $this->faker = FakerFactory::create();
    }

    public function testListarAutores()
    {
        $autor1 = Autor::create(['Nome' => $this->faker->name]);
        $autor2 = Autor::create(['Nome' => $this->faker->name]);

        $response = $this->get('/api/autor');

        $response->assertStatus(Response::HTTP_OK);

        $response->assertJsonFragment($autor1->toArray());
        $response->assertJsonFragment($autor2->toArray());
    }
    public function testCriarAutor()
    {
        $data = ['Nome' => $this->faker->name];

        $response = $this->post('/api/autor', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('Autor', $data);
    }

    public function testRecuperarAutor()
    {
        $autor = Autor::create(['Nome' => $this->faker->name]);

        $response = $this->get("/api/autor/{$autor->CodAu}");

        $response->assertStatus(200);
        $response->assertJson(['autor' => $autor->toArray()]);
    }

    public function testAtualizarAutor()
    {
        $autor = Autor::create(['Nome' => $this->faker->name]);
        $data = ['Nome' => $this->faker->name];

        $response = $this->put("/api/autor/{$autor->CodAu}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('autor', $data);
    }

    public function testExcluirAutor()
    {
        $autor = Autor::create(['Nome' => $this->faker->name]);

        $response = $this->delete("/api/autor/{$autor->CodAu}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('autor', ['CodAu' => $autor->CodAu]);
    }


}
