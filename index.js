$(document).ready(function() {
    $('#creation-container').hide();
    $('#final-container').hide();

    $('#crear-desde-cero').click(function() {
        iniciarCreacion();
    });

    $('#usar-personaje').click(function() {
        cargarPersonajes();
    });

    $('#crear-personaje').click(function() {
        crearPersonaje();
    });

    $('#restart-button').click(function() {
        reiniciarProceso();
    });
});

function iniciarCreacion() {
    $('#welcome-container').hide();
    $('#creation-container').show();
}

function cargarPersonajes() {
    $('#welcome-container').hide();
    $('#use-character-container').show();

    $.getJSON('personajes.json', function(data) {
        $.each(data, function(key, personaje) {
            var button = $('<button></button>').text(personaje.nombre).click(function() {
                mostrarDetalles(personaje);
            });
            $('#characters-list').append(button);
        });
    });
}

function mostrarDetalles(personaje) {
    $('#detalles-personaje').empty();
    $('#detalles-personaje').append('<h2>' + personaje.nombre + '</h2>');
    $('#detalles-personaje').append('<p>Género: ' + personaje.genero + '</p>');
    // Agregar más detalles según sea necesario (edad, clase, arma, etc.)
}

function crearPersonaje() {
    var nombre = $('#nombre').val();
    var genero = $('#genero').val();
    var edad = parseInt($('#edad').val());
    var clase = $('#clase').val();
    var arma = $('#arma').val();
    var companion = $('#companero').val();

    // Validaciones
    if (!validarGenero(genero)) {
        alert("Error: El género ingresado no es válido. Por favor, elige entre Femenino, Masculino o No Binario.");
        return;
    }

    if (isNaN(edad) || edad < 10 || edad > 80) {
        alert("Error: La edad ingresada no es válida. Por favor, ingresa un número entre 10 y 80.");
        return;
    }

    if (!validarClase(clase)) {
        alert("Error: La clase ingresada no es válida. Por favor, elige entre Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino o Bufón.");
        return;
    }

    if (!validarArma(arma)) {
        alert("Error: El tipo de arma ingresado no es válido. Por favor, elige entre Espada, Arco, Vara Mágica, Daga o Martillo.");
        return;
    }

    // Operaciones adicionales...

    mostrarResumen(nombre, genero, edad, clase, arma, companion);

    // Guardar el personaje en el almacenamiento local
    guardarPersonajeEnStorage(nombre, genero, edad, clase, arma, companion);

    $('#creation-container').hide();
    $('#final-container').show();
}

function reiniciarProceso() {
    $('#final-container').hide();
    $('#creation-container').show();
}

function validarGenero(genero) {
    return ["Femenino", "Masculino", "No Binario"].includes(genero);
}

function validarClase(clase) {
    return ["Bárbaro", "Samurái", "Erudito", "Mago", "Sanador", "Asesino", "Bufón"].includes(clase);
}

function validarArma(arma) {
    return ["Espada", "Arco", "Vara Mágica", "Daga", "Martillo"].includes(arma);
}

function mostrarResumen(nombre, genero, edad, clase, arma, companion) {
    var resumenContainer = $('<div></div>').attr('id', 'resumen-container');
    var resumenTitle = $('<h2></h2>').text('Resumen del Personaje:').css('font-weight', 'bold');
    var resumenText = $('<p></p>').html(
        'Nombre: ' + nombre + '<br>' +
        'Género: ' + genero + '<br>' +
        'Edad: ' + edad + '<br>' +
        'Clase: ' + clase + '<br>' +
        'Tipo de Arma: ' + arma + '<br>' +
        'Acompañante: ' + companion
    );

    resumenContainer.append(resumenTitle, resumenText);
    $('#final-container').append(resumenContainer);
}

function guardarPersonajeEnStorage(nombre, genero, edad, clase, arma, companion) {
    // Obtener los personajes guardados del almacenamiento local
    var personajesGuardados = JSON.parse(localStorage.getItem('personajes')) || [];

    // Crear un nuevo objeto para el personaje actual
    var nuevoPersonaje = {
        nombre: nombre,
        genero: genero,
        edad: edad,
        clase: clase,
        arma: arma,
        companion: companion
    };

    // Agregar el nuevo personaje al arreglo de personajes guardados
    personajesGuardados.push(nuevoPersonaje);

    // Guardar el arreglo actualizado en el almacenamiento local
    localStorage.setItem('personajes', JSON.stringify(personajesGuardados));
}
