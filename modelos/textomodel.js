const { obtenerConexion } = require('../basededatos/conexion');

async function guardarTextoCifrado(usuarioId, textoOriginal, textoCifrado, callback) {
    obtenerConexion()
      .then(conexion => {
        return conexion.execute('INSERT INTO historial (id_usuario, texto_original, texto_cifrado) VALUES (?, ?, ?)', [usuarioId, textoOriginal, textoCifrado])
          .then(resultados => {
            conexion.release();
            callback(null, resultados);
          })
          .catch(error => {
            conexion.release();
            callback(error);
          });
      })
      .catch(error => {
        callback(error);
      });
  }
  
  function obtenerHistorialPorUsuario(usuarioId) {
    return obtenerConexion()
        .then(conexion => {
            return conexion.execute('SELECT * FROM historial WHERE id_usuario = ?', [usuarioId])
                .then(resultados => {
                    conexion.release();
                    return resultados;
                })
                .catch(error => {
                    conexion.release();
                    throw error;
                });
        })
        .catch(error => {
            throw error;
        });
}


  function cifrarCesar(texto, desplazamiento) {
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
      let caracter = texto[i];
      if (caracter.match(/[a-z]/i)) {
        let codigo = texto.charCodeAt(i);
        if (codigo >= 65 && codigo <= 90) {
          caracter = String.fromCharCode(((codigo - 65 + desplazamiento) % 26) + 65);
        } else if (codigo >= 97 && codigo <= 122) {
          caracter = String.fromCharCode(((codigo - 97 + desplazamiento) % 26) + 97);
        }
      }
      resultado += caracter;
    }
    return resultado;
  }
  
  function cifrarBase64(texto) {
    return Buffer.from(texto).toString('base64');
  }
  
  function cifrarHexadecimal(texto) {
    return Buffer.from(texto, 'utf-8').toString('hex');
  }
  
  function cifrarBinario(texto) {
    let binario = '';
    for (let i = 0; i < texto.length; i++) {
        // Convierte cada carácter a su representación binaria y lo agrega a la cadena binaria
        binario += texto[i].charCodeAt(0).toString(2) + ' ';
    }
    // Elimina el espacio adicional al final y devuelve la cadena binaria cifrada
    return binario.trim();
}

  async function obtenerMetodosCifrado() {
    const conexion = await obtenerConexion();
    try {
      const [resultados] = await conexion.query('SELECT * FROM metodosCifrado');
      return resultados;
    } catch (error) {
      console.error('Error al obtener métodos de cifrado:', error);
      throw error;
    }
  }

  
  

  module.exports = {
    cifrarCesar,
    cifrarBase64,
    cifrarHexadecimal,
    guardarTextoCifrado,
    obtenerHistorialPorUsuario,
    obtenerMetodosCifrado,
    cifrarBinario
  };
