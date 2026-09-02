Sistema de Gestión de Productos

Aplicación web para la gestión de productos mediante una interfaz moderna desarrollada con React y Material UI, conectada a un backend desarrollado con Python y Flask.

El sistema permite realizar operaciones CRUD completas sobre los productos: crear, consultar, actualizar y eliminar.

---

🚀 Tecnologías utilizadas:

- Frontend
  
- React
  
- Vite
  
- Material UI (MUI)

- JavaScript

- CSS

Backend

- Python

- Flask

- Flask-CORS

- API REST

Base de datos

- SQLite

---

✨ Funcionalidades

- Listar productos

- Crear productos

- Editar productos

- Eliminar productos

- Actualizar listado

- Notificaciones mediante Snackbar

---

⚙️ Instalación

1. Clonar el repositorio

Backend:

```bash

git clone https://github.com/Patogol35/Crud-Python/

```

Frontend

```bash

git clone https://github.com/Patogol35/Crud-React/

 ```

2. Configuración del Backend

Entrar a la carpeta del backend:

```bash

cd Crud-Python

```

Crear un entorno virtual:

```bash

python -m venv venv

```

Activar el entorno virtual en Windows:

```bash

venv\Scripts\activate

```

Instalar las dependencias:

```bash

pip install flask flask-cors

```

Ejecutar Flask:

```bash

python app.py

```

El backend estará disponible en:

http://127.0.0.1:5000


3. Configuración del Frontend

En otra terminal, entrar al frontend:

```bash

cd Crud-Front

```

Instalar las dependencias:

```bash

npm install

```

Ejecutar el proyecto:

```bash

npm run dev

```

La aplicación estará disponible normalmente en:

http://localhost:5173

---

🔗 Comunicación Frontend → Backend

El frontend se comunica con Flask mediante fetch() y una API REST.

---

📌 Endpoints principales

La API REST permite realizar operaciones CRUD completas sobre los productos.

- "GET"| "/"| Verificar el funcionamiento de la API

- "GET"| "/productos"| Obtener todos los productos

- "GET"| "/productos/{id}"| Obtener un producto específico por ID

- "POST"| "/productos"| Crear un nuevo producto

- "PUT"| "/productos/{id}"| Actualizar un producto existente

- "DELETE"| "/productos/{id}"| Eliminar un producto

Ejemplos de uso

Obtener todos los productos

- GET /productos

Obtener un producto por ID

- GET /productos/1

Crear un producto

- POST /productos

Ejemplo del cuerpo de la petición:

{
  "nombre": "Laptop",
  "descripcion": "Laptop para trabajo y desarrollo",
  "precio": 850,
  "categoria": "Tecnología"
}

Actualizar un producto

- PUT /productos/1

Ejemplo del cuerpo de la petición:

{
  "nombre": "Laptop HP",
  "descripcion": "Laptop actualizada para trabajo y desarrollo",
  "precio": 950,
  "categoria": "Tecnología"
}

Eliminar un producto

- DELETE /productos/1

---

🔐 Variables de entorno

Si el proyecto utiliza variables de entorno, crea un archivo .env y no lo subas a GitHub.

Ejemplo:

VITE_API_URL=http://127.0.0.1:5000

En producción se debe configurar la URL correspondiente al backend desplegado.

---

Este proyecto fue desarrollado como una aplicación práctica para demostrar la integración entre un frontend moderno en React y un backend REST desarrollado con Python y Flask, implementando operaciones CRUD y una interfaz responsive.

---

👨‍💻 Autor

Jorge Patricio Santamaría

Máster en Ingeniería de Software y Sistemas Informáticos

---

⭐ Si este proyecto te resulta útil, puedes darle una estrella al repositorio.

📱 Diseño responsive

🎨 Interfaz desarrollada con Material UI

🔗 Comunicación entre React y Flask mediante API REST
