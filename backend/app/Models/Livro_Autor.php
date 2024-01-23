<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livro_Autor extends Model
{
    use HasFactory;

    protected $table = 'Livro_Autor';
    public $timestamps = false;

    protected $fillable = [
        'Livro_CodL',
        'Autor_CodAu',
    ];
}
