# 📦 UI Standard Library - Centro de Producción de Software

Bienvenido al núcleo visual del centro de producción. Si estás leyendo esto, probablemente te olvidaste de cómo estaba estructurado el proyecto, o alguien tocó algo que no debía y todo rompió. No te preocupes, respirá hondo y leé esta guía antes de tirar una sola línea de código.

Esta librería está construida con **React**, **TypeScript** y **Vite**, bajo la premisa de ser inmutable, escalable y agnóstica a la lógica de negocio de los proyectos que la consuman.

---

## 🗺️ Mapa de la Arquitectura

```text
📦 ui-standard-library
 ┣ 📂 .storybook            # Documentación interactiva y entorno de desarrollo aislado
 ┣ 📂 src                   # Todo el código fuente de la librería
 ┃ ┣ 📂 components          # Componentes visuales organizados por Atomic Design
 ┃ ┃ ┣ 📂 atoms             # Elementos mínimos e indivisibles
 ┃ ┃ ┣ 📂 molecules         # Combinaciones simples de átomos
 ┃ ┃ ┗ 📂 organisms         # Estructuras complejas y funcionales
 ┃ ┣ 📂 hooks               # Lógica de comportamiento puramente visual
 ┃ ┣ 📂 tokens              # Constantes de diseño inmutables (Colores, fuentes, etc.)
 ┃ ┃ ┣ 📜 colors.ts
 ┃ ┃ ┣ 📜 typography.ts
 ┃ ┃ ┣ 📜 spacing.ts
 ┃ ┃ ┗ 📜 index.ts
 ┃ ┣ 📂 types               # Tipados globales del sistema de diseño
 ┃ ┣ 📂 utils               # Funciones utilitarias (Manejo de clases, formateadores)
 ┃ ┗ 📜 index.ts            # El "Barril Maestro" (Punto de entrada de exportación)
 ┣ 📜 package.json          # Configuración de dependencias y empaquetado (ESM/CJS)
 ┣ 📜 tsconfig.json         # Reglas estrictas de TypeScript para desarrollo
 ┣ 📜 tsconfig.build.json   # Reglas de TypeScript exclusivas para generar tipos (.d.ts)
 ┣ 📜 vite.config.ts        # Configuración de Vite en Library Mode (Rollup)
 ┗ 📜 README.md             # Este archivo (Tu salvavidas)

```

---

## 📂 Desglose Detallado de Carpetas

### 📂 `.storybook`

Es el entorno de pruebas y la documentación interactiva. Si un componente visual no está acá, **no existe para el resto del mundo**.

* **¿Qué hace?** Configura los addons, los temas globales y cómo se renderizan las historias.
* **Regla de oro:** No metas lógica de desarrollo acá adentro. Solo sirve para renderizar tus archivos `*.stories.tsx`.

### 📂 `src/components`

Acá vive el corazón visual, estructurado bajo **Atomic Design**. Ningún componente de esta carpeta puede realizar peticiones HTTP (fetch/axios) ni manejar estados globales de aplicaciones externas.

* #### 📂 `atoms` (Átomos)


Los bloques de construcción básicos. No se pueden dividir más sin perder su sentido.
* *Ejemplos:* `Button`, `Input`, `Spinner`, `Typography`, `Badge`.
* *Estructura interna:* Cada átomo tiene su propia carpeta con su componente, sus estilos y su archivo de Storybook:
```text
📂 Button
 ┣ 📜 Button.tsx
 ┣ 📜 Button.stories.tsx
 ┗ 📜 index.ts
```

*   #### 📂 `molecules` (Moléculas)
    Agrupaciones de átomos que juntos adquieren una función clara.
    *   *Ejemplos:* `SearchBar` (Átomo Input + Átomo Botón), `FormField` (Átomo Label + Átomo Input + Átomo ErrorMessage).
*   #### 📂 `organisms` (Organismos)
    Estructuras complejas que forman secciones enteras de una interfaz. Pueden contener múltiples moléculas y átomos.
    *   *Ejemplos:* `Navbar`, `DataTable` (con paginado y filtros), `Modal`.

### 📂 `src/hooks`
Ganchos personalizados para abstraer la **lógica de comportamiento visual**. 
*   *Ejemplos:* `useTheme` (para alternar entre modo oscuro/claro), `useMediaQuery` (para detectar breakpoints desde JS/TS).
*   *Prohibido:* Crear un `useFetchUsers` acá. Eso pertenece a la aplicación que consuma la librería, no a la librería de estilos.

### 📂 `src/tokens`
Las "leyes de la física" de la identidad visual del Centro de Producción. Si el equipo de diseño decide cambiar el color institucional, se cambia **acá y solo acá**.
*   `colors.ts`: Paleta de colores exacta (hexadecimales, rgb, variables tailwind).
*   `typography.ts`: Tamaños de fuente, weights y line-heights permitidos.
*   `spacing.ts`: Escala de paddings, margins y gaps estándar.
*   `index.ts`: Exporta todo en un objeto centralizado para su consumo.

### 📂 `src/types`
Tipados globales que no pertenecen a un componente específico. Por ejemplo, definiciones de variantes de color permitidas (`'primary' | 'secondary' | 'danger'`), orientaciones o tamaños globales.
*Nota: Los tipos específicos de las propiedades de un botón (`ButtonProps`) van en el archivo del propio botón, no acá.*

### 📂 `src/utils`
Pequeñas funciones puras que facilitan la vida. El habitante más importante de esta carpeta suele ser la función `cn()` (construida con `clsx` y `tailwind-merge`), que permite fusionar clases de CSS o Tailwind dinámicamente sin romper las variantes de los componentes.

### 📜 `src/index.ts` (El Barril Maestro)
Este archivo es la aduana de la librería. Todo lo que quieras que los desarrolladores de los otros proyectos puedan usar, tiene que ser exportado desde acá.
```typescript
// Ejemplo de lo que pasa acá adentro:
export * from './components/atoms';
export * from './components/molecules';
export * from './components/organisms';
export * from './tokens';
export * from './hooks';

```

---

## ⚙️ Archivos de Configuración (Los cimientos)

* **`vite.config.ts`:** Configura a Vite para que actúe en **Library Mode**. En lugar de generar un archivo `index.html` con un SPA, usa Rollup por detrás para procesar el código y escupir un bundle optimizado.
* **`package.json`:** Define los puntos de entrada para los proyectos que instalen la librería:
* `main`: Apunta al formato CommonJS (`dist/index.cjs`).
* `module`: Apunta al formato moderno ES Modules (`dist/index.mjs`).
* `types`: Indica dónde están las definiciones de TypeScript (`dist/index.d.ts`).


* **`tsconfig.json`:** Mantiene a raya los errores de TypeScript durante la fase de desarrollo con reglas ultra estrictas.
* **`tsconfig.build.json`:** Una versión recortada que usa el compilador (`tsc`) al momento de compilar para generar **únicamente** los archivos de tipado `.d.ts`, ignorando las historias de Storybook y los archivos de prueba.

---

## 🛠️ Flujo de Trabajo: Cómo agregar un componente sin romper nada

Si necesitás agregar, por ejemplo, un componente de selección (`Select`):

1. Creá la carpeta en `src/components/atoms/Select/`.
2. Escribí el componente en `Select.tsx` exportando correctamente sus props con TypeScript.
3. Escribí su historia en `Select.stories.tsx` y verificalo en Storybook (`npm run storybook`).
4. Exportalo en el archivo barril del átomo (`src/components/atoms/Select/index.ts` -> `export * from './Select'`).
5. Exportalo en el barril de la carpeta contenedora (`src/components/atoms/index.ts` -> `export * from './Select'`).
6. Asegururate de que el Barril Maestro (`src/index.ts`) exporte `components/atoms`.
7. Compilá con `npm run build` y subí la nueva versión. Listo, sos inimputable.
