// Obtener el canvas y su contexto
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
    NIVEL_COMPLETADO: 'completado'
};

// Variables globales del juego
let pantallaActual = PANTALLAS.INICIO;
let nivelActual = 1;
let nivelesDesbloqueados = 1;
let contadorMuertes = 0;
let tiempoInicio = 0;
let intervaloTiempo = null;
let animacionFrame = null;
let tiempoAnimacion = 0;

// Definir los 3 niveles
const niveles = {
    1: {
        nombre: "Nivel Fácil",
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
            { x: 10, y: 5, direccion: 1, tipo: 'horizontal', rango: 5 }
        ]
    },
    2: {
        nombre: "Nivel Medio",
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
            { x: 5, y: 3, direccion: 1, tipo: 'horizontal', rango: 4 },
            { x: 15, y: 7, direccion: 1, tipo: 'vertical', rango: 3 }
        ]
    },
    3: {
        nombre: "Nivel Difícil",
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
            { x: 5, y: 5, direccion: 1, tipo: 'horizontal', rango: 5 },
            { x: 10, y: 3, direccion: 1, tipo: 'vertical', rango: 4 },
            { x: 15, y: 9, direccion: 1, tipo: 'horizontal', rango: 3 }
        ]
    }
};

// Estado del juego actual
let mapaActual = [];
let jugador = { x: 0, y: 0 };
let listaEnemigos = [];

// Sonidos del juego
const sonidos = {
    pasos: new Audio('assets/pasos.mp3'),
    victoria: new Audio('assets/victoria.mp3'),
    muerte: new Audio('assets/muerte.mp3'),
    nivelCompletado: new Audio('assets/nivel-completado.mp3')
};

// Configurar volumen
Object.values(sonidos).forEach(audio => {
    audio.volume = 0.3;
});

// ==================== FUNCIONES DE PANTALLAS ====================

function dibujarPantallaInicio() {
    // Fondo degradado
    const gradient = ctx.createLinearGradient(0, 0, 0, config.alto);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Partículas de fondo animadas
    dibujarParticulas();

    // Título del juego
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 20;
    ctx.fillText('ESCAPA DEL LABERINTO', config.ancho / 2, 150);
    ctx.shadowBlur = 0;

    // Subtítulo
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText('Un juego de supervivencia y estrategia', config.ancho / 2, 200);

    // Botón Jugar
    const btnJugar = {
        x: config.ancho / 2 - 150,
        y: 280,
        ancho: 300,
        alto: 60
    };

    ctx.fillStyle = '#00d4ff';
    ctx.fillRect(btnJugar.x, btnJugar.y, btnJugar.ancho, btnJugar.alto);
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('JUGAR', config.ancho / 2, btnJugar.y + 40);

    // Botón Seleccionar Nivel
    const btnNiveles = {
        x: config.ancho / 2 - 150,
        y: 370,
        ancho: 300,
        alto: 60
    };

    ctx.fillStyle = '#5f27cd';
    ctx.fillRect(btnNiveles.x, btnNiveles.y, btnNiveles.ancho, btnNiveles.alto);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 25px Arial';
    ctx.fillText('SELECCIONAR NIVEL', config.ancho / 2, btnNiveles.y + 40);

    // Controles
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.fillText('Usa W A S D para moverte', config.ancho / 2, 480);
    ctx.fillText('Evita los enemigos rojos', config.ancho / 2, 510);
    ctx.fillText('Llega al portal verde', config.ancho / 2, 540);
}

function dibujarPantallaSeleccionNivel() {
    // Fondo
    const gradient = ctx.createLinearGradient(0, 0, 0, config.alto);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Título
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SELECCIONA UN NIVEL', config.ancho / 2, 100);

    // Dibujar los 3 niveles
    const espacioY = 180;
    for (let i = 1; i <= 3; i++) {
        const y = espacioY + (i - 1) * 100;
        const desbloqueado = i <= nivelesDesbloqueados;

        // Caja del nivel
        ctx.fillStyle = desbloqueado ? '#00d4ff' : '#555555';
        ctx.fillRect(250, y, 300, 70);

        // Texto del nivel
        ctx.fillStyle = '#1a1a2e';
        ctx.font = 'bold 30px Arial';
        const texto = desbloqueado ? `Nivel ${i}` : '🔒 Bloqueado';
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
    // Fondo del canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, config.alto);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Dibujar laberinto
    dibujarLaberinto();

    // Dibujar enemigos
    dibujarEnemigos();

    // Dibujar jugador
    dibujarJugador();

    // Dibujar meta
    dibujarMeta();
}

function dibujarPantallaGameOver() {
    // Overlay oscuro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Título
    ctx.fillStyle = '#ff4757';
    ctx.font = 'bold 70px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ff4757';
    ctx.shadowBlur = 20;
    ctx.fillText('GAME OVER', config.ancho / 2, 200);
    ctx.shadowBlur = 0;

    // Mensaje
    ctx.fillStyle = '#ffffff';
    ctx.font = '25px Arial';
    ctx.fillText('¡Un enemigo te atrapó!', config.ancho / 2, 270);

    // Botón reintentar
    ctx.fillStyle = '#00d4ff';
    ctx.fillRect(250, 320, 300, 60);
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('REINTENTAR', config.ancho / 2, 360);

    // Botón menú
    ctx.fillStyle = '#5f27cd';
    ctx.fillRect(250, 400, 300, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('MENÚ PRINCIPAL', config.ancho / 2, 440);
}

function dibujarPantallaNivelCompletado() {
    // Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, config.ancho, config.alto);

    // Título
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 20;
    ctx.fillText('¡NIVEL COMPLETADO!', config.ancho / 2, 180);
    ctx.shadowBlur = 0;

    // Tiempo
    const tiempoFinal = document.getElementById('cronometro').textContent;
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px Arial';
    ctx.fillText(`Tiempo: ${tiempoFinal}`, config.ancho / 2, 240);

    // Botones
    if (nivelActual < 3) {
        ctx.fillStyle = '#00d4ff';
        ctx.fillRect(250, 300, 300, 60);
        ctx.fillStyle = '#1a1a2e';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('SIGUIENTE NIVEL', config.ancho / 2, 340);
    } else {
        ctx.fillStyle = '#4caf50';
        ctx.fillRect(250, 300, 300, 60);
        ctx.fillStyle = '#1a1a2e';
        ctx.font = 'bold 25px Arial';
        ctx.fillText('¡JUEGO COMPLETADO!', config.ancho / 2, 340);
    }

    ctx.fillStyle = '#5f27cd';
    ctx.fillRect(250, 380, 300, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('MENÚ PRINCIPAL', config.ancho / 2, 420);
}

// ==================== FUNCIONES DE DIBUJO ====================

function dibujarLaberinto() {
    for (let fila = 0; fila < mapaActual.length; fila++) {
        for (let col = 0; col < mapaActual[fila].length; col++) {
            const x = col * config.tamañoCelda;
            const y = fila * config.tamañoCelda;

            if (mapaActual[fila][col] === 1) {
                // Pared con efecto 3D
                ctx.fillStyle = '#2c3e50';
                ctx.fillRect(x, y, config.tamañoCelda, config.tamañoCelda);

                // Borde superior más claro
                ctx.fillStyle = '#34495e';
                ctx.fillRect(x, y, config.tamañoCelda, 2);

                // Borde izquierdo más claro
                ctx.fillRect(x, y, 2, config.tamañoCelda);

                // Borde inferior oscuro
                ctx.fillStyle = '#1a252f';
                ctx.fillRect(x, y + config.tamañoCelda - 2, config.tamañoCelda, 2);

                // Borde derecho oscuro
                ctx.fillRect(x + config.tamañoCelda - 2, y, 2, config.tamañoCelda);
            }
        }
    }
}

function dibujarJugador() {
    const x = jugador.x * config.tamañoCelda + config.tamañoCelda / 2;
    const y = jugador.y * config.tamañoCelda + config.tamañoCelda / 2;
    const tamaño = config.tamañoCelda * 0.6;

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(
        x - tamaño / 2 + 2,
        y - tamaño / 2 + 2,
        tamaño,
        tamaño
    );

    // Jugador con brillo
    ctx.fillStyle = '#00d4ff';
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 15;
    ctx.fillRect(
        x - tamaño / 2,
        y - tamaño / 2,
        tamaño,
        tamaño
    );
    ctx.shadowBlur = 0;
}

function dibujarMeta() {
    // Encontrar la posición de la meta
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
    const pulso = Math.sin(tiempoAnimacion * 0.005) * 3 + 15;

    // Portal exterior
    ctx.beginPath();
    ctx.arc(metaX, metaY, pulso + 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
    ctx.fill();

    // Portal interior
    ctx.beginPath();
    ctx.arc(metaX, metaY, pulso, 0, Math.PI * 2);
    ctx.fillStyle = '#4caf50';
    ctx.shadowColor = '#4caf50';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;
}

function dibujarEnemigos() {
    listaEnemigos.forEach(enemigo => {
        const x = enemigo.x * config.tamañoCelda + config.tamañoCelda / 2;
        const y = enemigo.y * config.tamañoCelda + config.tamañoCelda / 2;

        // Animación de latido
        const latido = Math.sin(tiempoAnimacion * 0.008) * 2 + 12;

        // Sombra
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(x + 2, y + 2, latido, 0, Math.PI * 2);
        ctx.fill();

        // Enemigo
        ctx.beginPath();
        ctx.arc(x, y, latido, 0, Math.PI * 2);
        ctx.fillStyle = '#ff4757';
        ctx.shadowColor = '#ff4757';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function dibujarParticulas() {
    // Partículas animadas simples en el fondo
    for (let i = 0; i < 30; i++) {
        const x = (i * 50 + tiempoAnimacion * 0.1) % config.ancho;
        const y = (i * 30 + Math.sin(tiempoAnimacion * 0.001 + i) * 20) % config.alto;

        ctx.fillStyle = `rgba(0, 212, 255, ${0.1 + Math.sin(tiempoAnimacion * 0.002 + i) * 0.05})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ==================== FUNCIONES DE LÓGICA ====================

function cargarNivel(nivel) {
    nivelActual = nivel;
    const datosNivel = niveles[nivel];

    // Copiar el mapa
    mapaActual = datosNivel.mapa.map(fila => [...fila]);

    // Posicionar jugador
    jugador.x = datosNivel.jugadorInicio.x;
    jugador.y = datosNivel.jugadorInicio.y;

    // Crear enemigos
    listaEnemigos = datosNivel.enemigos.map(e => ({
        ...e,
        posInicial: e.tipo === 'horizontal' ? e.x : e.y,
        velocidad: 0.05
    }));

    // Actualizar HUD
    document.getElementById('nivel-actual').textContent = nivel;
    document.getElementById('hud').classList.remove('oculto');

    // Iniciar cronómetro
    tiempoInicio = Date.now();
    if (intervaloTiempo) clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(actualizarCronometro, 100);
}

function moverJugador(dx, dy) {
    if (pantallaActual !== PANTALLAS.JUGANDO) return;

    const nuevaX = jugador.x + dx;
    const nuevaY = jugador.y + dy;

    // Verificar colisión con paredes
    if (!hayColision(nuevaX, nuevaY)) {
        jugador.x = nuevaX;
        jugador.y = nuevaY;

        // Reproducir sonido de pasos
        try {
            sonidos.pasos.currentTime = 0;
            sonidos.pasos.play().catch(() => {});
        } catch (e) {}

        // Verificar si llegó a la meta
        if (mapaActual[jugador.y][jugador.x] === 2) {
            nivelCompletado();
        }
    }
}

function hayColision(x, y) {
    if (x < 0 || x >= mapaActual[0].length || y < 0 || y >= mapaActual.length) {
        return true;
    }
    return mapaActual[y][x] === 1;
}

function actualizarEnemigos() {
    if (pantallaActual !== PANTALLAS.JUGANDO) return;

    listaEnemigos.forEach(enemigo => {
        if (enemigo.tipo === 'horizontal') {
            enemigo.x += enemigo.direccion * enemigo.velocidad;

            // Cambiar dirección si alcanza el límite
            if (Math.abs(enemigo.x - enemigo.posInicial) >= enemigo.rango) {
                enemigo.direccion *= -1;
            }
        } else if (enemigo.tipo === 'vertical') {
            enemigo.y += enemigo.direccion * enemigo.velocidad;

            // Cambiar dirección si alcanza el límite
            if (Math.abs(enemigo.y - enemigo.posInicial) >= enemigo.rango) {
                enemigo.direccion *= -1;
            }
        }

        // Verificar colisión con jugador
        const distancia = Math.sqrt(
            Math.pow(jugador.x - enemigo.x, 2) +
            Math.pow(jugador.y - enemigo.y, 2)
        );

        if (distancia < 0.8) {
            gameOver();
        }
    });
}

function gameOver() {
    pantallaActual = PANTALLAS.GAME_OVER;
    contadorMuertes++;
    document.getElementById('contador-muertes').textContent = contadorMuertes;

    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }

    try {
        sonidos.muerte.play().catch(() => {});
    } catch (e) {}
}

function nivelCompletado() {
    pantallaActual = PANTALLAS.NIVEL_COMPLETADO;

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

// Controles del teclado
document.addEventListener('keydown', (e) => {
    if (pantallaActual === PANTALLAS.JUGANDO) {
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
    }
});

// Click en canvas
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (pantallaActual === PANTALLAS.INICIO) {
        // Botón Jugar
        if (x >= 250 && x <= 550 && y >= 280 && y <= 340) {
            cargarNivel(1);
            pantallaActual = PANTALLAS.JUGANDO;
        }
        // Botón Seleccionar Nivel
        if (x >= 250 && x <= 550 && y >= 370 && y <= 430) {
            pantallaActual = PANTALLAS.SELECCION_NIVEL;
        }
    } else if (pantallaActual === PANTALLAS.SELECCION_NIVEL) {
        // Selección de niveles
        for (let i = 1; i <= 3; i++) {
            const btnY = 180 + (i - 1) * 100;
            if (x >= 250 && x <= 550 && y >= btnY && y <= btnY + 70) {
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
        if (x >= 250 && x <= 550 && y >= 320 && y <= 380) {
            reiniciarNivel();
        }
        // Botón menú
        if (x >= 250 && x <= 550 && y >= 400 && y <= 460) {
            volverAlMenu();
        }
    } else if (pantallaActual === PANTALLAS.NIVEL_COMPLETADO) {
        // Botón siguiente nivel o menú
        if (x >= 250 && x <= 550 && y >= 300 && y <= 360) {
            if (nivelActual < 3) {
                cargarNivel(nivelActual + 1);
                pantallaActual = PANTALLAS.JUGANDO;
            } else {
                volverAlMenu();
            }
        }
        // Botón menú principal
        if (x >= 250 && x <= 550 && y >= 380 && y <= 440) {
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
            dibujarPantallaJuego();
            break;
        case PANTALLAS.GAME_OVER:
            dibujarPantallaJuego();
            dibujarPantallaGameOver();
            break;
        case PANTALLAS.NIVEL_COMPLETADO:
            dibujarPantallaJuego();
            dibujarPantallaNivelCompletado();
            break;
    }

    animacionFrame = requestAnimationFrame(loop);
}

// Iniciar el juego
loop();
