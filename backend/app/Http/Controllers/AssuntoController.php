<?php

namespace App\Http\Controllers;

use App\Models\Assunto;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AssuntoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return Assunto::with('livros')->get();
        } catch (\Exception $e) {
            return response()->json(['error' => 'ocorreu um erro'], 500);
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
            return Assunto::create($request->only('Descricao'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'ocorreu um erro'], 500);
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
            $assunto = Assunto::findOrFail($id);
            return response()->json(['assunto' => $assunto]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Assunto não encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'ocorreu um erro'], 500);
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
            $assunto = Assunto::findOrFail($id);
            $assunto->update($request->only('Descricao'));
            return response()->json(['message' => 'Assunto atualizado com sucesso']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Assunto não encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'ocorreu um erro'], 500);
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
            $assunto = Assunto::findOrFail($id);
            $assunto->delete();
            return response()->json(['message' => 'Assunto excluído com sucesso']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Assunto não encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'ocorreu um erro'], 500);
        }
    }
}
