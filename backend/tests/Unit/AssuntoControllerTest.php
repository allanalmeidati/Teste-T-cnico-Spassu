<?php

namespace Tests\Feature;

use App\Models\Assunto;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AssuntoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testListarAssuntos()
    {
        $assunto1 = Assunto::create(['Descricao' => 'Assunto 1']);
        $assunto2 = Assunto::create(['Descricao' => 'Assunto 2']);

        $response = $this->get('/api/assunto');

        $response->assertStatus(200);
        $response->assertJson([$assunto1->toArray(), $assunto2->toArray()]);
    }

    public function testCriarAssunto()
    {
        $data = ['Descricao' => 'Novo Assunto'];

        $response = $this->post('/api/assunto', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('Assunto', $data);
    }

    public function testRecuperarAssunto()
    {
        $assunto = Assunto::create(['Descricao' => 'Assunto Teste']);

        $response = $this->get("/api/assunto/{$assunto->id}");

        $response->assertStatus(200);
        $response->assertJson(['assunto' => $assunto->toArray()]);
    }

    public function testeAtualiarAssunto()
    {
        $assunto = Assunto::create(['Descricao' => 'Assunto Original']);
        $data = ['Descricao' => 'Assunto Atualizado'];

        $response = $this->put("/api/assunto/{$assunto->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('assuntos', $data);
    }

    public function testExcluirAssunto()
    {
        $assunto = Assunto::create(['Descricao' => 'Assunto Para Exclusão']);

        $response = $this->delete("/api/assunto/{$assunto->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('assuntos', ['id' => $assunto->id]);
    }
}
