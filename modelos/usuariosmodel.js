const { obtenerConexion } = require('../basededatos/conexion');

//inserta el usuario en la tabla de mysql
async function registrar(nombre, usuario, email, contraseña) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('INSERT INTO usuarios (usuario, nombre_completo, email, contraseña) VALUES (?, ?, ?, ?)', [usuario, nombre, email, contraseña]);
        console.log('Usuario insertado correctamente');
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        throw error;
    } 
}

// lee al usuario uwu
async function obtenerPorusuario(usuario) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    } 
}


// lo mismo que el anterior  pero con su ID
async function obtenerPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    } 
}



module.exports = {
    registrar,
    obtenerPorusuario,
    obtenerPorId,
};