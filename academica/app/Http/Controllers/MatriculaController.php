<?php
namespace App\Http\Controllers;
use App\Models\Matricula;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //select * from matriculas
        return Matricula::get();
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
        //insert into matriculas values...
        Matricula::create($request->all());
        return response()->json(['msg'=>'ok']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Matricula  $matricula
     * @return \Illuminate\Http\Response
     */
    public function show(Matricula $matricula)
    {
        //select * from matriculas where idMatricula=?
        return $matricula;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Matricula  $matricula
     * @return \Illuminate\Http\Response
     */
    public function edit(Matricula $matricula)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Matricula  $matricula
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Matricula $matricula)
    {
        //update matriculas set ... where id=? X
        //update matriculas set ... where idMatricula=? 
        //$matricula->update($request->all());
        $matricula::where('idMatricula', $request['idMatricula'])->update([
            'nombre'=>$request['nombre'],
            'fecha'=>$request['fecha'],
            'pago'=>$request['pago'],
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Matricula  $matricula
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Matricula $matricula)
    {
        //delete from matriculas where id=? X
        //delete from matriculas where idMatricula=? 
        //$matricula->delete();
        $matricula::where('idMatricula', $request['idMatricula'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
