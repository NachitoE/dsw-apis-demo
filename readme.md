# API Demo - Comparación de 4 Tecnologías

Demo que implementa la misma funcionalidad (CRUD de usuarios) usando cuatro tipos de APIs diferentes para comparar cómo funcionan.

## APIs Implementadas

| Tecnología | Endpoint     | Descripción               |
| ---------- | ------------ | ------------------------- |
| REST       | `/api/users` | HTTP estándar con verbos  |
| GraphQL    | `/graphql`   | Query language            |
| JSON-RPC   | `/rpc`       | Llamadas de procedimiento |
| tRPC       | `/trpc`      | Type-safe end-to-end      |

## Estructura

```
├── back-end/     # Servidor Express con las 4 APIs
├── front-end/    # React app para probar las APIs
└── shared-types/ # Tipos compartidos
```

## Instalación y Uso

1. Clonar repositorio
2. `pnpm install`
3. Backend: `cd back-end && pnpm dev`
4. Frontend: `cd front-end && pnpm dev`
5. Abrir http://localhost:5173

## Qué hace

- Crear usuarios con nombre y email
- Listar usuarios existentes
- Ver requests/responses de cada API
- Comparar diferencias entre tecnologías

## Stack

**Frontend:** React + TypeScript + Vite + Tailwind  
**Backend:** Express + TypeScript + MikroORM

Útil para workshops, clases o comparar tecnologías de APIs.
