# prtftx-backend
Prueba tecnica NodeJs, Express, TypeORM
# CRUD con Autenticación JWT y PostgreSQL

Este proyecto implementa un sistema CRUD para gestionar tipos y propiedades con autenticación basada en JWT. Utiliza Node.js con Express como backend y PostgreSQL como base de datos.

## Características

- Crear, leer, actualizar y eliminar (CRUD) tipos y propiedades.
- Implementar autenticación JWT para proteger los endpoints.
- Conectar con una base de datos relacional (PostgreSQL).
- Validar los datos en el servidor.
- Manejar errores y respuestas HTTP por medio de Middlewares.

## Tecnologías Utilizadas

- **Backend:** Node.js con Express.
- **Base de Datos:** PostgreSQL.
- **Autenticación:** JWT (JSON Web Tokens).
- **Manejo de Errores:** Middleware personalizado.
- **Repositorio de Código:** GitHub.
- **Despliegue:** Render (plan Hobby) o similar.

## Instalación y Configuración

### Prerrequisitos
- Node.js y npm instalados.
- PostgreSQL instalado y configurado.
- Archivo `.env` con las siguientes variables:
  ```env
  POSTGRES_URL=ruta_de_la_base_de_datos
  JWT_SECRET=clave_secreta
  PORT=3000
  ```

### Instalación

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/mariormolano/prtftx-backend.git
   cd prtftx-backend
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar rellenar los datos del .env
   ```sh
   vim .env
   ```
4. Iniciar el servidor:
   ```sh
   npm run dev
   ```

## Endpoints

### Autenticación y Roles

#### Registro de Usuarios
- **Endpoint:** `POST /api/auth/register`
- **Campos:** `nombre`, `email`, `contraseña`
- Valida que el email sea único y hashea la contraseña.

#### Inicio de Sesión
- **Endpoint:** `POST /api/auth/login`
- **Campos:** `email`, `contraseña`
- Verifica credenciales y genera un JWT.

#### Roles
- **ADMIN:** Puede crear, editar y eliminar tipos y propiedades.
- **USER:** Solo puede ver tipos y propiedades.

#### Middleware de Verificación de Rol
- Verifica si el usuario tiene los permisos necesarios.

### Tipos

#### Crear Tipo
- **Endpoint:** `POST /api/types`
- **Campos:** `nombre`, `descripción`, `propiedades` (array de IDs).
- Valida que el nombre sea único.

#### Obtener Todos los Tipos
- **Endpoint:** `GET /api/types`

#### Obtener un Tipo por ID
- **Endpoint:** `GET /api/types/:id`

#### Actualizar Tipo
- **Endpoint:** `PUT /api/types/:id`
- **Campos:** `nombre`, `descripción`, `propiedades`.

#### Eliminar Tipo
- **Endpoint:** `DELETE /api/types/:id`

### Propiedades

#### Crear Propiedad
- **Endpoint:** `POST /api/properties`
- **Campos:** `nombre`, `tipo` (`texto`, `número`, `fecha`, `check`).

#### Obtener Todas las Propiedades
- **Endpoint:** `GET /api/properties`

#### Obtener una Propiedad por ID
- **Endpoint:** `GET /api/properties/:id`

#### Actualizar Propiedad
- **Endpoint:** `PUT /api/properties/:id`
- **Campos:** `nombre`, `tipo`.

#### Eliminar Propiedad
- **Endpoint:** `DELETE /api/properties/:id`

## Base de Datos

### Script SQL
Se utiliza TypeORM para gestionar la base de datos, creación de tablas y relaciones en PostgreSQL.

## Manejo de Errores

Se implementa un middleware personalizado para manejar errores con respuestas HTTP adecuadas:

- `400 Bad Request`: Datos inválidos.
- `401 Unauthorized`: Token JWT inválido o no proporcionado.
- `404 Not Found`: Recurso no encontrado.
- `500 Internal Server Error`: Error del servidor.

## Despliegue

El proyecto puede ser desplegado en **Render** (plan Hobby) o una plataforma similar.
