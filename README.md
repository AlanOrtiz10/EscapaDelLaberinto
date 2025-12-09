# 🎮 MAZE HUNTERS

Un juego arcade web moderno inspirado en clásicos como Pac-Man, creado con HTML5, CSS3 y JavaScript puro.

---

## 📖 Descripción

**Maze Hunters** es un juego arcade de supervivencia donde controlas a un cazador que debe escapar de laberintos llenos de enemigos inteligentes. Enfrenta cazadores que te persiguen y tiradores que lanzan proyectiles mortales. ¿Podrás sobrevivir y llegar a la salida?

---

## ✨ Características Principales

### 🎯 Gameplay Arcade Moderno
- **3 Niveles Únicos** con dificultad progresiva
- **Sistema de Vidas** (3 vidas por juego)
- **Barra de Salud** visual con sistema de daño
- **Enemigos con IA**:
  - **Cazadores**: Te persiguen cuando estás cerca
  - **Tiradores**: Disparan proyectiles desde la distancia
- **Sistema de Proyectiles** con colisiones y efectos
- **Invulnerabilidad temporal** después de recibir daño

### 🎨 Temas Visuales por Nivel
Cada nivel tiene su propia identidad visual única:

1. **Nivel 1: Neón Azul** 🔵
   - Estilo futurista con colores cian y magenta
   - 2 enemigos (1 cazador, 1 tirador)

2. **Nivel 2: Lava** 🔴
   - Ambiente ardiente con tonos rojos y naranjas
   - 3 enemigos (2 cazadores, 1 tirador)

3. **Nivel 3: Bosque Oscuro** 🟢
   - Atmósfera tenebrosa con verdes oscuros
   - 4 enemigos (2 cazadores, 2 tiradores)

### 🎮 Controles
- **Flechas del Teclado** (↑ ↓ ← →) para moverse
- **Sin diagonales** - Movimiento en 4 direcciones
- **Movimiento fluido** y responsive

### 🖥️ HUD Completo
- **Barra de Vida** con indicador de color (verde/amarillo/rojo)
- **Número de Vidas** restantes
- **Nivel Actual**
- **Cronómetro** del tiempo jugado
- **Botón de Reinicio** rápido

### 🎵 Efectos de Sonido
- 🔊 Sonido de pasos al moverse
- 💥 Sonido de disparo enemigo
- 💔 Sonido al recibir daño
- 🎉 Sonido de victoria
- 💀 Sonido de Game Over

### ✨ Animaciones y Efectos
- **Portal pulsante** en la meta
- **Enemigos con efecto de latido**
- **Proyectiles con estela brillante**
- **Flash rojo** al recibir daño
- **Parpadeo** durante invulnerabilidad
- **Partículas animadas** en el menú
- **Sombras dinámicas** en todos los personajes

---

## 🕹️ Cómo Jugar

### Objetivo
Navega por el laberinto y llega al **portal verde** evitando:
- ❌ Enemigos cazadores que te persiguen
- ❌ Proyectiles de los tiradores
- ❌ Chocar con las paredes

### Mecánicas
1. **Sistema de Vidas**: Comienzas con 3 vidas
2. **Sistema de Salud**: Cada vida tiene 100 puntos de salud
3. **Daño por Enemigo**: Los cazadores te quitan 35 HP
4. **Daño por Proyectil**: Los disparos te quitan 20 HP
5. **Invulnerabilidad**: Después de recibir daño, eres invulnerable por 1 segundo
6. **Perder una Vida**: Cuando tu salud llega a 0, pierdes una vida y reapareces
7. **Game Over**: Al perder las 3 vidas

### Estrategia
- 🎯 Observa los patrones de movimiento de los enemigos
- 🏃 Los cazadores te persiguen si estás cerca (radio de 8 celdas)
- 🎯 Los tiradores disparan cada 2 segundos si estás en rango
- 🛡️ Usa la invulnerabilidad para escapar de situaciones peligrosas
- ⚡ Planifica tu ruta antes de moverte

---

## 🚀 Instalación y Ejecución

### Opción 1: Abrir Directamente
```bash
# Clona el repositorio
git clone https://github.com/AlanOrtiz10/EscapaDelLaberinto.git

# Abre index.html en tu navegador
open index.html
```

### Opción 2: Servidor Local con PHP
```bash
cd EscapaDelLaberinto
php -S localhost:8000
```
Abre `http://localhost:8000` en tu navegador

### Opción 3: Servidor Local con Python
```bash
cd EscapaDelLaberinto
python -m http.server 8000
```
Abre `http://localhost:8000` en tu navegador

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas** - Renderizado del juego en 2D
- **CSS3** - Estilos y diseño de interfaz
- **JavaScript Vanilla** - Lógica completa del juego (sin frameworks)
- **RequestAnimationFrame** - Loop de juego a 60 FPS

---

## 📁 Estructura del Proyecto

```
/EscapaDelLaberinto/
  ├── index.html                # Página principal
  ├── estilos.css              # Estilos del juego
  ├── juego.js                 # Lógica completa (955 líneas)
  ├── README.md                # Esta documentación
  └── /assets                  # Recursos de audio
      ├── pasos.mp3
      ├── disparo.mp3
      ├── daño.mp3
      ├── victoria.mp3
      ├── gameover.mp3
      ├── nivel-completado.mp3
      └── README.md
```

---

## 🎯 Características Técnicas

### Sistema de Pantallas
- ✅ Menú principal con animación del título
- ✅ Selección de niveles con sistema de desbloqueo
- ✅ Pantalla de juego con HUD completo
- ✅ Game Over con opciones de reinicio
- ✅ Victoria con estadísticas finales

### Sistema de Enemigos con IA
```javascript
// Dos tipos de enemigos:
1. Cazador (Púrpura) - Patrulla y persigue al jugador
2. Tirador (Púrpura con punto blanco) - Dispara proyectiles
```

**Comportamiento:**
- Estado "patrulla" cuando el jugador está lejos
- Estado "persiguiendo" cuando detecta al jugador
- Cooldown de disparo de 2 segundos
- Velocidad diferenciada por tipo

### Sistema de Proyectiles
- Creación dinámica desde enemigos tiradores
- Física con vectores de velocidad
- Colisión con paredes (destrucción)
- Colisión con jugador (daño)
- Efecto visual de estela

### Sistema de Combate
- Sistema de vidas (3)
- Barra de salud (100 HP)
- Invulnerabilidad temporal
- Flash visual al recibir daño
- Sonido de impacto

### Temas Visuales Dinámicos
```javascript
// Cada nivel carga su tema automáticamente
Nivel 1: Neón (azul cian, fondo oscuro)
Nivel 2: Lava (rojo/naranja, fondo rojizo)
Nivel 3: Bosque (verde, fondo verde oscuro)
```

---

## 🎨 Paleta de Colores por Tema

### Nivel 1 - Neón Azul
- Fondo: `#0a0a1a` → `#1a1a2e`
- Paredes: `#00d4ff` (Cian brillante)
- Jugador: `#00ffff` (Cian)
- Enemigos: `#ff00ff` (Magenta)
- Portal: `#00ff00` (Verde neón)

### Nivel 2 - Lava
- Fondo: `#1a0000` → `#3d0000`
- Paredes: `#ff4500` (Naranja fuego)
- Jugador: `#ffaa00` (Dorado)
- Enemigos: `#ff0000` (Rojo intenso)
- Portal: `#00ff00` (Verde)

### Nivel 3 - Bosque Oscuro
- Fondo: `#0a1a0a` → `#1a2e1a`
- Paredes: `#2d5016` (Verde musgo)
- Jugador: `#90ee90` (Verde claro)
- Enemigos: `#8b0000` (Rojo sangre)
- Portal: `#ffff00` (Amarillo)

---

## 📊 Niveles de Dificultad

| Nivel | Enemigos | Cazadores | Tiradores | Tema |
|-------|----------|-----------|-----------|------|
| 1 | 2 | 1 | 1 | Neón Azul |
| 2 | 3 | 2 | 1 | Lava |
| 3 | 4 | 2 | 2 | Bosque Oscuro |

---

## 🎓 Conceptos de Programación Implementados

### Game Loop
- `requestAnimationFrame` para 60 FPS constantes
- Sistema de tiempo delta para animaciones

### Detección de Colisiones
- Colisión circular (jugador con enemigos)
- Colisión de punto (proyectiles)
- Colisión con grid (paredes del laberinto)

### Inteligencia Artificial
- Sistema de estados (patrulla/persecución)
- Pathfinding básico hacia el jugador
- Cooldowns y timers

### Física del Juego
- Vectores de velocidad normalizados
- Movimiento con interpolación
- Sistema de proyectiles balísticos

### Gestión de Estados
- Máquina de estados para pantallas
- Sistema de eventos del DOM
- Gestión de input con objeto de teclas

---

## 📝 Código Limpio

### Organización
```javascript
// Estructura clara y organizada:
1. Configuración y constantes
2. Variables globales
3. Funciones de pantallas
4. Funciones de dibujo
5. Funciones de lógica
6. Eventos
7. Loop principal
```

### Nomenclatura en Español
- Variables descriptivas: `jugador`, `enemigos`, `proyectiles`
- Funciones claras: `dibujarBarraVida()`, `recibirDaño()`, `moverJugador()`
- Comentarios explicativos en puntos clave

---

## 🐛 Debugging y Testing

Para probar el juego:
1. Abre la consola del navegador (F12)
2. Observa los logs de eventos
3. Prueba todas las pantallas
4. Verifica el sistema de vidas
5. Prueba cada tipo de enemigo

---

## 🎖️ Logros del Proyecto

✅ **Juego completamente funcional**
✅ **3 niveles únicos con temas visuales**
✅ **IA de enemigos con 2 comportamientos**
✅ **Sistema completo de combate**
✅ **Efectos visuales y sonoros**
✅ **HUD profesional**
✅ **Código limpio y documentado**
✅ **Sin dependencias externas**

---

## 👨‍💻 Autor

Desarrollado como proyecto educativo universitario

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

## 🎮 ¡A Jugar!

```
╔══════════════════════════════════╗
║     MAZE HUNTERS                 ║
║                                  ║
║  ¿Podrás completar los 3 niveles?║
║  ¡Demuestra tu habilidad arcade! ║
╚══════════════════════════════════╝
```

**¡Buena suerte, cazador!** 🎯🔫👾

---

### 🔗 Enlaces

- **Repositorio**: https://github.com/AlanOrtiz10/EscapaDelLaberinto
- **Reportar bugs**: [Issues](https://github.com/AlanOrtiz10/EscapaDelLaberinto/issues)

---

**Última actualización**: Diciembre 2024
**Versión**: 2.0 (Maze Hunters Edition)
