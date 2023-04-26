<?php
namespace App\Http\Controllers;
use App\Models\Docente;
use Illuminate\Http\Request;

class DocenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //select * from docentes
        return Docente::get();
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
        //insert into docentes values...
        Docente::create($request->all());
        return response()->json(['msg'=>'ok']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Http\Response
     */
    public function show(Docente $docente)
    {
        //select * from docentes where idDocente=?
        return $docente;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Http\Response
     */
    public function edit(Docente $docente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Docente $docente)
    {
        //update docentes set ... where id=? X
        //update docentes set ... where idDocente=? 
        //$docente->update($request->all());
        $docente::where('idDocente', $request['idDocente'])->update([
            'codigo'=>$request['codigo'],
            'nombre'=>$request['nombre'],
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Docente $docente)
    {
        //delete from docentes where id=? X
        //delete from docentes where idDocente=? 
        //$docente->delete();
        $docente::where('idDocente', $request['idDocente'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
