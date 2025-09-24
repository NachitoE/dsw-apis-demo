# 🧩 API Fest — Demo Unificada

Este proyecto es un **monorepo** que implementa y compara cuatro estilos de APIs modernos:

- **REST** (Express + OpenAPI)
- **GraphQL** (Apollo Server / Client)
- **JSON-RPC** (express-json-rpc-router)
- **tRPC** (tipado end-to-end con @trpc/server)

Incluye un **frontend en React + Vite + TailwindCSS** que permite probar los cuatro mecanismos desde una sola interfaz y ver:

1. **Lo que se envía** (request).
2. **Cómo se procesa** (tecnología utilizada, endpoint, meta).
3. **Lo que se recibe** (response).

Ideal para charlas, workshops o clases donde se quieran mostrar diferencias prácticas entre tecnologías de APIs.

---

## 🎯 Características

### 🎨 Frontend Moderno

- **React 18** con TypeScript
- **Vite** para desarrollo ultra-rápido
- **Tailwind CSS** para estilos
- **Tema automático** (claro/oscuro según preferencias del navegador)
- **Diseño responsive** que se adapta a móvil y escritorio
- **Lista scrolleable** para manejar muchos usuarios
- **Interfaz unificada** para comparar todas las APIs

### ⚡ Backend Completo

- **Servidor Express** único que maneja todos los protocolos
- **Cuatro APIs diferentes** para la misma funcionalidad (CRUD de usuarios)
- **Trazabilidad completa** de requests y responses
- **TypeScript** en todo el stack

### � APIs Implementadas

| Tecnología   | Endpoint     | Características                   |
| ------------ | ------------ | --------------------------------- |
| **REST**     | `/api/users` | Estándar HTTP, verbos semánticos  |
| **GraphQL**  | `/graphql`   | Query language, un solo endpoint  |
| **JSON-RPC** | `/rpc`       | Llamadas de procedimiento remotos |
| **tRPC**     | `/trpc`      | Type-safe, validación automática  |

---

## �📂 Estructura del Proyecto

```
dsw-apis-demo/
├── back-end/                 # Servidor Express con todas las APIs
│   ├── src/
│   │   ├── app.ts           # Servidor principal
│   │   ├── entities/        # Modelos de datos (MikroORM)
│   │   │   ├── User.ts
│   │   │   ├── Bird.ts
│   │   │   └── Comment.ts
│   │   ├── routes/          # Rutas por tecnología
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── birds.ts
│   │   │   └── comments.ts
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
├── front-end/               # App React con demo unificada
│   ├── src/
│   │   ├── App.tsx          # Componente principal
│   │   ├── api.ts           # Clientes para todas las APIs
│   │   ├── components/      # Componentes React
│   │   └── context/         # Context providers
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── shared-types/            # Tipos compartidos
│   ├── models/              # Definiciones de modelos
│   └── index.ts
└── README.md               # Este archivo
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18+
- **pnpm** (recomendado) o npm

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/NachitoE/dsw-apis-demo.git
   cd dsw-apis-demo
   ```

2. **Instalar dependencias**

   ```bash
   # Con pnpm (recomendado)
   pnpm install

   # O con npm
   npm install
   ```

### Ejecutar el Proyecto

#### Opción A: Desarrollo Completo (Frontend + Backend)

```bash
# Terminal 1: Backend
cd back-end
pnpm dev

# Terminal 2: Frontend
cd front-end
pnpm dev
```

#### Opción B: Solo Frontend (desarrollo de UI)

```bash
cd front-end
pnpm dev
```

Luego abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🎮 Cómo Usar la Demo

### 1. **Seleccionar API**

Usa los botones en la parte superior para cambiar entre:

- REST
- GraphQL
- JSON-RPC
- tRPC

### 2. **Crear Usuario**

- Completa el formulario (nombre y email)
- Haz clic en **"Create"**
- Observa la traza del request/response

### 3. **Listar Usuarios**

- Haz clic en **"List"**
- Los usuarios aparecen en la tabla scrolleable
- Ve las diferencias en cómo cada API maneja la consulta

### 4. **Analizar Trazas**

- Cada operación muestra información detallada:
  - **Request**: qué se envió
  - **Metadata**: endpoint, método, headers
  - **Response**: qué se recibió
  - **Timing**: cuánto tardó

---

## 🎨 Características de UI

### Temas

- **Automático**: Detecta preferencias del navegador
- **Claro**: Interfaz luminosa con buen contraste
- **Oscuro**: Perfecto para trabajo nocturno

### Responsive Design

- **Móvil**: Layout vertical, componentes apilados
- **Tablet**: Layout adaptativo
- **Desktop**: Layout de dos columnas con formulario y tabla

### Interactividad

- **Hover states**: Botones responden al mouse
- **Estados de carga**: Feedback visual durante operaciones
- **Scroll suave**: Lista de usuarios con altura máxima
- **Focus visible**: Navegación con teclado

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- [React 18](https://react.dev/) - Library para UI
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Vite](https://vitejs.dev/) - Build tool y dev server
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Apollo Client](https://www.apollographql.com/docs/react/) - Cliente GraphQL

### Backend

- [Express.js](https://expressjs.com/) - Framework web
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - Servidor GraphQL
- [tRPC](https://trpc.io/) - Type-safe APIs
- [express-json-rpc-router](https://github.com/jdconley/express-json-rpc-router) - JSON-RPC
- [MikroORM](https://mikro-orm.io/) - ORM para TypeScript

### Herramientas

- [pnpm](https://pnpm.io/) - Gestor de paquetes eficiente
- [ESLint](https://eslint.org/) - Linting de código
- [Prettier](https://prettier.io/) - Formateo de código

---

## 📚 Casos de Uso

### 🎓 Educación

- **Workshops** sobre APIs modernas
- **Clases** de desarrollo web
- **Comparación** práctica de tecnologías
- **Demos** en vivo

### 💼 Desarrollo

- **Prototipado** rápido de APIs
- **Testing** de diferentes enfoques
- **Base** para proyectos nuevos
- **Referencia** de implementación

### 🔬 Investigación

- **Benchmarking** de performance
- **Análisis** de overhead
- **Comparación** de developer experience
- **Estudios** de adopción

---

## 🤝 Contribuir

¿Quieres mejorar el proyecto? ¡Genial!

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Ideas de Contribución

- 🎨 Mejoras de UI/UX
- 🔧 Nuevos tipos de API (WebSockets, Server-Sent Events)
- 📊 Métricas y analytics
- 🧪 Tests automatizados
- 📖 Documentación extendida

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

## 🙏 Agradecimientos

- Inspirado por la necesidad de comparar APIs modernas
- Construido para la comunidad de desarrolladores
- Gracias a todos los maintainers de las librerías utilizadas

---

## 📞 Contacto

**Proyecto**: [https://github.com/NachitoE/dsw-apis-demo](https://github.com/NachitoE/dsw-apis-demo)

**Demo Live**: [Próximamente...]

---

_¿Te resulta útil este proyecto? ¡Dale una ⭐ en GitHub!_
