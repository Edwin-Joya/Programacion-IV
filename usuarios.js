
Vue.component('component-usuarios',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            usuarios: [],
            usuario:{
                idUsuario : '',
                nombre : '',
                email : '',
                usuario : '',
                contraseña : '',

            },
            credenciales: {
                usuario: '',
                contraseña: ''
            },
            usuarioRegistrado: false,
            usuarioLogueado: false
        }
    },
    methods:{
        guardarUsuario(){
            this.listar();
            if(this.accion==='nuevo'){
                this.usuario.idUsuario = new Date().getTime().toString(16);
                this.usuarios.push( JSON.parse( JSON.stringify(this.usuario) ) );
            }else if(this.accion==='modificar'){
                let index = this.usuarios.findIndex(usuario=>usuario.idUsuario==this.usuario.idUsuario);
                this.usuarios[index] = JSON.parse( JSON.stringify(this.usuario) );
            }else if(this.accion==='eliminar'){
                let index = this.usuarios.findIndex(usuario=>usuario.idUsuario==this.usuario.idUsuario);
                this.usuarios.splice(index,1);
            }
            localStorage.setItem("usuarios", JSON.stringify(this.usuarios) );
            fetch(`private/modulos/usuarios/usuarios.php?accion=${this.accion}&usuarios=${JSON.stringify(this.usuario)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
                alert('Usuario registrado exitosamente, Por favor inicia sesion');
            })
            .catch(err => {
                console.log('Hubo un error al registrar el usuario:', err);
              });
            
            this.nuevoUsuario();
        },
        eliminarUsuario(usuario){
            if( confirm(`Esta seguro de eliminar a ${usuario.nombre}?`) ){
                this.accion='eliminar';
                this.usuario=usuario;
                this.guardarUsuario();
            }
        },
        nuevoUsuario(){
            this.accion = 'nuevo';
            this.usuario.idUsuario = '';
            this.usuario.nombre = '';
            this.usuario.email = '';
            this.usuario.usuario = '';
            this.usuario.contraseña = '';
        },
        modificarUsuario(usuario){
            this.accion = 'modificar';
            this.usuario = usuario;
        },
        listar() {
            this.usuarios = JSON.parse( localStorage.getItem('usuarios') || "[]" )
                .filter(usuario=>usuario.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
            if( this.usuarios.length<=0 && this.buscar.trim().length<=0 ){
                fetch('private/modulos/usuarios/usuarios.php?accion=consultar')
                .then(resp=>resp.json())
                .then(resp=>{
                    this.usuarios = resp;
                    localStorage.setItem("usuarios", JSON.stringify(this.usuarios) );
                });
            }
        },

    
          
        },
    

    template: ` 
    <div class="contenedor__todo" @reset.prevent="nuevoUsuario" v-on:submit.prevent="guardarUsuario">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/estilos.css">
        <div v-if="usuarioRegistrado" class="mensaje-registro">
        <p>Usuario registrado correctamente.</p>
       </div>
        <div class="caja__trasera">
            <div class="caja__trasera-login">
                <h3>¿Ya tienes una cuenta?</h3>
                <p>Inicia sesión para entrar en la página</p>
                <button id="btn__iniciar-sesion">Iniciar Sesión</button>
            </div>
            <div class="caja__trasera-register">
                <h3>¿Aún no tienes una cuenta?</h3>
                <p>Regístrate para que puedas iniciar sesión</p>
                <button id="btn__registrarse">Regístrarse</button>
            </div>
        </div>

        <!--Formulario de Login y registro-->
        <div class="contenedor__login-register">
            <!--Login-->
            <form  class="formulario__login">
                <h2>Iniciar Sesión</h2>
                <input v-model="usuario.nombre" type="text" placeholder="Correo Electronico" required>
                <input v-model="usuario.contraseña" type="password" placeholder="Contraseña" required>
                <button type="submit">Entrar</button>
            </form>

            <!--Register-->
            <form  class="formulario__register" method="POST">
                <h2>Regístrarse</h2>
                <input v-model="usuario.nombre" type="text" placeholder="Nombre completo" name="nombre" required pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$">
                <input v-model="usuario.email" type="email" placeholder="Correo Electronico" name="email" required>
                <input v-model="usuario.usuario" type="text" placeholder="Usuario" name="usuario" required>
                <input v-model="usuario.contraseña" type="password" placeholder="Contraseña" name="contraseña" required pattern=".{8,}" title="Ingresa una Contraseña de al menos 8 caracteres">
                <button type="submit">Regístrarse</button>
            </form>
        </div>
    </div>
    `
    
});
