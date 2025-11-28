# Neotech Backend – API REST con Node.js y Express

## Descripción
Backend del e-commerce **Neotech**, desarrollado como proyecto integrador.  
La API está construida con **Node.js y Express**, utilizando MongoDB Atlas para la persistencia de datos.  
Incluye autenticación JWT, manejo de roles, módulos ABM y funcionalidades de carrito y favoritos.

---

## Funcionalidades Principales
1. Autenticación de usuarios (registro, login, JWT).  
2. Rol administrador preconfigurado.  
3. Gestión de productos (Alta, Baja, Modificación y Consulta).  
4. Gestión de usuarios (perfil, edición, favoritos).  
5. Carrito de compras (agregar, eliminar y actualizar productos).  
6. Generación de órdenes.  
7. Validaciones y seguridad con JWT.

---

## Usuario Administrador Inicial

Email del administrador:
```
admin@techstore.com
```

Contraseña del administrador:
```
123456
```

---

## Tecnologías Utilizadas
- Node.js  
- Express  
- MongoDB Atlas + Mongoose  
- JSON Web Tokens  
- bcryptjs  
- cors  
- dotenv  
- Nodemon  

---

## Estructura del Proyecto
```
/neotech-backend
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── routes/
│   ├── service/
│   └── index.js
├── .env
├── .gitignore 
├── package.json
└── README.md
```

---

## Variables de Entorno (.env)
Crear un archivo llamado `.env` en la raíz del proyecto e incluir:

```
PORT=5000
MONGO_URI=mongodb+srv://antosimo:12378917@cluster0.fuocglc.mongodb.net/neotech?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecreto
ADMIN_EMAIL=admin@techstore.com
ADMIN_PASSWORD=123456
```

---

## Instrucciones de Uso

### 1. Clonar el repositorio
```
git clone https://github.com/AntonellaSimonetti/neotech-back.git
cd neotech-back
```

### 2. Instalar dependencias
```
npm install
```

### 3. Configurar variables de entorno  
Crear el archivo `.env` con los valores indicados.

### 4. Iniciar en desarrollo
```
npm run dev
```

### 5. Iniciar en producción
```
npm start
```

---

## Endpoints Principales

### Auth
- POST /api/auth/register  
- POST /api/auth/login  

### Usuarios
- GET /api/users/profile  
- PUT /api/users/update  

### Favoritos
- POST /api/users/favorites/:productId  
- GET /api/users/favorites  

### Carrito
- POST /api/cart/add  
- GET /api/cart  
- DELETE /api/cart/remove/:id  

### Productos
- GET /api/products  
- POST /api/products  
- PUT /api/products/:id  
- DELETE /api/products/:id  

---

## Contribuidoras
- Antonella Simonetti  
- Clara Farias
