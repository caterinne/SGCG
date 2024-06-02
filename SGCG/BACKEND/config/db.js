const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb+srv://caterinneavendano:SGCU12345678@sgcu.v9ohui3.mongodb.net/SGCU?retryWrites=true&w=majority&appName=SGCU';

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("Conexión a MongoDB establecida");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos.");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;