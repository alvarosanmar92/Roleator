
// Cargar los datos de los personajes desde el JSON local
function cargarDatosJSON() {
    // Cargar personajes del JSON
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            mostrarDatosJSON(data);

            // Cargar personaje creado por el usuario si existe
            const personajeGuardado = JSON.parse(localStorage.getItem('personaje'));
            if (personajeGuardado) {
                data.push(personajeGuardado);
                mostrarDatosJSON(data);
            }
        })
        .catch(error => console.error('Error al cargar datos del JSON:', error));
}

// Mostrar los datos cargados del JSON en un div
function mostrarDatosJSON(personajes) {
    let datosJSONContainer = document.createElement('div');
    datosJSONContainer.id = 'datos-json-container';

    let datosJSONTitle = document.createElement('h2');
    datosJSONTitle.textContent = 'Personajes :';

    let datosJSONList = document.createElement('ul');
    personajes.forEach(personaje => {
        let listItem = document.createElement('li');
        listItem.textContent =
            'Nombre: ' + personaje.nombre + ', ' +
            'Género: ' + personaje.genero + ', ' +
            'Edad: ' + personaje.edad + ', ' +
            'Clase: ' + personaje.clase + ', ' +
            'Arma: ' + personaje.arma + ', ' +
            'Acompañante: ' + personaje.companion;

        // Botón para seleccionar el personaje
        let seleccionarButton = document.createElement('button');
        seleccionarButton.textContent = 'Seleccionar';
        seleccionarButton.addEventListener('click', function() {
            mostrarPersonajeSeleccionado(personaje);
        });

        listItem.appendChild(seleccionarButton);
        datosJSONList.appendChild(listItem);
    });

    datosJSONContainer.appendChild(datosJSONTitle);
    datosJSONContainer.appendChild(datosJSONList);

    // Agregar el contenedor de datos JSON al cuerpo del documento
    document.body.appendChild(datosJSONContainer);
}

// Función para mostrar el resumen del personaje seleccionado del JSON
function mostrarPersonajeSeleccionado(personaje) {
    // Ocultar el contenedor de bienvenida y el contenedor JSON
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('datos-json-container').style.display = 'none';

    // Mostrar el resumen del personaje seleccionado
    mostrarResumen(
        personaje.nombre,
        personaje.genero,
        clasificarEdad(personaje.edad),
        personaje.clase,
        personaje.arma,
        personaje.companion
    );

    // Mostrar el contenedor final
    document.getElementById('final-container').style.display = 'block';
        // Cambiar el fondo del cuerpo de la página
        document.body.style.backgroundImage = "url('pathFinal.jpg')"
}

// Función principal para la creación del personaje
function iniciarCreacion() {
    // Ocultar el contenedor de datos del JSON
    document.getElementById('datos-json-container').style.display = 'none';

    // Mostrar el contenedor de creación de personajes
    document.getElementById('creation-container').style.display = 'block';

    //Ocultar el contenedor de inicio
    document.getElementById('welcome-container').style.display = 'none'
}

function reiniciarProceso() {
    // Ocultar el contenedor final
    document.getElementById('final-container').style.display = 'none';

    // Limpiar el contenido del contenedor del resumen del personaje si existe
    let resumenContainer = document.getElementById('resumen-container');
    if (resumenContainer) {
        resumenContainer.innerHTML = '';
    }

    // Mostrar el contenedor de bienvenida para reiniciar el proceso
    document.getElementById('welcome-container').style.display = 'block';

    // Mostrar el contenedor de datos del JSON
    document.getElementById('datos-json-container').style.display = 'block';

    // Restaurar el fondo inicial
    document.body.style.backgroundImage = "url('forest.jpg')";

    // Mostrar nuevamente los personajes del JSON
    cargarDatosJSON();

    // Obtener el personaje creado por el usuario
    const personajeGuardado = JSON.parse(localStorage.getItem('personaje'));
    if (personajeGuardado) {
        // Agregar el personaje creado por el usuario al listado de personajes del JSON
        fetch('datos.json')
            .then(response => response.json())
            .then(data => {
                data.push(personajeGuardado);
                mostrarDatosJSON(data);
            })
            .catch(error => console.error('Error al cargar datos del JSON:', error));
    }

}



function crearPersonaje() {
    // Capturar datos del usuario a través de inputs
    let nombre = document.getElementById('nombre').value;
    let genero = document.getElementById('genero').value;
    let edad = parseInt(document.getElementById('edad').value);
    let clase = document.getElementById('clase').value;
    let arma = document.getElementById('arma').value;
    let companion = document.getElementById('companion').value;

    // Validar opciones de género
    if (!validarGenero(genero)) {
        Swal.fire({
            title: 'Error!',
            text: 'El género ingresado no es válido. Por favor, elige entre Femenino, Masculino o No Binario',
            icon: 'error',
            confirmButtonText: 'Voy a ello'
          });
        return;
    }

    // Validar rango de edad
    if (isNaN(edad) || edad < 10 || edad > 80) {
        Swal.fire({
            title: 'Error!',
            text: 'La edad ingresada no es válida. Por favor, ingresa un número entre 10 y 80',
            icon: 'error',
            confirmButtonText: 'Voy a ello'
          });
        return;
    }

    // Validar opciones de clase
    if (!validarClase(clase)) {
        Swal.fire({
            title: 'Error!',
            text: 'La clase ingresada no es válida. Por favor, elige entre Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino o Bufón',
            icon: 'error',
            confirmButtonText: 'Voy a ello'
          });
        return;
    }

    // Validar opciones de arma
    if (!validarArma(arma)) {
        Swal.fire({
            title: 'Error!',
            text: 'El tipo de arma ingresado no es válido. Por favor, elige entre Espada, Arco, Vara Mágica, Daga o Martillo',
            icon: 'error',
            confirmButtonText: 'Voy a ello'
          });
        return;
    }

    // Clasificar edad
    let clasificacionEdad = clasificarEdad(edad);

    // Mostrar resumen del personaje
    mostrarResumen(nombre, genero, clasificacionEdad, clase, arma, companion);

    // Almacenar datos en el almacenamiento local
    guardarDatosEnStorage(nombre, genero, edad, clase, arma, companion);

    // Ocultar contenedor de creación
    document.getElementById('creation-container').style.display = 'none';

    // Ocultar contenedor Bienvenida
    document.getElementById('welcome-container').style.display = 'none';

    // Mostrar contenedor final
    document.getElementById('final-container').style.display = 'block';



    // Cambiar el fondo del cuerpo de la página
    document.body.style.backgroundImage = "url('/pathFinal.jpg')";
}

// Función para validar opciones de género
function validarGenero(genero) {
    return ["Femenino", "Masculino", "No Binario"].includes(genero);
}

// Función para validar opciones de clase
function validarClase(clase) {
    return ["Bárbaro", "Samurái", "Erudito", "Mago", "Sanador", "Asesino", "Bufón"].includes(clase);
}

// Función para validar opciones de arma
function validarArma(arma) {
    return ["Espada", "Arco", "Vara Mágica", "Daga", "Martillo"].includes(arma);
}

// Función para clasificar la edad
function clasificarEdad(edad) {
    if (edad >= 10 && edad <= 20) {
        return "Adolescente";
    } else if (edad > 20 && edad <= 35) {
        return "Joven";
    } else if (edad > 35 && edad <= 50) {
        return "Senior";
    } else if (edad > 50 && edad <= 80) {
        return "Anciano";
    } else {
        return "Edad no clasificada";
    }
}

// Función para mostrar el resumen del personaje
function mostrarResumen(nombre, genero, clasificacionEdad, clase, arma, companion) {
    // Crear elemento de resumen
    let resumenContainer = document.createElement('div');
    resumenContainer.id = 'resumen-container';

    // Crear elementos de resumen
    let resumenTitle = document.createElement('h2');
    resumenTitle.textContent = 'Resumen del Personaje:';

    let resumenText = document.createElement('p');
    resumenText.textContent =
        'Nombre: ' + nombre + '\n' +
        'Género: ' + genero + '\n' +
        'Edad: ' + clasificacionEdad + '\n' +
        'Clase: ' + clase + '\n' +
        'Tipo de Arma: ' + arma + '\n' +
        'Acompañante: ' + companion;

    // Agregar elementos al contenedor de resumen
    resumenContainer.appendChild(resumenTitle);
    resumenContainer.appendChild(resumenText);

    // Obtener contenedor final y agregar el resumen
    let finalContainer = document.getElementById('final-container');
    finalContainer.appendChild(resumenContainer);
}

// Función para guardar datos en el almacenamiento local
function guardarDatosEnStorage(nombre, genero, edad, clase, arma, companion) {
    let personaje = {
        nombre: nombre,
        genero: genero,
        edad: edad,
        clase: clase,
        arma: arma,
        companion: companion
    };

    // Convertir a cadena JSON y guardar en el almacenamiento local
    localStorage.setItem('personaje', JSON.stringify(personaje));
}

// Cargar los datos de los personajes desde el JSON local
function cargarDatosDesdeJSON() {
    return fetch('personajes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos del JSON');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Ejecutar la función de inicio al cargar la página
window.onload = function () {
    cargarDatosDesdeJSON()
        .then(personajes => {
            // Mostrar los datos cargados del JSON en un div
            mostrarDatosJSON(personajes);
        })
        .catch(error => {
            console.error('Error al cargar los datos del JSON:', error);
        });

    // Ocultar el contenedor de creación de personajes y el contenedor final
    document.getElementById('creation-container').style.display = 'none';
    document.getElementById('final-container').style.display = 'none';
};
