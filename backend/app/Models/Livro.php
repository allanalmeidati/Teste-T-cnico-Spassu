<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
    use HasFactory;
    protected $table = 'Livro';
     protected $primaryKey = 'CodL';
    public $timestamps = false;

    protected $fillable = [
        'Titulo',
        'Editora',
        'Edicao',
        'AnoPublicacao',
        'Valor',

    ];

    public function autores()
    {
        return $this->belongsToMany(Autor::class, 'Livro_Autor');
    }

    public function assuntos()
    {
        return $this->belongsToMany(Assunto::class, 'Livro_Assunto');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($livro) {
            $livro->autores()->detach();
            $livro->assuntos()->detach();
        });
    }


}
