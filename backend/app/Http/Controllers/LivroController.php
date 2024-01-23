<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;

class LivroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Livro::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $livro = Livro::create($request->except('Autor', 'Assunto'));
        $autoresIds = collect($request->get('Autor'))->pluck('value');
        $assuntosIds = collect($request->get('Assunto'))->pluck('value');
        $livro->autores()->attach($autoresIds);
        $livro->assuntos()->attach($assuntosIds);
        return $livro;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $livro = Livro::with('assuntos', 'autores')->find($id);

        if (!$livro) {
            return response()->json(['message' => 'Livro não encontrado'], 404);
        }

        return response()->json(['livro' => $livro]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $livro = Livro::findOrFail($id);
        $livro->update($request->except('Autor', 'Assunto'));
        $autoresIds = collect($request->get('Autor'))->pluck('value');
        $assuntosIds = collect($request->get('Assunto'))->pluck('value');
        $livro->autores()->detach();
        $livro->autores()->sync($autoresIds);
        $livro->assuntos()->detach();
        $livro->assuntos()->sync($assuntosIds);

        return $livro;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $livro = Livro::findOrFail($id);
        $livro->delete();

        return response()->json(['message' => 'Livro excluído com sucesso']);
    }
}
