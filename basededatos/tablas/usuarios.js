const { obtenerConexion } = require('../conexion');


async function registrar(nombre, email, password) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)', [nombre, email, password]);
        console.log('Usuario insertado correctamente');
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        throw error;
    } finally {
        
    }
}


async function obtenerPorNombre(nombre) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    } finally {
        
    }
}


async function obtenerPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    } finally {
       
    }
}

module.exports = {
    registrar,
    obtenerPorNombre,
    obtenerPorId
};