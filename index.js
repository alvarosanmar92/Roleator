// Array para almacenar la información del personaje
let personaje = {};

// Función para mostrar el mensaje final y cambiar la interfaz
function mostrarMensajeFinal() {
    // Ocultar el botón y mostrar el mensaje final
    document.querySelector('button').style.display = 'none';
    document.getElementById('mensajeFinal').style.display = 'block';
}

// Función principal para la creación del personaje
function crearPersonaje() {
    // Capturar datos del usuario a través de prompts
    personaje.nombre = prompt("Ingresa el nombre del personaje:");
    personaje.genero = prompt("Ingresa el género del personaje (Femenino, Masculino, No Binario):");

    // Validar opciones de género
    while (!validarGenero(personaje.genero)) {
        alert("Error: El género ingresado no es válido. Por favor, elige entre Femenino, Masculino o No Binario.");
        personaje.genero = prompt("Ingresa el género del personaje (Femenino, Masculino, No Binario):");
    }

    personaje.edad = parseInt(prompt("Ingresa la edad del personaje (10-80):"));

    // Validar rango de edad
    while (isNaN(personaje.edad) || personaje.edad < 10 || personaje.edad > 80) {
        alert("Error: La edad ingresada no es válida. Por favor, ingresa un número entre 10 y 80.");
        personaje.edad = parseInt(prompt("Ingresa la edad del personaje (10-80):"));
    }

    personaje.clase = prompt("Ingresa la clase del personaje (Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino, Bufón):");

    // Validar opciones de clase
    while (!validarClase(personaje.clase)) {
        alert("Error: La clase ingresada no es válida. Por favor, elige entre Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino o Bufón.");
        personaje.clase = prompt("Ingresa la clase del personaje (Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino, Bufón):");
    }

    // Mostrar habilidades asociadas a la clase
    alert("Habilidades asociadas a la clase " + personaje.clase + ":\n\n" + obtenerHabilidades(personaje.clase).join(", "));

    // Confirmar o cambiar la elección de clase
    let confirmacionClase = confirm("Has elegido la clase " + personaje.clase + ". ¿Quieres confirmar esta elección?\n\nAceptar para confirmar, Cancelar para cambiar la clase.");

    if (!confirmacionClase) {
        personaje.clase = prompt("Ingresa la nueva clase del personaje (Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino, Bufón):");

        // Validar opciones de clase nuevamente
        while (!validarClase(personaje.clase)) {
            alert("Error: La clase ingresada no es válida. Por favor, elige entre Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino o Bufón.");
            personaje.clase = prompt("Ingresa la nueva clase del personaje (Bárbaro, Samurái, Erudito, Mago, Sanador, Asesino, Bufón):");
        }
    }

    personaje.arma = prompt("Ingresa el tipo de arma del personaje (Espada, Arco, Vara Mágica, Daga, Martillo):");

    // Validar opciones de arma
    while (!validarArma(personaje.arma)) {
        alert("Error: El tipo de arma ingresado no es válido. Por favor, elige entre Espada, Arco, Vara Mágica, Daga o Martillo.");
        personaje.arma = prompt("Ingresa el tipo de arma del personaje (Espada, Arco, Vara Mágica, Daga, Martillo):");
    }

    personaje.companion = prompt("Ingresa el nombre del acompañante del personaje:");

    // Clasificar edad
    personaje.clasificacionEdad = clasificarEdad(personaje.edad);

    // Mostrar resumen del personaje a través de alert
    mostrarResumen(personaje);
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

// Función para obtener las habilidades de una clase
function obtenerHabilidades(clase) {
    switch (clase) {
        case "Bárbaro":
            return ["Fuerza bruta", "Defensa Personal"];
        case "Samurái":
            return ["Calma placentera", "Corte maestro"];
        case "Erudito":
            return ["Resolvedor de problemas", "Sabiduría ancestral"];
        case "Mago":
            return ["Chispa final", "Hielo fatuo"];
        case "Sanador":
            return ["Cántico sanador", "Resucitación de fénix"];
        case "Asesino":
            return ["Muerte silenciosa", "Pincho venenoso"];
        case "Bufón":
            return ["Cántico calmante", "Influencia máxima"];
        default:
            return [];
    }
}

// Función de alert
function mostrarResumen(personaje) {
    let resumen = "Resumen del Personaje:\n\n" +
                  "Nombre: " + personaje.nombre + "\n" +
                  "Género: " + personaje.genero + "\n" +
                  "Edad: " + personaje.clasificacionEdad + "\n" +
                  "Clase: " + personaje.clase + "\n" +
                  "Habilidades: " + obtenerHabilidades(personaje.clase).join(", ") + "\n" +
                  "Tipo de Arma: " + personaje.arma + "\n" +
                  "Acompañante: " + personaje.companion;

    alert(resumen);

    // Confirmación final
    let confirmacionFinal = confirm("¿Estás contento con tu personaje?\n\nAceptar para comenzar tu aventura con este personaje, Cancelar para reiniciar el proceso.");

    if (confirmacionFinal) {
       mostrarMensajeFinal();
    } else {
        // Reiniciar el proceso
        crearPersonaje();
    }
}

// Función para iniciar la creación de personaje desde el botón del HTML
function iniciarCreacionPersonaje() {
    crearPersonaje();
}
