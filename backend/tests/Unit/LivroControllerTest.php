<?php

namespace Tests\Feature;

use App\Models\Livro;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LivroControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testListarLivros()
    {
        $livro1 = Livro::create(['Titulo' => 'Livro 1']);
        $livro2 = Livro::create(['Titulo' => 'Livro 2']);

        $response = $this->get('/api/livro');

        $response->assertStatus(200);
        $response->assertJson([$livro1->toArray(), $livro2->toArray()]);
    }

    public function testCriarLivro()
    {
        $data = [
            'Titulo' => 'Novo Livro',
            'Autor' => [['value' => 1], ['value' => 2]],
            'Assunto' => [['value' => 3], ['value' => 4]]
        ];

        $response = $this->post('/api/livro', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('Livros', ['Titulo' => 'Novo Livro']);
        $this->assertDatabaseHas('autor_livro', ['livro_id' => 1, 'autor_id' => 1]);
        $this->assertDatabaseHas('autor_livro', ['livro_id' => 1, 'autor_id' => 2]);
        $this->assertDatabaseHas('assunto_livro', ['livro_id' => 1, 'assunto_id' => 3]);
        $this->assertDatabaseHas('assunto_livro', ['livro_id' => 1, 'assunto_id' => 4]);
    }

    public function testRecuperarLivro()
    {
        $livro = Livro::create(['Titulo' => 'Livro Teste']);
        $livro->autores()->attach([1, 2]);
        $livro->assuntos()->attach([3, 4]);

        $response = $this->get("/api/livro/{$livro->id}");

        $response->assertStatus(200);
        $response->assertJson(['livro' => $livro->toArray()]);
    }

    public function testAtualizarLivro()
    {
        $livro = Livro::create(['Titulo' => 'Livro Original']);
        $livro->autores()->attach([1, 2]);
        $livro->assuntos()->attach([3, 4]);

        $data = [
            'Titulo' => 'Livro Atualizado',
            'Autor' => [['value' => 5], ['value' => 6]],
            'Assunto' => [['value' => 7], ['value' => 8]]
        ];

        $response = $this->put("/api/livro/{$livro->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('Livros', ['Titulo' => 'Livro Atualizado']);
        $this->assertDatabaseMissing('autor_livro', ['livro_id' => $livro->id, 'autor_id' => 1]);
        $this->assertDatabaseMissing('autor_livro', ['livro_id' => $livro->id, 'autor_id' => 2]);
        $this->assertDatabaseHas('autor_livro', ['livro_id' => $livro->id, 'autor_id' => 5]);
        $this->assertDatabaseHas('autor_livro', ['livro_id' => $livro->id, 'autor_id' => 6]);
        $this->assertDatabaseMissing('assunto_livro', ['livro_id' => $livro->id, 'assunto_id' => 3]);
        $this->assertDatabaseMissing('assunto_livro', ['livro_id' => $livro->id, 'assunto_id' => 4]);
        $this->assertDatabaseHas('assunto_livro', ['livro_id' => $livro->id, 'assunto_id' => 7]);
        $this->assertDatabaseHas('assunto_livro', ['livro_id' => $livro->id, 'assunto_id' => 8]);
    }

    public function testExcluirLivro()
    {
        $livro = Livro::create(['Titulo' => 'Livro Para Exclusão']);
        $livro->autores()->attach([1, 2]);
        $livro->assuntos()->attach([3, 4]);

        $response = $this->delete("/api/livro/{$livro->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('Livros', ['id' => $livro->id]);
        $this->assertDatabaseMissing('autor_livro', ['livro_id' => $livro->id]);
        $this->assertDatabaseMissing('assunto_livro', ['livro_id' => $livro->id]);
    }
}
