<?php

namespace Tests\Feature;

use App\Models\Assunto;
use App\Models\Autor;
use App\Models\Livro;
use Faker\Factory as FakerFactory;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class LivroControllerTest extends TestCase
{
    use DatabaseTransactions;

    private $faker;

    public function setUp(): void
    {
        parent::setUp();

        $this->faker = FakerFactory::create();
        $this->assunto1 = Assunto::create(['Descricao' => substr($this->faker->name, 0, 10)]);
        $this->assunto2 = Assunto::create(['Descricao' => substr($this->faker->name, 0, 10)]);
        $this->autor1 = Autor::create(['Nome' => $this->faker->name]);
        $this->autor2 = Autor::create(['Nome' => $this->faker->name]);

    }
    public function testListarLivros()
    {
       $livro = Livro::create([
            "Titulo" => substr($this->faker->name, 0, 10),
            "Editora" =>substr($this->faker->name, 0, 10),
            "Edicao" => 1,
            "AnoPublicacao" => 2022,
            "Valor" => 1.4,
        ]);
        $autoresIds = [$this->autor1->CodAu, $this->autor2->CodAu];
        $assuntosIds = [$this->assunto1->CodAs, $this->assunto2->CodAs];

        $livro->autores()->attach($autoresIds);
        $livro->assuntos()->attach($assuntosIds);

        $response = $this->get('/api/livro');

        $response->assertStatus(200);
    }

    public function testCriarLivro()
    {
        $dadosLivro = [
            "Titulo" => substr($this->faker->name, 0, 10),
            "Editora" =>substr($this->faker->name, 0, 10),
            "Edicao" => 1,
            "AnoPublicacao" => 2022,
            "Valor" => 1.4,
            "Assunto" => [
                [
                    "value" => $this->assunto1->CodAs,
                ],
                [
                    "value" => $this->assunto2->CodAs,
                ]
            ],
            "Autor" => [
                [
                    "value" => $this->autor1->CodAu,
                ],
                [
                    "value" =>  $this->autor2->CodAu,
                ]
            ]
        ];

        $response = $this->json('POST', '/api/livro', $dadosLivro);
        $response->assertStatus(200);
    }

    public function testRecuperarLivro()
    {
        $livro = Livro::create([
            "Titulo" => substr($this->faker->name, 0, 10),
            "Editora" =>substr($this->faker->name, 0, 10),
            "Edicao" => 1,
            "AnoPublicacao" => 2022,
            "Valor" => 1.4,
        ]);
        $autoresIds = [$this->autor1->CodAu, $this->autor2->CodAu];
        $assuntosIds = [$this->assunto1->CodAs, $this->assunto2->CodAs];

        $livro->autores()->attach($autoresIds);
        $livro->assuntos()->attach($assuntosIds);

        $response = $this->get("/api/livro/{$livro->CodL}");

        $response->assertStatus(200);
        $response->assertJson(['livro' => $livro->toArray()]);
    }

    public function testAtualizarLivro()
    {
        $livro = Livro::create([
            "Titulo" => substr($this->faker->name, 0, 10),
            "Editora" =>substr($this->faker->name, 0, 10),
            "Edicao" => 1,
            "AnoPublicacao" => 2022,
            "Valor" => 1.4,
        ]);
        $autoresIds = [$this->autor1->CodAu, $this->autor2->CodAu];
        $assuntosIds = [$this->assunto1->CodAs, $this->assunto2->CodAs];

        $livro->autores()->attach($autoresIds);
        $livro->assuntos()->attach($assuntosIds);

        $data = [
            "Titulo" => substr($this->faker->name, 0, 10),
            "Editora" =>substr($this->faker->name, 0, 10),
            "Edicao" => 2,
            "AnoPublicacao" => 2023,
            "Valor" => 1.8,
        ];

        $response = $this->put("/api/livro/{$livro->CodL}", $data);

        $response->assertStatus(200);
    }

    public function testExcluirLivro()
    {
        $livro = Livro::create([
            "Titulo" => substr($this->faker->name, 0, 10),
            "Editora" =>substr($this->faker->name, 0, 10),
            "Edicao" => 1,
            "AnoPublicacao" => 2022,
            "Valor" => 1.4,
        ]);
        $autoresIds = [$this->autor1->CodAu, $this->autor2->CodAu];
        $assuntosIds = [$this->assunto1->CodAs, $this->assunto2->CodAs];

        $livro->autores()->attach($autoresIds);
        $livro->assuntos()->attach($assuntosIds);

        $response = $this->delete("/api/livro/{$livro->CodL}");

        $response->assertStatus(200);
    }
}
