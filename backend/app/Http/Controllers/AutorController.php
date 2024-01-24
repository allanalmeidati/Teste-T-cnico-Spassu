<?php

namespace Tests\Feature;

use App\Models\Autor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AutorControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testListarAutores()
    {
        $autor1 = Autor::create(['Nome' => 'Autor 1']);
        $autor2 = Autor::create(['Nome' => 'Autor 2']);

        $response = $this->get('/api/autor');

        $response->assertStatus(200);
        $response->assertJson([$autor1->toArray(), $autor2->toArray()]);
    }

    public function testCriarAutor()
    {
        $data = ['Nome' => 'Novo Autor'];

        $response = $this->post('/api/autor', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('Autores', $data);
    }

    public function testRecuperarAutor()
    {
        $autor = Autor::create(['Nome' => 'Autor Teste']);

        $response = $this->get("/api/autor/{$autor->id}");

        $response->assertStatus(200);
        $response->assertJson(['autor' => $autor->toArray()]);
    }

    public function testAtualizarAutor()
    {
        $autor = Autor::create(['Nome' => 'Autor Original']);
        $data = ['Nome' => 'Autor Atualizado'];

        $response = $this->put("/api/autor/{$autor->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('autores', $data);
    }

    public function testExcluirAutor()
    {
        $autor = Autor::create(['Nome' => 'Autor Para Exclusão']);

        $response = $this->delete("/api/autor/{$autor->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('autores', ['id' => $autor->id]);
    }
}
