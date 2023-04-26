<template>
    <div id="appMatricula">
    <div class="row">
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">REGISTRO DE MATRICULA</div>
                <div class="card-body">
                    <form id="frmMatricula" @reset.prevent="nuevoMatricula" v-on:submit.prevent="guardarMatricula">
                        <div class="row p-1">
                            <div class="col-3 col-md-2">
                                <label for="txtNombreMatricula">NOMBRE:</label>
                            </div>
                            <div class="col-9 col-md-6">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                    v-model="matricula.nombre" type="text" class="form-control" name="txtNombreMatricula" id="txtNombreMatricula">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">
                                <label>FECHA:</label>
                            </div>
                            <div class="col-9 col-md-3">
                                <input required v-model="matricula.fecha" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">
                                <label for="txtPagoMatricula">ACTUALIZAR PAGO:</label>
                            </div>
                            <div class="col-9 col-md-3">
                                <input v-model="matricula.pago" type="checkbox" class="form-check-input" id="txtPagoMatricula">
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
                <div class="card-header">LISTADO DE MATRICULAS</div>
                <div class="card-body">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>BUSCAR:</th>
                                <th colspan="3"><input type="text" class="form-control" v-model="buscar"
                                    @keyup="listar()"
                                    placeholder="Buscar por codigo o nombre"></th>
                            </tr>
                            <tr>
                                <th>FECHA</th>
                                <th>PAGO</th>
                                <th colspan="2">ALUMNO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)" >
                                <td>{{ new Date(matricula.fecha +' 01:00:00').toLocaleDateString() }}</td>
                                <td>{{ matricula.pago ? 'ACTUALIZADO' : 'PENDIENTE' }}</td>
                                <td>{{ matricula.nombre }}</td>
                                <td><button class="btn btn-danger" @click="eliminarMatricula(matricula)">ELIMINAR</button></td>
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
                matriculas: [],
                matricula:{
                    idMatricula  : '',
                    nombre    : '',
                    fecha    : '',
                    pago    : '',
                }
            }
        },
        async created() {
        await this.listar();
        },
        methods:{
            async guardarMatricula(){
                this.listar();
                let method = 'POST';
                if(this.accion==='nuevo'){
                    this.matricula.idMatricula = new Date().getTime().toString(16);
                    this.matriculas.push( JSON.parse( JSON.stringify(this.matricula) ) );
                    method = 'POST';
                }else if(this.accion==='modificar'){
                    let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                    this.matriculas[index] = JSON.parse( JSON.stringify(this.matricula) );
                    method='PUT';
                }else if(this.accion==='eliminar'){
                    let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                    this.matriculas.splice(index,1);
                    method = 'DELETE';
                }
                localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
                await axios({
                    url:'/matriculas',
                    method,
                    data: this.matricula
                }).then(resp=>{
                    if( resp.data.msg=='ok' ){
                        let msg = method=='DELETE' ? 'Matricula eliminado con exito' : 'Matricula registrado con exito.';
                        alertifyjs.success(msg);
                    }else{
                        alertifyjs.error('El registro del matricula fallo, por favor revise');
                    }
                    console.log('exito', resp);
                }).catch(err=>{
                    console.log('error', err);
                });
                this.nuevoMatricula();
            },
            eliminarMatricula(matricula){
                if( confirm(`Esta seguro de eliminar a ${matricula.nombre}?`) ){
                    this.accion='eliminar';
                    this.matricula=matricula;
                    this.guardarMatricula();
                }
            },
            nuevoMatricula(){
                this.accion = 'nuevo';
                this.matricula.idMatricula = '';
                this.matricula.codigo = '';
                this.matricula.nombre = '';
            },
            modificarMatricula(matricula){
                this.accion = 'modificar';
                this.matricula = matricula;
            },
            async listar() {
                try {
                 const response = await axios.get('/matriculas');
                 this.matriculas = response.data.filter(matricula => matricula.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1||
                    matricula.pago.indexOf(this.buscar)>-1|| matricula.fecha.indexOf(this.buscar)>-1);
                } catch (error) {
                 console.error(error);
                }
             }
        }
    }
</script>