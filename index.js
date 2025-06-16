// importacion del paquete de express
const express = require("express");
// importacion del paquete de cors
const cors = require("cors");
// conexion de la base de datos
const {ConnectDB} = require("./data/config");
// importacion de las rutas
const userRouter = require("./routes/serviceRoutes");
// Importacion dotenv
require("dotenv").config();

// Definicion del puerto - Railway asigna automáticamente el puerto
const PORT = process.env.PORT || 3008;

// Creacion de la instancia del servidor
const app = express();

// Configuración de CORS más permisiva para producción
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.json({ 
        message: 'API de Servicios funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            services: '/api-3-services/services'
        }
    });
});

app.use('/api-3-services', userRouter);

//Agregar la conexion a la base de datos
ConnectDB();

// Ejecucion del servidor
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
