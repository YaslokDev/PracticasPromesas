# Paso 1: Mostrar el mensaje después de 10 segundos.

- **Problema:** Necesitamos mostrar un mensaje al usuario después de 10 segundos.

- **Herramienta:** Usaremos `setTimeout`. Esta función ejecuta un código después de un tiempo determinado.

- **Ejemplo:** `setTimeout(() => { // Mostrar el mensaje aquí }, 10000);` (10000 milisegundos = 10 segundos)

# Paso 2: Crear el contenedor del mensaje.

- **Problema:** Necesitamos un lugar donde mostrar el mensaje.

- **Herramienta:** Crearemos un elemento `<div>` en HTML. Podemos darle estilo para que se vea como queremos.

- **Ejemplo:**
  ```
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.innerHTML = "Elige una opción: A o B";
  document.body.appendChild(div);
  ```

# Paso 3: Capturar la tecla presionada.

- **Problema:** Debemos saber qué tecla presiona el usuario.

- **Herramienta:** Usaremos `addEventListener` para "escuchar" el evento `keydown`.

- **Ejemplo:**
  ```
  document.addEventListener("keydown", (event) => {
  const tecla = event.key; // Obtenemos la tecla presionada
  // ... Aquí verificaremos si es A, B o Escape ...
  });
  ```

# Paso 4: Evaluar la elección del usuario.

- **Problema:** Verificar si la tecla presionada es _A_, _B_ o _Escape_, y actuar en consecuencia.

- **Herramienta:** Usaremos _if_ y _else if_ para comparar la tecla presionada.

- **Ejemplo:**
  ```
  if (tecla === "A") {
  // Mostrar mensaje: "Gracias por seleccionar A"
  } else if (tecla === "B") {
  // Mostrar mensaje: "Gracias por seleccionar B"
  } else if (tecla === "Escape") {
  // Eliminar el div
  } else {
  // Mostrar mensaje: "Opción incorrecta"
  }
  ```

# Paso 5: Eliminar el div después de 20 segundos.

- **Problema:** Asegurarse de que el div no se quede para siempre.

- **Herramienta:** Usaremos otro `setTimeout` para eliminar el div después de 20 segundos.

- **Ejemplo:**

  ```setTimeout(() => {
  document.body.removeChild(div); // Eliminar el div
  }, 20000);
  ```

# Paso 6: Combinar todo con promesas.

- **Problema:** Las promesas nos ayudan a organizar el código y manejar mejor el tiempo.

- **Herramienta:** Encapsularemos cada paso en una promesa y las conectaremos con `.then`, `.race` y `.catch`.
