Vue.component('component-alumnos',{
    data() {
        return {
          accion: 'nuevo',
            buscar: '',
            alumnos: [],
            alumno: {
                idAlumno: '',
                codigo: '',
                direccion: '',
                municipio: '',
                departamento: '',
                telefono: '',
                fechan: '',
                genero: '',
            }
        }
    },
    methods:{
        guardarAlumno(){
            this.listar();
            if(this.accion==='nuevo'){
                this.alumno.idAlumno = new Date().getTime().toString(16);
                this.alumnos.push( JSON.parse( JSON.stringify(this.alumno) ) );
            }else if(this.accion==='modificar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos[index] = JSON.parse( JSON.stringify(this.alumno) );
            }else if(this.accion==='eliminar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos.splice(index,1);
            }
            localStorage.setItem("alumnos", JSON.stringify(this.alumnos) );
            this.nuevoAlumno();
        },
        eliminarAlumno(alumno){
            if( confirm(`Esta seguro de eliminar a ${alumno.nombre}?`) ){
                this.accion='eliminar';
                this.alumno=alumno;
                this.guardarAlumno();
            }
        },
        nuevoAlumno(){
            this.accion = 'nuevo';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.direccion = '';
            this.alumno.telefono = '';
            this.alumno.dui = '';
        },
        modificarAlumno(alumno){
            this.accion = 'modificar';
            this.alumno = alumno;
        },
        listar(){
            this.alumnos = JSON.parse( localStorage.getItem('alumnos') || "[]" )
                .filter(alumno=>alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 || alumno.codigo.indexOf(this.buscar)>-1);
        }
    },
    template: `
    <div class="row">
    <div class="col-12 col-md-6">
        <div class="card">
            <div class="card-header">REGISTRO DE ALUMNOS</div>
            <div class="card-body">
                <form id="frmAlumno" @reset.prevent="nuevoAlumno" v-on:submit.prevent="guardarAlumno">
                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtCodigoAlumno">CODIGO:</label>
                        </div>
                        <div class="col-3 col-md-3">
                            <input required pattern="[0-9]{3}" title="Ingrese un codigo de Alumno de 3 digitos"
                                v-model="alumno.codigo" type="text" class="form-control" name="txtCodigoAlumno"
                                id="txtCodigoAlumno">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtNombreAlumno">NOMBRE:</label>
                        </div>
                        <div class="col-9 col-md-6">
                            <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" v-model="alumno.nombre" type="text"
                                class="form-control" name="txtNombreAlumno" id="txtNombreAlumno">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtDireccionAlumno">DIRECCION:</label>
                        </div>
                        <div class="col-9 col-md-6">
                            <input required v-model="alumno.direccion" type="text" class="form-control"
                                name="txtDireccionAlumno" id="txtDireccionAlumno">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtDepartamentoAlumno">DEPARTAMENTO:</label>
                        </div>

                        <!-- <select v-model="alumno.departamento" class="form-control" id="inputDepartamentoAlumno">
                            <option disabled value="">-</option>
                            <option value="Ahuachapán">Ahuachapán</option>
                            <option value="Cabañas">Cabañas</option>
                            <option value="Chalatenango">Chalatenango</option>
                            <option value="Cuscatlán">Cuscatlán</option>
                            <option value="La Libertad">La Libertad</option>
                            <option value="Morazán">Morazán</option>
                            <option value="La Paz">La Paz</option>
                            <option value="Santa Ana">Santa Ana</option>    
                            <option value="San Miguel">San Miguel</option>
                            <option value="San Salvador">San Salvador</option>
                            <option value="San Vicente">San Vicente</option>
                            <option value="Sonsonate">Sonsonate</option>
                            <option value="La Unión">La Unión</option>
                            <option value="Usulután">Usulután</option> 
                        </select>
                    
                    </div>
                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtNombreAlumno">MUNICIPIO:</label>
                        </div>
                        <div class="col-9 col-md-6">
                            <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                v-model="alumno.municipio" type="text" class="form-control" name="txtMunicipioAlumno" id="txtMunicipioAlumno">
                        </div>
                    </div>
                -->
                    </div>
                    <div class="col-3 md-3">
                        <select v-model="alumno.departamento" class="form-control" id="inputDepartamentoAlumno"
                            @change="actualizarMunicipios">
                            <option disabled value="">-</option>
                            <option v-for="departamento in departamentos" :value="departamento">{{departamento}}
                            </option>
                        </select>
                        <div class="col-2 col-md-1">
                            <label for="txtNombreAlumno">MUNICIPIO:</label>
                        </div>

                        <select v-model="alumno.municipio" class="form-control" id="inputMunicipioAlumno">
                            <option disabled value="">-</option>
                            <option v-for="municipio in municipios" :value="municipio">{{municipio}}</option>
                        </select>
                    </div>

                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtTelefonoAlumno">TELEFONO:</label>
                        </div>
                        <div class="col-3 col-md-3">
                            <input required pattern="[0-9]{8}" v-model="alumno.telefono" type="tel"
                                class="form-control" name="txtTelefonoAlumno" id="txtTelefonoAlumno">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtFechaNAlumno">FECHA DE NACIMIENTO:</label>
                        </div>
                        <div class="col-9 col-md-4">
                            <input required pattern="[A-Za-zÑñáéíóú ]{3,75}" v-model="alumno.fechan" type="date"
                                class="form-control" name="txtFechaNAlumno" id="txtFechaNAlumno">
                        </div>
                    </div>
                    <div class="row p-1">
                        <div class="col-3 col-md-2">
                            <label for="txtGeneroAlumno">GENERO:</label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" v-model="alumno.genero" v-bind:value="'Masculino'"
                                type="radio" name="flexRadioGenero" id="flexRadioGenero">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Masculino
                            </label>

                        </div>
                        <div class="form-check">
                            <input class="form-check-input" v-model="alumno.genero" v-bind:value="'Femenino'"
                                type="radio" name="flexRadioGenero" id="flexRadioGenero">

                            <label class="form-check-label" for="flexRadioDefault2">
                                Femenino
                            </label>
                        </div>
                    </div>

                    <div class="row p-1">
                        <div class="col-3 col-md-3">
                            <input class="btn btn-primary" type="submit" value="Guardar">
                        </div>
                        <div class="col-3 col-md-3">
                            <input class="btn btn-warning" type="reset" value="Nuevo">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-12">
        <div class="card">
            <div class="card-header">LISTADO DE ALUMNOS</div>
            <div class="card-body">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>BUSCAR:</th>
                            <th colspan="6"><input type="text" class="form-control" v-model="buscar"
                                    @keyup="listarAlumnos()" placeholder="Buscar por codigo o nombre"></th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>DIRECCION</th>
                            <th>DEPARTAMENTO</th>
                            <th>MUNICIPIO</th>
                            <th>TELEFONO</th>
                            <th>FECHA DE NACIMIENTO</th>
                            <th>GENERO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alumno in alumnos" :key="alumno.idAlumno" @click="modificarAlumno(alumno)">
                            <td>{{ alumno.codigo }}</td>
                            <td>{{ alumno.nombre }}</td>
                            <td>{{ alumno.direccion }}</td>
                            <td>{{ alumno.departamento }}</td>
                            <td>{{ alumno.municipio }}</td>
                            <td>{{ alumno.telefono }}</td>
                            <td>{{ alumno.fechan }}</td>
                            <td>{{ alumno.genero }}</td>



                            <td><button class="btn btn-danger" @click="eliminarAlumno(alumno)">ELIMINAR</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
    `
});