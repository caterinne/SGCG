const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const institucionesRoutes = require('./routes/instituciones');
const coordinadoresRoutes = require('./routes/coordinadores');
const conveniosRoutes = require('./routes/convenios');
const historialRoutes = require('./routes/historial');


const app = express();
app.use(cors());
app.use(express.json()); 

// Conectar a la base de datos
connectDB();

// Usar las rutas
app.use('/api/SGCU/Usuarios', usuariosRoutes);
app.use('/api/SGCU/Instituciones', institucionesRoutes);
app.use('/api/SGCU/Coordinadores', coordinadoresRoutes);
app.use('/api/SGCU/Convenios', conveniosRoutes);
app.use('/api/SGCU/Historial', historialRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5038;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});