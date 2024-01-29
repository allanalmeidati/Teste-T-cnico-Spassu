<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LivroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return Livro::with('assuntos', 'autores')->get();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $livro = Livro::create($request->except('Autor', 'Assunto'));
            $autoresIds = collect($request->get('Autor'))->pluck('value');
            $assuntosIds = collect($request->get('Assunto'))->pluck('value');

            $livro->autores()->attach($autoresIds);
            $livro->assuntos()->attach($assuntosIds);

            DB::commit();

            return response()->json(['message' => 'Livro criado com sucesso']);
        } catch (\Exception $e) {
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Ocorreu um erro'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $livro = Livro::with('assuntos', 'autores')->findOrFail($id);
            return response()->json(['livro' => $livro]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Livro não encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro'], 500);
        }
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
        try {
            DB::beginTransaction();

            $livro = Livro::findOrFail($id);

            $livro->update($request->except('Autor', 'Assunto'));
            $autoresIds = collect($request->get('Autor'))->pluck('value');
            $assuntosIds = collect($request->get('Assunto'))->pluck('value');

            $livro->autores()->detach();
            $livro->autores()->sync($autoresIds);

            $livro->assuntos()->detach();
            $livro->assuntos()->sync($assuntosIds);

            DB::commit();

            return response()->json(['message' => 'Livro atualizado com sucesso']);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['message' => 'Livro não encontrado'], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Ocorreu um erro'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $livro = Livro::findOrFail($id);
            $livro->delete();

            return response()->json(['message' => 'Livro excluído com sucesso']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Livro não encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro'], 500);
        }
    }
}
