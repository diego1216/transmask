const { obtenerConexion } = require('../basededatos/conexion');


async function registrar(nombre, email, contraseña) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)', [nombre, email, contraseña]);
        console.log('Estos son los datos de mi funcion registrar', nombre, email, contraseña);
        console.log('Usuario insertado correctamente');
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        throw error;
    }
}

// Función para obtener un usuario por su nombre de usuario
async function obtenerPorEmail(email) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        console.log("Esta es la funcion obtenerPorEmail", email);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por usuario:', error);
        throw error;
    }
}

// Función para obtener un usuario por su ID
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
    obtenerPorEmail,
    obtenerPorId,
};