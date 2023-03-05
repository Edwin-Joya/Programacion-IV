Vue.component('component-alumnos', {
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
                dui: '',
                fechan: '',
                genero: '',
            },
            departamentos: [
                'Ahuachapán',
                'Cabañas',
                'Chalatenango',
                'Cuscatlán',
                'La Libertad',
                'Morazán',
                'La Paz',
                'Santa Ana',
                'San Miguel',
                'San Salvador',
                'San Vicente',
                'Sonsonate',
                'La Unión',
                'Usulután',
            ],
            municipiosPorDepartamento: {
                'Ahuachapán': ['Ahuachapán', 'Atiquizaya', 'Concepción de Ataco', 'El Refugio',
                    'Guaymango', 'Jujutla', 'San Francisco Menéndez', 'San Lorenzo',
                    'San Pedro Puxtla', 'Tacuba', 'Turín'
                ],
                'Cabañas': ['Cinquera', 'Dolores', 'Guacotecti', 'Ilobasco',
                    'Jutiapa', 'San Isidro', 'Sensuntepeque', 'Tejutepeque',
                    'Victoria'
                ],
                'Chalatenango': ['Chalatenango', 'Nueva Concepción', 'La Palma', 'Agua Caliente',
                    'Arcatao', 'Azacualpa', 'Comalapa', 'Citalá',
                    'Concepción Quezaltepeque', 'Dulce Nombre de María', 'El carrizal', 'El Paraíso',
                    'La Laguna', 'La Reina', 'Las Vueltas', 'Nueva Trinidad',
                    'Nombre de Jesús', 'Ojos de Agua', 'Potonico', 'San Antonio de la Cruz',
                    'San Antonio Los ranchos', 'San Fernando', 'San Francisco Lempa', 'San Fracisco Morazán',
                    'San Ignacio', 'San Isidro Labrador', 'San José Las Flores', 'San Luis del Carmen',
                    'San Miguel de Mercedes', 'San Rafael', 'Santa Rita', 'Tejutla',
                    'San José Cancasque'
                ],
                'Cuscatlán': ['Candelaria', 'Cojutepeque', 'El Carmen', 'El Rosario',
                    'Monte San Juan', 'Oratorio de Concepción', 'San Bartolomé Perulapía', 'San Cristóbal',
                    'San José Guayabal', 'San Pedro Perulapán', 'San Rafael Cedros', 'San Ramón',
                    'Santa Cruz Analquito', 'Santa Cruz Michapa', 'Suchitoto', 'Tenancingo'
                ],
                'La Libertad': ['Antiguo Cuscatlán', 'Chiltiupán', 'Ciudad Arce', 'Colón',
                    'Comasagua', 'Huizúcar', 'Jayaque', 'Jicalapa',
                    'Santa Tecla', 'Nuevo Cuscatlán', 'San Juan Opico', 'Quezaltepeque',
                    'Sacacoyo', 'San José Villanueva', 'San Matías', 'San Pablo Tacachico',
                    'Talnique', 'Tamanique', 'Teotepeque', 'Tepecoyo',
                    'Zaragoza'
                ],
                'Morazán': ['Arambala', 'Cacaopera', 'Chilanga', 'Corinto',
                    'Delicias de Concepción', 'El Divisadero', 'El Rosario', 'Gualococti',
                    'Guatajiagua', 'Joateca', 'Jocoaitique', 'Jocoro',
                    'Lolotiquillo', 'Meanguera', 'Osicala', 'Perquín',
                    'San Carlos', 'San Fernando', 'San Francisco Gotera', 'San Isidro',
                    'San Simón', 'Sensembra', 'Sociedad', 'Torola',
                    'Yamabal', 'Yoloaiquín'
                ],

                'La Paz': ['Cuyultitán', 'El Rosario', 'Jerusalén', 'Mercedes La Ceiba',
                    'Olocuilta', 'Paraíso de Osorio', 'San Antonio Masahuat', 'San Emigdio',
                    'San Francisco Chinameca', 'San Juan Nonualco', 'San Juan Talpa', 'San Juan Tepezontes',
                    'San Luis Talpa', 'San Luis La Herradura', 'San Miguel Tepezontes', 'San Pedro Masahuat',
                    'San Pedro Nonualco', 'San Rafael Obrajuelo', 'Santa María Ostuma', 'Santiago Nonualco',
                    'Tapalhuaca', 'Zacatecoluca'
                ],

                'Santa Ana': ['Candelaria de la Frontera', 'Chalchuapa', 'Coatepeque', 'El Congo',
                    'El Porvenir', 'Masahuat', 'Metapán', 'San Antonio Pajonal',
                    'San Sebastián Salitrillo', 'Santa Ana', 'Santa Rosa Guachipilín', 'Santiago de la Frontera',
                    'Texistepeque'
                ],
                'San Miguel': ['Carolina', 'Chapeltique', 'Chinameca', 'Chirilagua',
                    'Ciudad Barrios', 'Comacarán', 'El Tránsito', 'Lolotique',
                    'Moncagua', 'Nueva Guadalupe', 'Nuevo Edén de San Juan', 'Quelepa',
                    'San Antonio del Mosco', 'San Gerardo', 'San Jorge', 'San Luis de la Reina',
                    'San Miguel', 'San Rafael Oriente', 'Sesori', 'Uluazapa'
                ],
                'San Salvador': ['Aguilares', 'Apopa', 'Ayutuxtepeque', 'Cuscatancingo',
                    'Ciudad Delgado', 'El Paisnal', 'Guazapa', 'Ilopango',
                    'Mejicanos', 'Nejapa', 'Panchimalco', 'Rosario de Mora',
                    'San Marcos', 'San Martín', 'San Salvador', 'Santiago Texacuangos',
                    'Santo Tomás', 'Soyapango', 'Tonacatepeque'
                ],
                'San Vicente': ['Apastepeque', 'Guadalupe', 'San Cayetano Istepeque', 'San Esteban Catarina',
                    'San Ildefonso', 'San Lorenzo', 'San Sebastián', 'San Vicente',
                    'Santa Clara', 'Santo Domingo', 'Tecoluca', 'Tepetitán',
                    'Verapaz'
                ],
                'Sonsonate': ['Acajutla', 'Armenia', 'Caluco', 'Cuisnahuat',
                    'Izalco', 'Juayúa', 'Nahuizalco', 'Nahulingo',
                    'Salcoatitán', 'San Antonio del Monte', 'San Julián', 'Santa Catarina Masahuat',
                    'Santa Isabel Ishuatán', 'Santo Domingo Guzmán', 'Sonsonate', 'Sonzacate'
                ],
                'La Unión': ['Anamorós', 'Bolivar', 'Concepción de Oriente', 'Conchagua',
                    'El Carmen', 'El Sauce', 'Intipucá', 'La Unión',
                    'Lislique', 'Meanguera del Golfo', 'Nueva Esparta', 'Pasaquina',
                    'Polorós', 'San Alejo', 'San José', 'Santa Rosa de Lima',
                    'Yayantique', 'Yucuaiquín'
                ],
                'Usulután': ['Alegría', 'Berlín', 'California', 'Concepción Batres',
                    'El Triunfo', 'Ereguayquín', 'Estanzuelas', 'Jiquilisco',
                    'Jucuapa', 'Jucuarán', 'Mercedes Umaña', 'Nueva Granada',
                    'Ozatlán', 'Puerto El Triunfo', 'San Agustín', 'San Buenaventura',
                    'San Dionisio', 'San Francisco Javier', 'Santa Elena', 'Santa María',
                    'Santiago de María', 'Tecapán', 'Usulután'
                ],
            },
            municipios: [],
        }

    },
    methods: {
        guardarAlumno() {
            this.listar();
            if (this.accion === 'nuevo') {
                this.alumno.idAlumno = new Date().getTime().toString(16);
                this.alumnos.push(JSON.parse(JSON.stringify(this.alumno)));
            } else if (this.accion === 'modificar') {
                let index = this.alumnos.findIndex(alumno => alumno.idAlumno == this.alumno.idAlumno);
                this.alumnos[index] = JSON.parse(JSON.stringify(this.alumno));
            } else if (this.accion === 'eliminar') {
                let index = this.alumnos.findIndex(alumno => alumno.idAlumno == this.alumno.idAlumno);
                this.alumnos.splice(index, 1);
            }
            localStorage.setItem("alumnos", JSON.stringify(this.alumnos));
            this.nuevoAlumno();
        },
        eliminarAlumno(alumno) {
            if (confirm(`Esta seguro de eliminar a ${alumno.nombre}?`)) {
                this.accion = 'eliminar';
                this.alumno = alumno;
                this.guardarAlumno();
            }
        },
        nuevoAlumno() {
            this.accion = 'nuevo';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.direccion = '';
            this.alumno.municipio = '';
            this.alumno.departamento = '';
            this.alumno.telefono = '';
            this.alumno.dui = '';
            this.alumno.fechan = '';
            this.alumno.genero = '';
            this.listar();
        },
        modificarAlumno(alumno) {
            this.accion = 'modificar';
            this.alumno = alumno;
        },
        listar() {
            this.alumnos = JSON.parse(localStorage.getItem('alumnos') || "[]")
                .filter(alumno => alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase()) > -1);
        },
        abrirBD() {
            let indexedDB = indexedDB.open('db_sistema_academico', 1);
            indexedDB.onupgradeneeded = e => {

                let req = e.target.result,
                    tbldocente = req.createObjectStore('tbldocentes', {
                        keyPath: 'idDocente'
                    });
                tbldocente.createIndex('idDocente', 'idDocente', {
                    unique: true
                });
                tbldocente.createIndex('codigo', 'codigo', {
                    unique: true
                });
            };
            indexedDB.onsuccess = e => {
                console.error(e);

            }

        },
        actualizarMunicipios() {
            const municipios = this.municipiosPorDepartamento[this.alumno.departamento] || [];
            this.municipios = municipios;
            this.alumno.municipio = '';
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
                            <input required pattern="[US|SM]{2}[IS|LI]{2}[0-9]{6}" title="Ingrese un codigo de Alumno de 3 digitos"
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
                        <label for="txtDuiAlumno">DUI:</label>
                       </div>
                       <div class="col-3 col-md-3">
                        <input required pattern="[0-9]{8}-[0-9]{1}"
                            v-model="alumno.dui" type="text" class="form-control" name="txtDuiAlumno" id="txtDuiAlumno">
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
                                    @keyup="listar()" placeholder="Buscar por codigo o nombre"></th>
                        </tr>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>DIRECCION</th>
                            <th>DEPARTAMENTO</th>
                            <th>MUNICIPIO</th>
                            <th>TELEFONO</th>
                            <th>DUI</th>
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
                            <td>{{ alumno.dui }}</td>
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