// Obtener el canvas y su contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Tamaño de cada celda del laberinto
const tamañoCelda = 40;

// Definir el laberinto (0 = vacío, 1 = pared, 2 = meta)
const laberinto = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Posición inicial del jugador
let jugador = {
    x: 1,
    y: 1
};

// Variables del cronómetro
let tiempoInicio = Date.now();
let juegoActivo = true;
let intervaloTiempo;

// Sonidos del juego
const sonidoPasos = new Audio('assets/pasos.mp3');
const sonidoVictoria = new Audio('assets/victoria.mp3');

// Función para dibujar el laberinto
function dibujarLaberinto() {
    for (let fila = 0; fila < laberinto.length; fila++) {
        for (let col = 0; col < laberinto[fila].length; col++) {
            if (laberinto[fila][col] === 1) {
                // Dibujar pared
                ctx.fillStyle = '#000000';
                ctx.fillRect(col * tamañoCelda, fila * tamañoCelda, tamañoCelda, tamañoCelda);
            } else if (laberinto[fila][col] === 2) {
                // Dibujar meta
                ctx.fillStyle = '#4caf50';
                ctx.fillRect(col * tamañoCelda, fila * tamañoCelda, tamañoCelda, tamañoCelda);
            }
        }
    }
}

// Función para dibujar al jugador
function dibujarJugador() {
    ctx.fillStyle = '#2196f3';
    ctx.fillRect(
        jugador.x * tamañoCelda + 5,
        jugador.y * tamañoCelda + 5,
        tamañoCelda - 10,
        tamañoCelda - 10
    );
}

// Función para actualizar el cronómetro
function actualizarCronometro() {
    if (!juegoActivo) return;

    const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
    const minutos = Math.floor(tiempoTranscurrido / 60);
    const segundos = tiempoTranscurrido % 60;

    document.getElementById('cronometro').textContent =
        `${minutos}:${segundos.toString().padStart(2, '0')}`;
}

// Función para verificar si hay colisión
function hayColision(x, y) {
    if (x < 0 || x >= laberinto[0].length || y < 0 || y >= laberinto.length) {
        return true;
    }
    return laberinto[y][x] === 1;
}

// Función para mover al jugador
function moverJugador(dx, dy) {
    if (!juegoActivo) return;

    const nuevaX = jugador.x + dx;
    const nuevaY = jugador.y + dy;

    // Verificar colisión con paredes
    if (!hayColision(nuevaX, nuevaY)) {
        jugador.x = nuevaX;
        jugador.y = nuevaY;

        // Reproducir sonido de pasos
        sonidoPasos.currentTime = 0;
        sonidoPasos.play();

        // Verificar si llegó a la meta
        if (laberinto[jugador.y][jugador.x] === 2) {
            ganarJuego();
        }

        dibujar();
    }
}

// Función cuando el jugador gana
function ganarJuego() {
    juegoActivo = false;
    clearInterval(intervaloTiempo);

    // Reproducir sonido de victoria
    sonidoVictoria.play();

    // Mostrar mensaje de victoria
    const tiempoFinal = document.getElementById('cronometro').textContent;
    document.getElementById('tiempo-final').textContent = tiempoFinal;
    document.getElementById('mensaje-victoria').classList.remove('oculto');
}

// Función principal de dibujo
function dibujar() {
    // Limpiar el canvas
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar laberinto y jugador
    dibujarLaberinto();
    dibujarJugador();
}

// Controles del teclado (WASD)
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w':
            moverJugador(0, -1);
            break;
        case 's':
            moverJugador(0, 1);
            break;
        case 'a':
            moverJugador(-1, 0);
            break;
        case 'd':
            moverJugador(1, 0);
            break;
    }
});

// Iniciar el juego
function iniciarJuego() {
    dibujar();
    intervaloTiempo = setInterval(actualizarCronometro, 1000);
}

// Ejecutar el juego al cargar la página
iniciarJuego();
