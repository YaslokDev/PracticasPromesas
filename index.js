const crearDiv = () => {
  // Crea un nuevo elemento HTML <div>
  const div = document.createElement("div");
  // Establece la posición del div como fija
  div.style.position = "fixed";
  // Posiciona el div al 50% del alto de la pantalla
  div.style.top = "50%";
  // Posiciona el div al 50% del ancho de la pantalla
  div.style.left = "50%";
  // Centra el div horizontal y verticalmente
  div.style.transform = "translate(-50%, -50%)";
  // Define el contenido del div, que es el texto que el usuario verá.
  // El texto incluye las opciones "A" y "B", así como instrucciones para
  // elegirlas y cerrar el div.
  div.innerHTML =
    "Elige una opción: <b>A</b> o <b>B</b> <br>Utiliza el teclado para elegir <br> Pulsa <b>ESC</b> para eliminar el div";
  // Agrega el div al cuerpo del documento HTML, lo que lo hace visible en la página web
  document.body.appendChild(div);
  // Devuelve el div creado, para que pueda ser utilizado por otras partes del código
  return div;
};

/*
const crearDiv = () => {: Define una función llamada crearDiv. Las funciones son bloques de código que realizan una tarea específica.
const div = document.createElement("div");: Crea un nuevo elemento HTML llamado div. Piensa en ello como una caja invisible que contendrá otros elementos.
div.style.position = "fixed";: Fija la posición del div en la pantalla, de modo que no se mueva cuando el usuario se desplaza.
div.style.top = "50%";: Posiciona el div al 50% del alto de la pantalla.
div.style.left = "50%";: Posiciona el div al 50% del ancho de la pantalla.
div.style.transform = "translate(-50%, -50%)";: Centra el div horizontal y verticalmente en la pantalla.
div.innerHTML = "Elige una opción: <b>A</b> o <b>B</b> <br>Utiliza el teclado para elegir <br> Pulsa <b>ESC</b> para eliminar el div";: Define el contenido del div, que es el texto que el usuario verá. El texto incluye las opciones "A" y "B", así como instrucciones para elegirlas y cerrar el div.
document.body.appendChild(div);: Agrega el div al cuerpo del documento HTML, lo que lo hace visible en la página web.
return div;: Devuelve el div creado, para que pueda ser utilizado por otras partes del código.
*/

// Función para capturar la tecla presionada
const capturarTecla = () => {
  // Crea una promesa que se resolverá con la tecla presionada (en mayúscula)
  return new Promise((resolver) => {
    // Define una función para manejar el evento de teclado
    const escuchadorTeclas = (evento) => {
      // Resuelve la promesa con la tecla presionada en mayúscula
      resolver(evento.key.toUpperCase());
    };
    // Agrega un event listener para el evento "keydown" que ejecutará
    // la función "escuchadorTeclas" cada vez que el usuario presione una tecla
    document.addEventListener("keydown", escuchadorTeclas);
  });
};
/*
const capturarTecla = () => {: Define una función llamada capturarTecla.
return new Promise((resolver) => {: Crea una promesa. Las promesas son objetos que representan el resultado eventual de una operación asíncrona. En este caso, la promesa se resolverá cuando el usuario presione una tecla.
const escuchadorTeclas = (evento) => {: Define una función llamada escuchadorTeclas que se ejecutará cada vez que el usuario presione una tecla.
resolver(evento.key.toUpperCase());: Resuelve la promesa con la tecla presionada convertida a mayúscula.
};: Fin de la función escuchadorTeclas.
document.addEventListener("keydown", escuchadorTeclas);: Agrega un event listener para el evento "keydown". Esto significa que la función escuchadorTeclas se ejecutará cada vez que el usuario presione una tecla.
});: Fin de la promesa.
*/

// Función para evaluar la elección del usuario
const evaluarEleccion = (div, tecla) => {
  // Crea una promesa que se resolverá en función de la tecla presionada
  return new Promise((resolver) => {
    // Si la tecla es A o B
    if (tecla === "A" || tecla === "B") {
      // Actualiza el mensaje del div para indicar que se ha elegido una opción
      div.innerHTML = "Gracias por seleccionar una opción";
      // Resuelve la promesa con "Opción elegida"
      resolver("Opción elegida");
      // Si la tecla es ESC
    } else if (tecla === "ESCAPE") {
      // Elimina el div del documento HTML
      document.body.removeChild(div);
      // Resuelve la promesa con "Div eliminado"
      resolver("Div eliminado");
      // Si la tecla no es A, B o ESC
    } else {
      // Opción incorrecta, mantener el eventListener activo
      // Actualiza el mensaje del div para indicar que se ha presionado una
      // tecla incorrecta
      div.innerHTML = "<b>Opción incorrecta</b> <br>Por favor elige <b>A</b> o <b>B</b>";
      // Devolvemos una nueva promesa para capturar la siguiente tecla
      // Llamamos a capturarTecla() para esperar la siguiente tecla presionada
      resolver(
        capturarTecla().then((nuevaTecla) =>
          // Una vez capturada la nueva tecla, se llama recursivamente a
          // evaluarEleccion() con el div y la nueva tecla
          evaluarEleccion(div, nuevaTecla)
        )
      );
    }
  });
};

/*
const evaluarEleccion = (div, tecla) => {: Define una función llamada evaluarEleccion que recibe el div creado anteriormente y la tecla presionada como argumentos.
return new Promise((resolver) => {: Crea una promesa. Las promesas son objetos que representan el resultado eventual de una operación asíncrona. En este caso, la promesa se resolverá cuando se haya evaluado la tecla presionada.
if (tecla === "A" || tecla === "B") {: Comprueba si la tecla presionada es "A" o "B".
div.innerHTML = "Gracias por seleccionar una opción";: Actualiza el mensaje del div para indicar que se ha elegido una opción.
resolver("Opción elegida");: Resuelve la promesa con el mensaje "Opción elegida".
} else if (tecla === "ESCAPE") {: Comprueba si la tecla presionada es "ESCAPE".
document.body.removeChild(div);: Elimina el div del documento HTML.
resolver("Div eliminado");: Resuelve la promesa con el mensaje "Div eliminado".
} else {: Si la tecla presionada no es "A", "B" o "ESCAPE".
div.innerHTML = "<b>Opción incorrecta</b> <br>Por favor elige <b>A</b> o <b>B</b>";: Actualiza el mensaje del div para indicar que se ha presionado una tecla incorrecta.
resolver(capturarTecla().then((nuevaTecla) => evaluarEleccion(div, nuevaTecla)));: Llama a capturarTecla() para obtener una nueva tecla y luego llama a evaluarEleccion() con el div y la nueva tecla como argumentos.  Este proceso se repite hasta que se presione una tecla válida ("A", "B" o "Escape").
};: Fin de la función evaluarEleccion.
});: Fin de la promesa.
*/

// Función para manejar la elección del usuario
const eleccionUsuario = (div) => {
  // Llama a la función capturarTecla para obtener la tecla presionada
  return (
    capturarTecla()
      // Cuando capturarTecla se resuelve con la tecla presionada, llama a
      // la función evaluarEleccion
      .then((tecla) => {
        return evaluarEleccion(div, tecla);
      })
      // Si ocurre algún error durante el proceso, muestra el error en la consola
      .catch((error) => {
        console.error(error);
        // Puedes agregar un manejo de errores más específico aquí si lo necesitas
      })
  );
};

/*
const eleccionUsuario = (div) => {: Define una función llamada eleccionUsuario que recibe el div creado anteriormente como argumento.
return capturarTecla(): Llama a la función capturarTecla para obtener la tecla presionada.
.then((tecla) => {: Se ejecuta cuando la promesa creada por la función capturarTecla se resuelve.
return evaluarEleccion(div, tecla);: Llama a la función evaluarEleccion con el div y la tecla presionada como argumentos.
}): Fin del then.
.catch((error) => {: Se ejecuta si la promesa creada por la función capturarTecla o evaluarEleccion falla.
console.error(error);: Muestra el error en la consola.
});: Fin del catch.
*/

// Función para gestionar el mensaje de elección y el tiempo límite
const mensajeEleccion = () => {
  // Crea una promesa que se resolverá con el resultado de la elección del
  // usuario o con el mensaje "Tiempo agotado" si el usuario no elige a tiempo
  return new Promise((resolver) => {
    // Ejecuta el código dentro del bloque después de 10 segundos.
    setTimeout(() => {
      // Crea el div del mensaje utilizando la función crearDiv creada anteriormente
      const div = crearDiv();
      // Crea una promesa para la elección del usuario utilizando la función
      // eleccionUsuario creada anteriormente
      const promesaUsuario = eleccionUsuario(div);
      // Crea una promesa para el tiempo límite
      const promesaTiempoAgotado = new Promise((resolve) => {
        // Ejecuta el código dentro del bloque después de 10 segundos
        setTimeout(() => {
          // Elimina el div del documento HTML
          document.body.removeChild(div);
          // Resuelve la promesa con el mensaje "Tiempo agotado"
          resolve("Tiempo agotado");
        }, 10000);
      });
      // Crea una carrera entre la promesa del usuario y la promesa del
      // tiempo límite. Esto significa que la primera promesa que se resuelva
      // determinará el resultado final
      Promise.race([promesaUsuario, promesaTiempoAgotado])
        // Se ejecuta si alguna de las promesas se resuelve primero
        .then((resultado) => {
          // Resuelve la promesa principal con el resultado de la promesa que
          // se resolvió primero
          resolver(resultado);
        })
        // Se ejecuta si alguna de las promesas falla
        .catch((error) => {
          // Muestra el error en la consola
          console.error(error);
          // Resuelve la promesa principal con el mensaje "Error"
          resolver("Error");
        });
    }, 1000);
  });
};

/*
const mensajeEleccion = () => {: Define una función llamada mensajeEleccion.
return new Promise((resolver) => {: Crea una promesa que se resolverá con el resultado de la elección del usuario o con el mensaje "Tiempo agotado" si el usuario no elige a tiempo.
setTimeout(() => {: Ejecuta el código dentro del bloque después de 10 segundos.
const div = crearDiv();: Crea el div del mensaje utilizando la función crearDiv creada anteriormente.
const promesaUsuario = eleccionUsuario(div);: Crea una promesa para la elección del usuario utilizando la función eleccionUsuario creada anteriormente.
const promesaTiempoAgotado = new Promise((resolve) => {: Crea una promesa para el tiempo límite.
setTimeout(() => {: Ejecuta el código dentro del bloque después de 10 segundos.
document.body.removeChild(div);: Elimina el div del documento HTML.
resolve("Tiempo agotado");: Resuelve la promesa con el mensaje "Tiempo agotado".
}, 10000);: Fin del segundo setTimeout.
Promise.race([promesaUsuario, promesaTiempoAgotado]): Crea una carrera entre la promesa del usuario y la promesa del tiempo límite. Esto significa que la primera promesa que se resuelva determinará el resultado final.
.then((resultado) => {: Se ejecuta si alguna de las promesas se resuelve primero.
resolver(resultado);: Resuelve la promesa principal con el resultado de la promesa que se resolvió primero.
}): Fin del then.
.catch((error) => {: Se ejecuta si alguna de las promesas falla.
console.error(error);: Muestra el error en la consola.
resolver("Error");: Resuelve la promesa principal con el mensaje "Error".
});: Fin del catch.
}, 10000);: Fin del primer setTimeout.
});: Fin de la promesa.
*/

// Ejecuta la función mensajeEleccion y espera su resultado
mensajeEleccion()
  // Se ejecuta cuando la promesa creada por la función mensajeEleccion se resuelve.
  .then((resultado) => {
    // Muestra el resultado en la consola. Puede ser "Opción elegida",
    // "Div eliminado", "Tiempo agotado" o "Error".
    console.log(resultado);
  });

/*
mensajeEleccion(): Ejecuta la función mensajeEleccion creada anteriormente.
.then((resultado) => {: Se ejecuta cuando la promesa creada por la función mensajeEleccion se resuelve.
console.log(resultado);: Muestra el resultado en la consola. Puede ser "Opción elegida", "Div eliminado", "Tiempo agotado" o "Error".
});: Fin del then.
*/
