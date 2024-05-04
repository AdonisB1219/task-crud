# Task CRUD

Este es un proyecto de un crud para tareas, usa un json como base de datos, usando una arquitectura con buenas prácticas. 
El entorno por default es desarrollo, usando el puerto 3000.
También se incluye una colección de postman para probar los endpoints, que son los siguientes:

- GET /api/tasks/
- GET /api/tasks/:id
- POST /api/tasks/
- UPDATE /api/tasks/:id
- DELETE /api/tasks/:id

### Testing

Este proyecto cuenta con test unitarios de los endpoints, realizados con Jasmine.

## Scripts

### `npm run dev`

Corre el servidor en modo desarrollo.

### `npm run build`

Compila el proyecto para producciòn.

### `npm start`

Corre el compilado (Debe ejecutarse build primero).

### `npm test`

Corre todos los test unitarios con hot-reloading.


### `npm run test:no-reloading`

Corre todos los test unitarios sin hot-reloading.


También está preparado para cambiar las configuraciones en tres diferentes entornos usando archivos .env

Este proyecto fue generado con [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).
