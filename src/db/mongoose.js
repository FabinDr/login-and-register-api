require('dotenv').config();

const mongoose = require('mongoose');

mongoose
    .connect("mongodb+srv://admin:VUgJBKdRyZ21xQPw@mddatabase.xcrm0t3.mongodb.net/MDdatabase?retryWrites=true&w=majority&appName=MDdatabase")
    .then(() => console.log("Banco de dados conectado"))
    .catch((error) => console.error('Não foi possível conectar com o banco de dados', error))

module.exports = mongoose;