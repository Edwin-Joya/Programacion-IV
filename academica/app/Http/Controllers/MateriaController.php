<?php
namespace App\Http\Controllers;
use App\Models\Materia;
use Illuminate\Http\Request;

class MateriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //select * from materias
        return Materia::get();
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
        //insert into materias values...
        Materia::create($request->all());
        return response()->json(['msg'=>'ok']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Materia  $materia
     * @return \Illuminate\Http\Response
     */
    public function show(Materia $materia)
    {
        //select * from materias where idMateria=?
        return $materia;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Materia  $materia
     * @return \Illuminate\Http\Response
     */
    public function edit(Materia $materia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Materia  $materia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Materia $materia)
    {
        //update materias set ... where id=? X
        //update materias set ... where idMateria=? 
        //$materia->update($request->all());
        $materia::where('idMateria', $request['idMateria'])->update([
            'codigo'=>$request['codigo'],
            'nombre'=>$request['nombre'],
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Materia  $materia
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Materia $materia)
    {
        //delete from materias where id=? X
        //delete from materias where idMateria=? 
        //$materia->delete();
        $materia::where('idMateria', $request['idMateria'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
