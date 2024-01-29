<?php

namespace App\Http\Controllers;

use App\Models\Autor;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AutorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return Autor::with('livros')->get();
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
            return Autor::create($request->only('Nome'));
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
            $autor = Autor::findOrFail($id);
            return response()->json(['autor' => $autor]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Autor não encontrado!'], 404);
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
            $autor = Autor::findOrFail($id);
            $autor->update($request->only('Nome'));
            return response()->json(['message' => 'Autor atualizado com sucesso']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Autor não encontrado'], 404);
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
            $autor = Autor::findOrFail($id);
            $autor->delete();
            return response()->json(['message' => 'Autor excluído com sucesso']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Autor não encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'ocorreu um erro'], 500);
        }
    }
}
