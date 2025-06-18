// Dependencia de mongoose 
const mongoose = require("mongoose");
// Dependencia para el archivo .env
require("dotenv").config();

// Extraer en una url lo que contiene el .env
const URL = process.env.URL;

// Conexion a la base de datos 
const ConnectDB = async () => {
    try {
        // Opciones de conexión para Railway
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // 10 segundos
            socketTimeoutMS: 45000, // 45 segundos
        };

        await mongoose.connect(URL, options);
        
        // Mensaje de que la base de datos funciona correctamente
        console.log("✅ Database connected successfully");
        console.log("📊 Database name:", mongoose.connection.name);
        
    } catch (error) {
        // Mensaje de error si la conexion falla
        console.error("❌ Cannot connect to database:", error.message);
        console.error("🔗 Connection URL:", URL ? "URL provided" : "URL missing");
        
        // Reintentar conexión después de 5 segundos
        setTimeout(ConnectDB, 5000);
    }
};

// Manejo de eventos de conexión
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected');
});

// Exportacion del modulo
module.exports = { ConnectDB };
