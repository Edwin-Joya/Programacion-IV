Vue.component('component-matriculas',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            matriculas: [],
            Matricula:{
                idMatricula : '',
                codigo : '',
                nombre : '',
                facultad : '',
                carrera :'',
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
        guardarMatricula(){
            this.listar();
            if(this.accion==='nuevo'){
                this.Matricula.idMatricula = new Date().getTime().toString(16);
                this.matriculas.push( JSON.parse( JSON.stringify(this.Matricula) ) );
            }else if(this.accion==='modificar'){
                let index = this.matriculas.findIndex(Matricula=>Matricula.idMatricula==this.Matricula.idMatricula);
                this.matriculas[index] = JSON.parse( JSON.stringify(this.Matricula) );
            }else if(this.accion==='eliminar'){
                let index = this.matriculas.findIndex(Matricula=>Matricula.idMatricula==this.Matricula.idMatricula);
                this.matriculas.splice(index,1);
            }
            localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
            this.nuevoMatricula();
        },
        eliminarMatricula(Matricula){
            if( confirm(`Esta seguro de eliminar a ${Matricula.nombre}?`) ){
                this.accion='eliminar';
                this.Matricula=Matricula;
                this.guardarMatricula();
            }
        },
        nuevoMatricula(){
            this.accion = 'nuevo';
            this.matricula.idMatricula = '';
            this.matricula.codigo = '';
            this.matricula.nombre = '';
            this.matricula.facultad = '';
            this.matricula.carrera = '';

        },
        modificarMatricula(Matricula){
            this.accion = 'modificar';
            this.matricula = matricula;
        },
        listar(){
            this.matriculas = JSON.parse( localStorage.getItem('matriculas') || "[]" )
                .filter(Matricula=>Matricula.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        },
        actualizarcarreras() {
            const carreras = this.carrera[this.matricula.facultad] || [];
            this.carreras = carreras;
            this.matricula.carrera = '';
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE MATRICULAS</div>
                    <div class="card-body">
                        <form id="frmMatricula" @reset.prevent="nuevoMatricula" v-on:submit.prevent="guardarMatricula">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoMatricula">CODIGO:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de Matricula de 3 digitos"
                                            v-model="matricula.codigo" type="text" class="form-control" name="txtCodigoMatricula" id="txtCodigoMatricula">
                                </div>
                            </div>
                            <div class="row p-1">
                            <div class="col-3 col-md-2">
                                    <label for="txtCodigoMatricula">ALUMNO:</label>
                            </div>
                            <div class="col-3 col-md-5">
                            <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Buscar" aria-label="Buscar" aria-describedby="button-addon2">
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="bi bi-search"></i></button>
                            </div>
                            </div>
                            </div>
                            <div class="row p-1">
                             <div class="col-3 col-md-2">
                              <label for="txtDepartamentoNombre">FACULTAD:</label>
                             </div>

                            </div>
                            <div class="col-3 md-3">
                             <select v-model="matricula.facultad" class="form-control" id="inputFacultadMatricula"
                             @change="actualizarCarreras">
                             <option disabled value="">-</option>
                             <option v-for="facultad in facultades" :value="facultad">{{facultades}}
                            </option>
                             </select>
                           <div class="col-2 col-md-1">
                            <label for="txtNombreNombre">CARRERA:</label>
                           </div>

                             <select v-model="matricula.carrera" class="form-control" id="inputCarreraNombre">
                              <option disabled value="">-</option>
                              <option v-for="carrera in carreras" :value="carrera">{{carrerasPorFacultad}}</option>
                             </select>
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
                    <div class="card-header">LISTADO DE matriculas</div>
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
                                <tr v-for="Matricula in matriculas" :key="Matricula.idMatricula" @click="modificarMatricula(Matricula)" >
                                    <td>{{ matricula.codigo }}</td>
                                    <td>{{ matricula.nombre }}</td>
                                    <td>{{ matricula.facultad }}</td>
                                    <td>{{ matricula.carrera }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarMatricula(Matricula)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});