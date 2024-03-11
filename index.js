// Función principal para la creación del personaje
function iniciarCreacion() {
    // Ocultar contenedor de bienvenida
    document.getElementById('welcome-container').style.display = 'none';

    // Mostrar contenedor de creación
    document.getElementById('creation-container').style.display = 'block';
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
        alert("Error: El género ingresado no es válido. Por favor, elige entre Femenino, Masculino o No Binario.");
        return;
    }

    // Validar rango de edad
    if (isNaN(edad) || edad < 10 || edad > 80) {
        alert("Error: La edad ingresada no es válida. Por favor, ingresa un número entre 10 y 80.");
        return;
    }

    // Validar opciones de clase
    if (!validarClase(clase)) {
        alert("Error: La clase ingresada no es válida. Por favor, elige entre Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino o Bufón.");
        return;
    }

    // Validar opciones de arma
    if (!validarArma(arma)) {
        alert("Error: El tipo de arma ingresado no es válido. Por favor, elige entre Espada, Arco, Vara Mágica, Daga o Martillo.");
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

    // Mostrar contenedor final
    document.getElementById('final-container').style.display = 'block';
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

// Ejecutar la función de inicio al cargar la página
window.onload = function () {
    document.getElementById('creation-container').style.display = 'none';
    document.getElementById('final-container').style.display = 'none';
};

