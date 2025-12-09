# Escapa del Laberinto

Un juego indie web creado con HTML5, CSS3 y JavaScript puro - sin frameworks ni librerías externas.

## 🎮 Descripción

**Escapa del Laberinto** es un juego de supervivencia y estrategia donde controlas un cuadrado brillante que debe escapar de laberintos llenos de enemigos peligrosos. Con gráficos minimalistas modernos, animaciones suaves y múltiples niveles de dificultad, este juego ofrece una experiencia indie auténtica.

## ✨ Características

### Jugabilidad
- 🎯 **3 Niveles de Dificultad** - Fácil, Medio y Difícil
- 👾 **Enemigos con IA** - Enemigos que patrullan con movimiento automático
- 🏆 **Sistema de Progresión** - Desbloquea niveles al completar el anterior
- ⏱️ **Cronómetro** - Compite contra el tiempo
- 💀 **Contador de Muertes** - Rastrea tus intentos

### Visual
- 🎨 **Estilo Minimalista Moderno** - Colores vibrantes y diseño limpio
- ✨ **Animaciones Suaves** - Portal pulsante, enemigos con latido, partículas de fondo
- 🌈 **Efectos de Luz** - Sombras y brillos para profundidad visual
- 📱 **Diseño Responsive** - Se adapta a diferentes pantallas

### Pantallas del Juego
- 🏠 **Pantalla de Inicio** - Menú principal con animación de partículas
- 🎯 **Selección de Niveles** - Elige tu nivel (niveles bloqueados hasta completar anteriores)
- 🎮 **Pantalla de Juego** - HUD completo con toda la información
- 💀 **Game Over** - Pantalla al morir con opción de reintentar
- 🎊 **Nivel Completado** - Celebración al completar un nivel

### Audio
- 🔊 Sonido de pasos al moverse
- 🎵 Sonido de victoria al completar nivel
- 💥 Sonido al morir
- 🎶 Efectos de sonido ambientales

## 🕹️ Cómo Jugar

### Controles
- **W** - Mover arriba
- **A** - Mover izquierda
- **S** - Mover abajo
- **D** - Mover derecha

### Objetivo
1. Muévete por el laberinto evitando las paredes grises
2. **Evita a todos los enemigos rojos** - Si te tocan, pierdes
3. Llega al **portal verde brillante** para completar el nivel
4. Desbloquea y completa los 3 niveles

### Estrategia
- Observa los patrones de movimiento de los enemigos
- Planifica tu ruta antes de moverte
- Algunos enemigos se mueven horizontalmente, otros verticalmente
- Cuanto más avanzado el nivel, más enemigos encontrarás

## 🚀 Instalación y Ejecución

### Opción 1: Abrir directamente
```bash
# Clona el repositorio
git clone https://github.com/AlanOrtiz10/EscapaDelLaberinto.git

# Abre el archivo index.html en tu navegador
open index.html
```

### Opción 2: Con servidor local (PHP)
```bash
cd EscapaDelLaberinto
php -S localhost:8000
```
Luego abre `http://localhost:8000` en tu navegador

### Opción 3: Con Python
```bash
cd EscapaDelLaberinto
python -m http.server 8000
```
Luego abre `http://localhost:8000` en tu navegador

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas** - Renderizado del juego
- **CSS3** - Estilos y animaciones
- **JavaScript Vanilla** - Lógica del juego sin frameworks
- **RequestAnimationFrame** - Loop de animación suave a 60 FPS

## 📁 Estructura del Proyecto

```
/EscapaDelLaberinto/
  ├── index.html                # Archivo principal HTML
  ├── estilos.css              # Estilos visuales modernos
  ├── juego.js                 # Lógica completa del juego
  ├── README.md                # Este archivo
  └── /assets                  # Recursos de audio
      ├── pasos.mp3
      ├── victoria.mp3
      ├── muerte.mp3
      ├── nivel-completado.mp3
      └── README.md
```

## 🎯 Características Técnicas

### Sistema de Pantallas
El juego implementa un sistema completo de pantallas:
- Pantalla de inicio
- Selección de niveles
- Juego activo
- Game Over
- Nivel completado

### Sistema de Enemigos
- Movimiento automático en patrones
- Enemigos horizontales y verticales
- Detección de colisiones precisa
- Animación de latido

### Sistema de Niveles
- 3 mapas únicos diseñados manualmente
- Dificultad progresiva
- Sistema de desbloqueo
- Enemigos aumentan por nivel

### Animaciones
- Portal con efecto pulsante
- Enemigos con animación de latido
- Partículas animadas en el fondo
- Efectos de sombra y brillo

## 🎨 Paleta de Colores

- **Fondo**: Degradado de azules oscuros (#1a1a2e, #16213e, #0f3460)
- **Jugador**: Cian brillante (#00d4ff)
- **Enemigos**: Rojo vibrante (#ff4757)
- **Portal/Meta**: Verde (#4caf50)
- **Paredes**: Gris oscuro (#2c3e50)
- **UI**: Morado (#5f27cd)

## 🏆 Niveles

1. **Nivel 1 (Fácil)** - 1 enemigo, laberinto simple
2. **Nivel 2 (Medio)** - 2 enemigos, laberinto moderado
3. **Nivel 3 (Difícil)** - 3 enemigos, laberinto complejo

## 📝 Notas de Desarrollo

Este juego fue desarrollado como un proyecto educativo usando solo tecnologías web nativas, sin frameworks ni librerías externas. El código está escrito en español con comentarios claros para facilitar el aprendizaje.

## 🎓 Aprendizajes

- Manipulación del Canvas API
- Sistema de game loop con requestAnimationFrame
- Detección de colisiones
- Manejo de estados del juego
- Animaciones con JavaScript
- Sistema de eventos del navegador

## 👨‍💻 Autor

Desarrollado como proyecto educativo universitario

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

¡Disfruta del juego y trata de completar los 3 niveles! 🎮✨
