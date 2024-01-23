<?php


use App\Http\Controllers\AssuntoController;
use App\Http\Controllers\AutorController;
use App\Http\Controllers\LivroController;
use Illuminate\Support\Facades\Route;

Route::resource('livro', LivroController::class);
Route::resource('assunto', AssuntoController::class);
Route::resource('autor', AutorController::class);
