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
        status: 'active',
        endpoints: {
            services: '/api-3-services/services',
            health: '/'
        }
    });
});

// Ruta de salud para Railway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api-3-services', userRouter);

// Agregar la conexion a la base de datos
ConnectDB();

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Ejecucion del servidor
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    console.log("Environment:", process.env.NODE_ENV || 'development');
});
