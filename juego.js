// ==================== MAZE HUNTERS ====================
// Juego arcade inspirado en clásicos como Pac-Man

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Configuración del juego
const config = {
    ancho: 800,
    alto: 600,
    tamañoCelda: 40
};

// Estados del juego
const PANTALLAS = {
    INICIO: 'inicio',
    SELECCION_NIVEL: 'seleccion',
    JUGANDO: 'jugando',
    GAME_OVER: 'gameover',
    VICTORIA: 'victoria'
};

// Variables globales
let pantallaActual = PANTALLAS.INICIO;
let nivelActual = 1;
let nivelesDesbloqueados = 1;
let tiempoInicio = 0;
let intervaloTiempo = null;
let animacionFrame = null;
let tiempoAnimacion = 0;

// Variables del jugador
let jugador = {
    x: 0,
    y: 0,
    vidas: 3,
    vidaMaxima: 100,
    vidaActual: 100,
    invulnerable: false,
    tiempoInvulnerable: 0,
    velocidad: 0.15
};

// Listas de entidades
let mapaActual = [];
let enemigos = [];
let proyectiles = [];

// Temas visuales por nivel
const temas = {
    1: {
        nombre: "Neón Azul",
        fondo: ['#0a0a1a', '#1a1a2e'],
        pared: '#00d4ff',
        jugador: '#00ffff',
        enemigo: '#ff00ff',
        portal: '#00ff00',
        proyectil: '#ff00ff'
    },
    2: {
        nombre: "Lava",
        fondo: ['#1a0000', '#3d0000'],
        pared: '#ff4500',
        jugador: '#ffaa00',
        enemigo: '#ff0000',
        portal: '#00ff00',
        proyectil: '#ff6600'
    },
    3: {
        nombre: "Bosque Oscuro",
        fondo: ['#0a1a0a', '#1a2e1a'],
        pared: '#2d5016',
        jugador: '#90ee90',
        enemigo: '#8b0000',
        portal: '#ffff00',
        proyectil: '#8b4513'
    }
};

// Definir los 3 niveles
const niveles = {
    1: {
        nombre: "Nivel 1 - Neón",
        mapa: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        jugadorInicio: { x: 1, y: 1 },
        enemigos: [
            { x: 10, y: 5, tipo: 'cazador' },
            { x: 15, y: 9, tipo: 'tirador' }
        ]
    },
    2: {
        nombre: "Nivel 2 - Lava",
        mapa: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        jugadorInicio: { x: 1, y: 1 },
        enemigos: [
            { x: 5, y: 3, tipo: 'cazador' },
            { x: 10, y: 7, tipo: 'tirador' },
            { x: 15, y: 9, tipo: 'cazador' }
        ]
    },
    3: {
        nombre: "Nivel 3 - Bosque",
        mapa: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        jugadorInicio: { x: 1, y: 1 },
        enemigos: [
            { x: 5, y: 5, tipo: 'cazador' },
            { x: 10, y: 3, tipo: 'tirador' },
            { x: 15, y: 7, tipo: 'cazador' },
            { x: 10, y: 11, tipo: 'tirador' }
        ]
    }
};

// Sonidos del juego
const sonidos = {
    pasos: new Audio('assets/pasos.mp3'),
    disparo: new Audio('assets/disparo.mp3'),
    daño: new Audio('assets/daño.mp3'),
    victoria: new Audio('assets/victoria.mp3'),
    gameOver: new Audio('assets/gameover.mp3')
};

// Configurar volumen
Object.values(sonidos).forEach(audio => {
    audio.volume = 0.3;
});

// ==================== FUNCIONES DE PANTALLAS ====================

function dibujarPantallaInicio() {
    const tema = temas[1];

    // Fondo degradado
    const gradient = ctx.createLinearGradient(0, 0, 0, config.alto);
    gradient.addColorStop(0, tema.fondo[0]);
    gradient.addColorStop(1, tema.fondo[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Partículas de fondo
    dibujarParticulas();

    // Título con efecto de animación
    ctx.save();
    const escala = 1 + Math.sin(tiempoAnimacion * 0.002) * 0.05;
    ctx.translate(config.ancho / 2, 150);
    ctx.scale(escala, escala);

    ctx.fillStyle = tema.pared;
    ctx.font = 'bold 70px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = tema.pared;
    ctx.shadowBlur = 30;
    ctx.fillText('MAZE HUNTERS', 0, 0);
    ctx.shadowBlur = 0;
    ctx.restore();

    // Subtítulo
    ctx.fillStyle = '#ffffff';
    ctx.font = '22px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Sobrevive al laberinto', config.ancho / 2, 220);

    // Botón Jugar
    const btnJugar = { x: 250, y: 300, ancho: 300, alto: 60 };
    ctx.fillStyle = tema.pared;
    ctx.fillRect(btnJugar.x, btnJugar.y, btnJugar.ancho, btnJugar.alto);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('JUGAR', config.ancho / 2, btnJugar.y + 42);

    // Botón Niveles
    const btnNiveles = { x: 250, y: 390, ancho: 300, alto: 60 };
    ctx.fillStyle = '#5f27cd';
    ctx.fillRect(btnNiveles.x, btnNiveles.y, btnNiveles.ancho, btnNiveles.alto);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('SELECCIONAR NIVEL', config.ancho / 2, btnNiveles.y + 40);

    // Instrucciones
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.fillText('Usa las FLECHAS del teclado para moverte', config.ancho / 2, 500);
    ctx.fillText('Evita a los enemigos y sus disparos', config.ancho / 2, 530);
    ctx.fillText('Llega al portal para ganar', config.ancho / 2, 560);
}

function dibujarPantallaSeleccionNivel() {
    const tema = temas[1];

    // Fondo
    const gradient = ctx.createLinearGradient(0, 0, 0, config.alto);
    gradient.addColorStop(0, tema.fondo[0]);
    gradient.addColorStop(1, tema.fondo[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Título
    ctx.fillStyle = tema.pared;
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SELECCIONA UN NIVEL', config.ancho / 2, 100);

    // Dibujar los 3 niveles
    const espacioY = 180;
    for (let i = 1; i <= 3; i++) {
        const y = espacioY + (i - 1) * 100;
        const desbloqueado = i <= nivelesDesbloqueados;
        const temaColor = temas[i].pared;

        // Caja del nivel
        ctx.fillStyle = desbloqueado ? temaColor : '#555555';
        ctx.fillRect(200, y, 400, 70);

        // Texto del nivel
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 28px Arial';
        const texto = desbloqueado ? niveles[i].nombre : '🔒 Bloqueado';
        ctx.fillText(texto, config.ancho / 2, y + 45);
    }

    // Botón volver
    ctx.fillStyle = '#ff4757';
    ctx.fillRect(300, 500, 200, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 25px Arial';
    ctx.fillText('VOLVER', config.ancho / 2, 535);
}

function dibujarPantallaJuego() {
    const tema = temas[nivelActual];

    // Fondo del canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, config.alto);
    gradient.addColorStop(0, tema.fondo[0]);
    gradient.addColorStop(1, tema.fondo[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Dibujar elementos del juego
    dibujarLaberinto();
    dibujarProyectiles();
    dibujarEnemigos();
    dibujarJugador();
    dibujarMeta();

    // Efecto de daño (flash rojo)
    if (jugador.invulnerable && tiempoAnimacion % 200 < 100) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, 0, config.ancho, config.alto);
    }
}

function dibujarPantallaGameOver() {
    // Overlay oscuro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Título
    ctx.fillStyle = '#ff4757';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ff4757';
    ctx.shadowBlur = 30;
    ctx.fillText('GAME OVER', config.ancho / 2, 200);
    ctx.shadowBlur = 0;

    // Mensaje
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px Arial';
    ctx.fillText('Has sido derrotado', config.ancho / 2, 280);

    // Botón reintentar
    ctx.fillStyle = '#00d4ff';
    ctx.fillRect(250, 340, 300, 60);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('REINTENTAR', config.ancho / 2, 380);

    // Botón menú
    ctx.fillStyle = '#5f27cd';
    ctx.fillRect(250, 420, 300, 60);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('MENÚ PRINCIPAL', config.ancho / 2, 460);
}

function dibujarPantallaVictoria() {
    // Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Título
    const tema = temas[nivelActual];
    ctx.fillStyle = tema.portal;
    ctx.font = 'bold 70px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = tema.portal;
    ctx.shadowBlur = 30;
    ctx.fillText('¡NIVEL COMPLETADO!', config.ancho / 2, 180);
    ctx.shadowBlur = 0;

    // Tiempo y vidas
    const tiempoFinal = document.getElementById('cronometro').textContent;
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px Arial';
    ctx.fillText(`Tiempo: ${tiempoFinal}`, config.ancho / 2, 240);
    ctx.fillText(`Vidas restantes: ${jugador.vidas}`, config.ancho / 2, 280);

    // Botones
    if (nivelActual < 3) {
        ctx.fillStyle = tema.pared;
        ctx.fillRect(250, 340, 300, 60);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('SIGUIENTE NIVEL', config.ancho / 2, 380);
    } else {
        ctx.fillStyle = '#4caf50';
        ctx.fillRect(250, 340, 300, 60);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 28px Arial';
        ctx.fillText('¡JUEGO COMPLETADO!', config.ancho / 2, 380);
    }

    ctx.fillStyle = '#5f27cd';
    ctx.fillRect(250, 420, 300, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('MENÚ PRINCIPAL', config.ancho / 2, 460);
}

// ==================== FUNCIONES DE DIBUJO ====================

function dibujarLaberinto() {
    const tema = temas[nivelActual];

    for (let fila = 0; fila < mapaActual.length; fila++) {
        for (let col = 0; col < mapaActual[fila].length; col++) {
            const x = col * config.tamañoCelda;
            const y = fila * config.tamañoCelda;

            if (mapaActual[fila][col] === 1) {
                // Pared con efecto brillante
                ctx.fillStyle = tema.pared;
                ctx.shadowColor = tema.pared;
                ctx.shadowBlur = 5;
                ctx.fillRect(x + 2, y + 2, config.tamañoCelda - 4, config.tamañoCelda - 4);
                ctx.shadowBlur = 0;
            }
        }
    }
}

function dibujarJugador() {
    const tema = temas[nivelActual];
    const x = jugador.x * config.tamañoCelda + config.tamañoCelda / 2;
    const y = jugador.y * config.tamañoCelda + config.tamañoCelda / 2;
    const radio = config.tamañoCelda * 0.35;

    // Efecto de parpadeo si es invulnerable
    if (jugador.invulnerable && Math.floor(tiempoAnimacion / 100) % 2 === 0) {
        return;
    }

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.arc(x + 2, y + 2, radio, 0, Math.PI * 2);
    ctx.fill();

    // Jugador con brillo
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);
    ctx.fillStyle = tema.jugador;
    ctx.shadowColor = tema.jugador;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Borde
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function dibujarMeta() {
    const tema = temas[nivelActual];

    // Encontrar posición de la meta
    let metaX = 0, metaY = 0;
    for (let fila = 0; fila < mapaActual.length; fila++) {
        for (let col = 0; col < mapaActual[fila].length; col++) {
            if (mapaActual[fila][col] === 2) {
                metaX = col * config.tamañoCelda + config.tamañoCelda / 2;
                metaY = fila * config.tamañoCelda + config.tamañoCelda / 2;
            }
        }
    }

    // Animación pulsante
    const pulso = Math.sin(tiempoAnimacion * 0.005) * 4 + 16;

    // Portal exterior
    ctx.beginPath();
    ctx.arc(metaX, metaY, pulso + 6, 0, Math.PI * 2);
    ctx.fillStyle = tema.portal + '40';
    ctx.fill();

    // Portal interior
    ctx.beginPath();
    ctx.arc(metaX, metaY, pulso, 0, Math.PI * 2);
    ctx.fillStyle = tema.portal;
    ctx.shadowColor = tema.portal;
    ctx.shadowBlur = 25;
    ctx.fill();
    ctx.shadowBlur = 0;
}

function dibujarEnemigos() {
    const tema = temas[nivelActual];

    enemigos.forEach(enemigo => {
        const x = enemigo.x * config.tamañoCelda + config.tamañoCelda / 2;
        const y = enemigo.y * config.tamañoCelda + config.tamañoCelda / 2;
        const latido = Math.sin(tiempoAnimacion * 0.008) * 2 + 13;

        // Sombra
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(x + 2, y + 2, latido, 0, Math.PI * 2);
        ctx.fill();

        // Enemigo
        ctx.beginPath();
        ctx.arc(x, y, latido, 0, Math.PI * 2);
        ctx.fillStyle = tema.enemigo;
        ctx.shadowColor = tema.enemigo;
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Indicador de tipo (tirador tiene un punto)
        if (enemigo.tipo === 'tirador') {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function dibujarProyectiles() {
    const tema = temas[nivelActual];

    proyectiles.forEach(proyectil => {
        const x = proyectil.x * config.tamañoCelda + config.tamañoCelda / 2;
        const y = proyectil.y * config.tamañoCelda + config.tamañoCelda / 2;

        // Efecto de estela
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = tema.proyectil + '40';
        ctx.fill();

        // Proyectil
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = tema.proyectil;
        ctx.shadowColor = tema.proyectil;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function dibujarBarraVida() {
    const anchoTotal = 200;
    const alto = 20;
    const x = 10;
    const y = 10;

    // Fondo de la barra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x - 2, y - 2, anchoTotal + 4, alto + 4);

    // Barra de vida actual
    const anchoVida = (jugador.vidaActual / jugador.vidaMaxima) * anchoTotal;

    // Color basado en la vida
    let colorVida;
    if (jugador.vidaActual > 60) colorVida = '#4caf50';
    else if (jugador.vidaActual > 30) colorVida = '#ff9800';
    else colorVida = '#ff4757';

    ctx.fillStyle = colorVida;
    ctx.fillRect(x, y, anchoVida, alto);

    // Borde
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, anchoTotal, alto);

    // Texto de vida
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${Math.ceil(jugador.vidaActual)}/${jugador.vidaMaxima}`, x + 5, y + 15);
}

function dibujarParticulas() {
    const tema = temas[nivelActual];

    for (let i = 0; i < 30; i++) {
        const x = (i * 50 + tiempoAnimacion * 0.1) % config.ancho;
        const y = (i * 30 + Math.sin(tiempoAnimacion * 0.001 + i) * 20) % config.alto;

        ctx.fillStyle = tema.pared + '20';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==================== FUNCIONES DE LÓGICA ====================

function cargarNivel(nivel) {
    nivelActual = nivel;
    const datosNivel = niveles[nivel];

    // Copiar mapa
    mapaActual = datosNivel.mapa.map(fila => [...fila]);

    // Posicionar jugador
    jugador.x = datosNivel.jugadorInicio.x;
    jugador.y = datosNivel.jugadorInicio.y;
    jugador.vidas = 3;
    jugador.vidaActual = jugador.vidaMaxima;
    jugador.invulnerable = false;

    // Crear enemigos
    enemigos = datosNivel.enemigos.map(e => ({
        x: e.x,
        y: e.y,
        tipo: e.tipo,
        direccionX: 0,
        direccionY: 0,
        velocidad: e.tipo === 'cazador' ? 0.04 : 0.03,
        cooldownDisparo: 0,
        estado: 'patrulla',
        objetivoX: e.x,
        objetivoY: e.y
    }));

    // Limpiar proyectiles
    proyectiles = [];

    // Actualizar HUD
    document.getElementById('nivel-actual').textContent = nivel;
    actualizarHUD();
    document.getElementById('hud').classList.remove('oculto');

    // Iniciar cronómetro
    tiempoInicio = Date.now();
    if (intervaloTiempo) clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(actualizarCronometro, 100);
}

function moverJugador(dx, dy) {
    if (pantallaActual !== PANTALLAS.JUGANDO) return;

    const nuevaX = jugador.x + dx * jugador.velocidad;
    const nuevaY = jugador.y + dy * jugador.velocidad;

    // Verificar colisión con paredes
    if (!hayColision(nuevaX, nuevaY)) {
        jugador.x = nuevaX;
        jugador.y = nuevaY;

        // Verificar si llegó a la meta
        const gridX = Math.round(jugador.x);
        const gridY = Math.round(jugador.y);
        if (mapaActual[gridY] && mapaActual[gridY][gridX] === 2) {
            nivelCompletado();
        }
    }
}

function hayColision(x, y) {
    const gridX = Math.floor(x);
    const gridY = Math.floor(y);

    if (gridX < 0 || gridX >= mapaActual[0].length || gridY < 0 || gridY >= mapaActual.length) {
        return true;
    }
    return mapaActual[gridY][gridX] === 1;
}

function actualizarEnemigos() {
    if (pantallaActual !== PANTALLAS.JUGANDO) return;

    enemigos.forEach(enemigo => {
        // Calcular distancia al jugador
        const distancia = Math.sqrt(
            Math.pow(jugador.x - enemigo.x, 2) +
            Math.pow(jugador.y - enemigo.y, 2)
        );

        // Cambiar estado según distancia
        if (distancia < 8) {
            enemigo.estado = 'persiguiendo';
        } else {
            enemigo.estado = 'patrulla';
        }

        // Comportamiento según estado
        if (enemigo.estado === 'persiguiendo' && enemigo.tipo === 'cazador') {
            // Perseguir al jugador
            const dx = jugador.x - enemigo.x;
            const dy = jugador.y - enemigo.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0) {
                const nuevaX = enemigo.x + (dx / dist) * enemigo.velocidad;
                const nuevaY = enemigo.y + (dy / dist) * enemigo.velocidad;

                if (!hayColision(nuevaX, nuevaY)) {
                    enemigo.x = nuevaX;
                    enemigo.y = nuevaY;
                }
            }
        } else if (enemigo.tipo === 'tirador') {
            // El tirador dispara al jugador
            enemigo.cooldownDisparo--;
            if (enemigo.cooldownDisparo <= 0 && distancia < 10) {
                crearProyectil(enemigo);
                enemigo.cooldownDisparo = 120; // 2 segundos aproximadamente
            }
        }

        // Verificar colisión con jugador
        if (distancia < 0.7 && !jugador.invulnerable) {
            recibirDaño(35);
        }
    });
}

function crearProyectil(enemigo) {
    const dx = jugador.x - enemigo.x;
    const dy = jugador.y - enemigo.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
        proyectiles.push({
            x: enemigo.x,
            y: enemigo.y,
            velocidadX: (dx / dist) * 0.12,
            velocidadY: (dy / dist) * 0.12
        });

        try {
            sonidos.disparo.currentTime = 0;
            sonidos.disparo.play().catch(() => {});
        } catch (e) {}
    }
}

function actualizarProyectiles() {
    if (pantallaActual !== PANTALLAS.JUGANDO) return;

    proyectiles = proyectiles.filter(proyectil => {
        proyectil.x += proyectil.velocidadX;
        proyectil.y += proyectil.velocidadY;

        // Eliminar si choca con pared
        if (hayColision(proyectil.x, proyectil.y)) {
            return false;
        }

        // Verificar colisión con jugador
        const distancia = Math.sqrt(
            Math.pow(jugador.x - proyectil.x, 2) +
            Math.pow(jugador.y - proyectil.y, 2)
        );

        if (distancia < 0.5 && !jugador.invulnerable) {
            recibirDaño(20);
            return false;
        }

        return true;
    });
}

function recibirDaño(cantidad) {
    jugador.vidaActual -= cantidad;
    jugador.invulnerable = true;
    jugador.tiempoInvulnerable = 60; // 1 segundo de invulnerabilidad

    try {
        sonidos.daño.currentTime = 0;
        sonidos.daño.play().catch(() => {});
    } catch (e) {}

    if (jugador.vidaActual <= 0) {
        jugador.vidas--;
        if (jugador.vidas <= 0) {
            gameOver();
        } else {
            // Reiniciar posición y vida
            const datosNivel = niveles[nivelActual];
            jugador.x = datosNivel.jugadorInicio.x;
            jugador.y = datosNivel.jugadorInicio.y;
            jugador.vidaActual = jugador.vidaMaxima;
        }
    }

    actualizarHUD();
}

function gameOver() {
    pantallaActual = PANTALLAS.GAME_OVER;

    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }

    try {
        sonidos.gameOver.play().catch(() => {});
    } catch (e) {}
}

function nivelCompletado() {
    pantallaActual = PANTALLAS.VICTORIA;

    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }

    // Desbloquear siguiente nivel
    if (nivelActual < 3 && nivelActual >= nivelesDesbloqueados) {
        nivelesDesbloqueados = nivelActual + 1;
    }

    try {
        sonidos.victoria.play().catch(() => {});
    } catch (e) {}
}

function actualizarCronometro() {
    if (pantallaActual !== PANTALLAS.JUGANDO) return;

    const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
    const minutos = Math.floor(tiempoTranscurrido / 60);
    const segundos = tiempoTranscurrido % 60;

    document.getElementById('cronometro').textContent =
        `${minutos}:${segundos.toString().padStart(2, '0')}`;
}

function actualizarHUD() {
    document.getElementById('contador-muertes').textContent = (3 - jugador.vidas);

    // Dibujar barra de vida en el canvas
    if (pantallaActual === PANTALLAS.JUGANDO) {
        dibujarBarraVida();
    }
}

function reiniciarNivel() {
    cargarNivel(nivelActual);
    pantallaActual = PANTALLAS.JUGANDO;
}

function volverAlMenu() {
    pantallaActual = PANTALLAS.INICIO;
    document.getElementById('hud').classList.add('oculto');
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }
}

// ==================== EVENTOS ====================

// Controles del teclado (FLECHAS)
const teclas = {};

document.addEventListener('keydown', (e) => {
    teclas[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    teclas[e.key] = false;
});

// Click en canvas
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (pantallaActual === PANTALLAS.INICIO) {
        // Botón Jugar
        if (x >= 250 && x <= 550 && y >= 300 && y <= 360) {
            cargarNivel(1);
            pantallaActual = PANTALLAS.JUGANDO;
        }
        // Botón Seleccionar Nivel
        if (x >= 250 && x <= 550 && y >= 390 && y <= 450) {
            pantallaActual = PANTALLAS.SELECCION_NIVEL;
        }
    } else if (pantallaActual === PANTALLAS.SELECCION_NIVEL) {
        // Selección de niveles
        for (let i = 1; i <= 3; i++) {
            const btnY = 180 + (i - 1) * 100;
            if (x >= 200 && x <= 600 && y >= btnY && y <= btnY + 70) {
                if (i <= nivelesDesbloqueados) {
                    cargarNivel(i);
                    pantallaActual = PANTALLAS.JUGANDO;
                }
            }
        }
        // Botón volver
        if (x >= 300 && x <= 500 && y >= 500 && y <= 550) {
            pantallaActual = PANTALLAS.INICIO;
        }
    } else if (pantallaActual === PANTALLAS.GAME_OVER) {
        // Botón reintentar
        if (x >= 250 && x <= 550 && y >= 340 && y <= 400) {
            reiniciarNivel();
        }
        // Botón menú
        if (x >= 250 && x <= 550 && y >= 420 && y <= 480) {
            volverAlMenu();
        }
    } else if (pantallaActual === PANTALLAS.VICTORIA) {
        // Botón siguiente nivel
        if (x >= 250 && x <= 550 && y >= 340 && y <= 400) {
            if (nivelActual < 3) {
                cargarNivel(nivelActual + 1);
                pantallaActual = PANTALLAS.JUGANDO;
            } else {
                volverAlMenu();
            }
        }
        // Botón menú
        if (x >= 250 && x <= 550 && y >= 420 && y <= 480) {
            volverAlMenu();
        }
    }
});

// Botón reiniciar del HUD
document.getElementById('btn-reiniciar').addEventListener('click', () => {
    if (pantallaActual === PANTALLAS.JUGANDO) {
        reiniciarNivel();
    }
});

// ==================== LOOP PRINCIPAL ====================

function loop() {
    tiempoAnimacion += 16;

    // Procesar movimiento con flechas
    if (pantallaActual === PANTALLAS.JUGANDO) {
        if (teclas['ArrowUp']) moverJugador(0, -1);
        if (teclas['ArrowDown']) moverJugador(0, 1);
        if (teclas['ArrowLeft']) moverJugador(-1, 0);
        if (teclas['ArrowRight']) moverJugador(1, 0);

        // Actualizar invulnerabilidad
        if (jugador.invulnerable) {
            jugador.tiempoInvulnerable--;
            if (jugador.tiempoInvulnerable <= 0) {
                jugador.invulnerable = false;
            }
        }
    }

    // Dibujar pantalla correspondiente
    switch (pantallaActual) {
        case PANTALLAS.INICIO:
            dibujarPantallaInicio();
            break;
        case PANTALLAS.SELECCION_NIVEL:
            dibujarPantallaSeleccionNivel();
            break;
        case PANTALLAS.JUGANDO:
            actualizarEnemigos();
            actualizarProyectiles();
            dibujarPantallaJuego();
            dibujarBarraVida();
            break;
        case PANTALLAS.GAME_OVER:
            dibujarPantallaJuego();
            dibujarPantallaGameOver();
            break;
        case PANTALLAS.VICTORIA:
            dibujarPantallaJuego();
            dibujarPantallaVictoria();
            break;
    }

    animacionFrame = requestAnimationFrame(loop);
}

// Iniciar el juego
loop();
