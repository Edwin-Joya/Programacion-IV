<?php
namespace App\Http\Controllers;
use App\Models\Inscripcion;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //select * from inscripciones
        return Inscripcion::get();
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
        //insert into inscripciones values...
        Inscripcion::create($request->all());
        return response()->json(['msg'=>'ok']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Inscripcion  $inscripcion
     * @return \Illuminate\Http\Response
     */
    public function show(Inscripcion $inscripcion)
    {
        //select * from inscripciones where idInscripcion=?
        return $inscripcion;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Inscripcion  $inscripcion
     * @return \Illuminate\Http\Response
     */
    public function edit(Inscripcion $inscripcion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Inscripcion  $inscripcion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Inscripcion $inscripcion)
    {
        //update inscripciones set ... where id=? X
        //update inscripciones set ... where idInscripcion=? 
        //$inscripcion->update($request->all());
        $inscripcion::where('idInscripcion', $request['idInscripcion'])->update([
            'materia'=>$request['materia'],
            'alumno'=>$request['alumno'],
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Inscripcion  $inscripcion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Inscripcion $inscripcion)
    {
        //delete from inscripciones where id=? X
        //delete from inscripciones where idInscripcion=? 
        //$inscripcion->delete();
        $inscripcion::where('idInscripcion', $request['idInscripcion'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
