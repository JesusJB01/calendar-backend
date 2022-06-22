require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');


const dbConnection = async () => {



    try {
        console.log('Connecting to database...');
      await mongoose.connect(process.env.DB_CNN); 
        console.log('DB is connected');


    } catch (error) {
        console.log("error", error);
        throw new Error("Error al conectar con la base de datos");
    }
}

module.exports = {
    dbConnection
}