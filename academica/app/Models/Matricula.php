<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    use HasFactory;
    public $timestamps = false;


    protected $fillable = [
        'idMatricula',
        'nombre',
        'fecha',
        'pago',
    ];
}
