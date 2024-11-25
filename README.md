# PLibraryX

PLibraryX es un sistema de gestión de biblioteca personal, que te permitirá administrar tus libros de forma organizada.

## Requerimientos

Para ejecutar este proyecto, necesitas tener instalados los siguientes componentes:
- Node.js
- PostgreSQL

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DonySCode/plibraryx.git
   cd plibraryx
   ```

2. Llena las variables necesarias en los archivos `.env` y `.env.local` en las carpetas `backend` y `frontend`. Aquí tienes ejemplos de como llenar estas variables:

   - `frontend/.env.local`:
     ```dotenv
     NEXT_PUBLIC_API_URL=http://localhost:8080/api
     ```

   - `backend/.env`:
     ```dotenv
     DB_HOST=locahost
     DB_PORT=5432
     DB_USER=postgres
     DB_PASSWORD=PasswordDeDony
     DB_NAME=plibraryx
     JWT_SECRET=misecretito
     PORT=8080
     ```

3. Instala las dependencias del frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Instala las dependencias del backend:
   ```bash
   cd ../backend
   npm install
   ```

## Scripts

Para ejecutar el servidor de desarrollo tanto para el frontend como para el backend, usa el siguiente comando en la carpeta raíz del proyecto:
```bash
npm run backend:dev
npm run frontend:dev
```

Esto ejecutará los siguientes scripts:
- `frontend:dev`: Navega a la carpeta `frontend` y ejecuta el comando `npm run dev`.
- `backend:dev`: Navega a la carpeta `backend` y ejecuta el comando `npm run dev`.

---

## Documentación de la API

### Usuarios

- **POST /api/users/register**
  - Registro de un nuevo usuario.
  - Cuerpo de la solicitud:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST /api/users/login**
  - Inicio de sesión de un usuario.
  - Cuerpo de la solicitud:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### Libros

- **POST /api/books/**
  - Añadir un nuevo libro.
  - Cuerpo de la solicitud:
    ```json
    {
     "title": "string",
     "author":  "string",
     "year": "number",
     "genre": "string[]",
     "coverImage": "string",
     "rating":  "number",
     "isFavorite": "boolean",
    }
    ```

- **GET /api/books/**
  - Obtener todos los libros.

- **GET /api/books/:id**
  - Obtener un libro por su ID.

- **PUT /api/books/:id**
  - Actualizar un libro por su ID.
  - Cuerpo de la solicitud:
    ```json
    {
     "title": "string",
     "author":  "string",
     "year": "number",
     "genre": "string[]",
     "coverImage": "string",
     "rating":  "number",
     "isFavorite": "boolean",
    }
    ```

- **DELETE /api/books/:id**
  - Eliminar un libro por su ID.

- **PATCH /api/books/:id/favorite**
  - Marcar un libro como favorito.

- **PATCH /api/books/:id/unfavorite**
  - Desmarcar un libro como favorito.

---

## Deploy Funcional

http://plibraryx.donycastro.me/


