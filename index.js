

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

//Base de datos
dbConnection();  

//Cors
app.use(cors())

// directorio publico
app.use(express.static('public'));
 
// lectura y parseo del body
app.use(express.json());


//rutas
app.use('/api/auth', require('./routes/auth'));  
app.use('/api/events', require('./routes/events'));  



//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`coriendo en el puerto ${process.env.PORT}`);
})

