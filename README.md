# Task CRUD

Este es un proyecto de un crud para tareas, usa un json como base de datos, usando una arquitectura con buenas prácticas. 
El entorno por default es desarrollo, usando el puerto 3000.
También se incluye una colección de postman para probar los endpoints, que son los siguientes:

- GET /api/tasks/
- GET /api/tasks/:id
- POST /api/tasks/
- UPDATE /api/tasks/:id
- DELETE /api/tasks/:id

## Scripts

### `npm run dev`

Run the server in development mode.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).


También está preparado para cambiar las configuraciones en tres diferentes entornos usando archivos .env

Este proyecto fue generado con [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).
