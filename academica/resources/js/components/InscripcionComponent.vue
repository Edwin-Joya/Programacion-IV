
<template>
    <div id="appInscripcion">
     <div class="row">
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">REGISTRO DE DOCENTE</div>
                <div class="card-body">
                    <form id="frmInscripcion" @reset.prevent="nuevoInscripcion" v-on:submit.prevent="guardarInscripcion">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">
                                <label for="txtCodigoInscripcion">CODIGO:</label>
                            </div>
                            <div class="col-3 col-md-3">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" 
                                    title="Ingrese un materia de inscripcion de 3 digitos"
                                        v-model="inscripcion.materia" type="text" class="form-control" name="txtCodigoInscripcion" id="txtCodigoInscripcion">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">
                                <label for="txtNombreInscripcion">NOMBRE:</label>
                            </div>
                            <div class="col-9 col-md-6">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                    v-model="inscripcion.alumno" type="text" class="form-control" name="txtNombreInscripcion" id="txtNombreInscripcion">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-3">
                                <input class="btn btn-primary" type="submit" 
                                    value="Guardar">
                            </div>
                            <div class="col-3 col-md-3">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">LISTADO DE INSCRIPCIONES</div>
                <div class="card-body">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>BUSCAR:</th>
                                <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                    @keyup="listar()"
                                    placeholder="Buscar por materia o alumno"></th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th colspan="2">NOMBRE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inscripcion in inscripciones" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)" >
                                <td>{{ inscripcion.materia }}</td>
                                <td>{{ inscripcion.alumno }}</td>
                                <td><button class="btn btn-danger" @click="eliminarInscripcion(inscripcion)">ELIMINAR</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
    </template>
    <script>
    import alertifyjs from 'alertifyjs';
    import axios from 'axios';
    
        export default{
            props:['form'],
            data(){
                return {
                    accion:'nuevo',
                    buscar: '',
                    inscripciones: [],
                    inscripcion:{
                        idInscripcion  : '',
                        materia    : '',
                        alumno    : '',
                    }
                }
            },
            async created() {
            await this.listar();
            },
            methods:{
                async guardarInscripcion(){
                    this.listar();
                    let method = 'POST';
                    if(this.accion==='nuevo'){
                        this.inscripcion.idInscripcion = new Date().getTime().toString(16);
                        this.inscripciones.push( JSON.parse( JSON.stringify(this.inscripcion) ) );
                        method = 'POST';
                    }else if(this.accion==='modificar'){
                        let index = this.inscripciones.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                        this.inscripciones[index] = JSON.parse( JSON.stringify(this.inscripcion) );
                        method='PUT';
                    }else if(this.accion==='eliminar'){
                        let index = this.inscripciones.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                        this.inscripciones.splice(index,1);
                        method = 'DELETE';
                    }
                    localStorage.setItem("inscripciones", JSON.stringify(this.inscripciones) );
                    await axios({
                        url:'/inscripciones',
                        method,
                        data: this.inscripcion
                    }).then(resp=>{
                        if( resp.data.msg=='ok' ){
                            let msg = method=='DELETE' ? 'Inscripcion eliminado con exito' : 'Inscripcion registrado con exito.';
                            alertifyjs.success(msg);
                        }else{
                            alertifyjs.error('El registro del inscripcion fallo, por favor revise');
                        }
                        console.log('exito', resp);
                    }).catch(err=>{
                        console.log('error', err);
                    });
                    this.nuevoInscripcion();
                },
                eliminarInscripcion(inscripcion){
                    if( confirm(`Esta seguro de eliminar a ${inscripcion.alumno}?`) ){
                        this.accion='eliminar';
                        this.inscripcion=inscripcion;
                        this.guardarInscripcion();
                    }
                },
                nuevoInscripcion(){
                    this.accion = 'nuevo';
                    this.inscripcion.idInscripcion = '';
                    this.inscripcion.materia = '';
                    this.inscripcion.alumno = '';
                },
                modificarInscripcion(inscripcion){
                    this.accion = 'modificar';
                    this.inscripcion = inscripcion;
                },
                async listar() {
                try {
                 const response = await axios.get('/inscripciones');
                 this.inscripciones = response.data.filter(inscripcion => inscripcion.materia.toLowerCase().indexOf(this.buscar.toLowerCase())>-1||
                    inscripcion.alumno.indexOf(this.buscar)>-1);
                } catch (error) {
                 console.error(error);
                }
              }
            }
        }
    </script>