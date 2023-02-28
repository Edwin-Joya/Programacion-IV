Vue.component('component-matriculas',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            matriculas: [],
            matricula:{
                idInscripcion : '',
                codigo : '',
                nombre : '',
                facultad:'',
                carrera: '',
            },
            facultades: [
                'Ciencias y tecnologia',
                'Ciencias de la salud',
            ],
            carrerasPorFacultad: {
                'Ciencias y tecnologia':['Tec. Ingeniria en sistemas', 'Ingenieria en sistemas'],
                'Ciencias de la salud':['Tec. Enfermeria','Licenciatura en Enfermeria'],


            },
            carreras:[],
        }
    },
    methods:{
        guardarInscripcion(){
            this.listar();
            if(this.accion==='nuevo'){
                this.matricula.idInscripcion = new Date().getTime().toString(16);
                this.matriculas.push( JSON.parse( JSON.stringify(this.matricula) ) );
            }else if(this.accion==='modificar'){
                let index = this.matriculas.findIndex(matricula=>matricula.idInscripcion==this.matricula.idInscripcion);
                this.matriculas[index] = JSON.parse( JSON.stringify(this.matricula) );
            }else if(this.accion==='eliminar'){
                let index = this.matriculas.findIndex(matricula=>matricula.idInscripcion==this.matricula.idInscripcion);
                this.matriculas.splice(index,1);
            }
            localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
            this.nuevoInscripcion();
        },
        eliminarInscripcion(matricula){
            if( confirm(`Esta seguro de eliminar a ${matricula.nombre}?`) ){
                this.accion='eliminar';
                this.matricula=matricula;
                this.guardarInscripcion();
            }
        },
        nuevoInscripcion(){
            this.accion = 'nuevo';
            this.matricula.idInscripcion = '';
            this.matricula.codigo = '';
            this.matricula.nombre = '';
            this.matricula.facultad = '';
            this.matricula.carrera = '';
        },
        modificarInscripcion(matricula){
            this.accion = 'modificar';
            this.matricula = matricula;
        },
        listar(){
            this.matriculas = JSON.parse( localStorage.getItem('matriculas') || "[]" )
                .filter(matricula=>matricula.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        },
        actualizarCarreras() {
            const carreras = this.carrerasPorFacultad[this.matricula.facultad] || [];
            this.carreras = carreras;
            this.matricula.carrera = '';
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE INSCRIPCION</div>
                    <div class="card-body">
                        <form id="frmInscripcion" @reset.prevent="nuevoInscripcion" v-on:submit.prevent="guardarInscripcion">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">CODIGO:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de matricula de 3 digitos"
                                            v-model="matricula.codigo" type="text" class="form-control" name="txtCodigoInscripcion" id="txtCodigoInscripcion">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtNombreInscripcion">NOMBRE:</label>
                                </div>
                        
                            
                            <div class="col-3 col-md-5">
                            <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Buscar" aria-label="Buscar" aria-describedby="button-addon2">
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="bi bi-search"></i></button>
                            </div>
                            </div>
                            </div>

                            <div class="col-3 md-3">
                            <select v-model="matricula.facultad" class="form-control" id="inputFacultadMatricula"
                                @change="actualizarCarreras">
                                <option disabled value="">-</option>
                                <option v-for="facultad in facultades" :value="facultad">{{facultad}}
                                </option>
                            </select>
                            <div class="col-2 col-md-1">
                                <label for="txtNombreAlumno">CARRERA:</label>
                            </div>
    
                            <select v-model="matricula.carrera" class="form-control" id="inputCarreraMatricula">
                                <option disabled value="">-</option>
                                <option v-for="carrera in carreras" :value="carrera">{{carrera}}</option>
                            </select>
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
                    <div class="card-header">LISTADO DE INSCRIPCIONS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>CODIGO</th>
                                    <th colspan="2">NOMBRE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="matricula in matriculas" :key="matricula.idInscripcion" @click="modificarInscripcion(matricula)" >
                                    <td>{{ matricula.codigo }}</td>
                                    <td>{{ matricula.nombre }}</td>
                                    <td>{{ matricula.facultad }}</td>
                                    <td>{{ matricula.carrera }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarInscripcion(matricula)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});