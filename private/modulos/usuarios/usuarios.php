<?php
include '../../Config/Config.php';
extract($_REQUEST);

$usuarios = isset($usuarios) ? $usuarios : '[]';
$accion = isset($accion) ? $accion : '';
$class_usuario = new Usuario($conexion);
if( $accion=='consultar' ){
    print_r(json_encode($class_usuario->consultar('')));
}else{
    print_r($class_usuario->recibir_datos($usuarios));
}
class Usuario{
    private $datos=[], $db, $respuesta=['msg'=>'ok'];

    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($usuario){
        $this->datos = json_decode($usuario, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if(empty($this->datos['idUsuario'])){
            $this->respuesta['msg'] = 'Nose pudo seleccionar el ID';
        }
        if(empty($this->datos['nombre'])){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo';
        }
        if(empty($this->datos['email'])){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        if(empty($this->datos['usuario'])){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        if(empty($this->datos['contraseña'])){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        return $this->administrar_usuario();
    }
    private function administrar_usuario(){
        global $accion;
        if( $this->respuesta['msg']=='ok' ){
            if($accion=='nuevo'){
                return $this->db->consultas(
                    'INSERT INTO usuarios VALUES(?,?,?,?,?)',
                    $this->datos['idUsuario'], $this->datos['nombre'], $this->datos['email'], $this->datos['usuario'], $this->datos['contraseña']
                );
            }else if($accion=='modificar'){
                return $this->db->consultas(
                    'UPDATE usuarios SET nombre=?, email=? usuario=?, contraseña=? WHERE idUsuario=?',
                    $this->datos['nombre'], $this->datos['email'], $this->datos['usuario'], $this->datos['contraseña'], $this->datos['idUsuario']
                );
            }else if($accion=='eliminar'){
                return $this->db->consultas(
                    'DELETE usuarios FROM usuarios WHERE idUsuario=?',
                    $this->datos['idUsuario']
                );
            }
        }else{
            return $this->respuesta;
        }
    }
    public function consultar(){
        $this->db->consultas('SELECT * FROM usuarios');
        return $this->db->obtener_datos();
    }

    public function iniciar_sesion($usuario){
        $this->db->consultas('SELECT * FROM usuarios WHERE usuario=? AND contraseña=?', $usuario['usuario'], $usuario['contraseña']);
        $resultado = $this->db->obtener_datos();
    
        if(count($resultado) > 0){
            // El usuario y la contraseña son correctos, devolver los datos del usuario
            return $resultado[0];
        }else{
            // Las credenciales no son correctas, devolver un mensaje de error
            return ['msg' => 'Nombre de usuario o contraseña incorrectos'];
        }
    }
    


}
?>