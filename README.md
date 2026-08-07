# Learn to Leader - Gamified Mobile Prototype

¡Bienvenido a **Learn to Leader**! Esta es una aplicación móvil moderna (PWA) diseñada para potenciar la empleabilidad y el emprendimiento digital en jóvenes latinoamericanos, inspirada en la experiencia de gamificación de Duolingo.

## 🚀 Características del Prototipo

- **Interfaz Gamificada:** Diseño limpio con bordes redondeados, paleta "Naranja Quemado" y tipografía Fredoka One.
- **Mascota Interactiva:** Una mascota animada que te acompaña, te motiva y reacciona a tus toques.
- **Ruta de Aprendizaje:** Mapa estilo Duolingo con nodos interactivos, animaciones de pulso para el progreso actual y celebraciones con confeti.
- **Sistema de XP y Rachas:** Gestión de estado global con Zustand para rastrear tu progreso en tiempo real.
- **Vistas Especializadas:**
  - **Inicio:** Selección de rutas (Empleabilidad vs Emprendimiento) y secciones de descubrimiento.
  - **Retos:** Desafíos diarios con barras de progreso y recompensas.
  - **Perfil:** Visualización de habilidades y medallas desbloqueadas.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion (para fluidez y transiciones)
- **Iconos:** Lucide React
- **Estado:** Zustand
- **Efectos:** Canvas-confetti

## 🏃 Cómo ejecutar el proyecto

Para ver la aplicación en tu navegador:

1. Asegúrate de estar en la carpeta del proyecto:
   ```bash
   cd learn-to-leader
   ```

2. Instala las dependencias (si no se instalaron automáticamente):
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador. **Te recomendamos usar la vista de inspección de Chrome (F12) y activar el modo móvil para la mejor experiencia.**

## 📂 Estructura del Código

- `src/app/page.tsx`: Punto de entrada principal con lógica de navegación entre pestañas.
- `src/components/`: Componentes UI modulares (Map, Mascot, TopBar, etc.).
- `src/store/`: Estado global de gamificación.
- `src/app/globals.css`: Estilos base y clases de utilidad gamificadas.
