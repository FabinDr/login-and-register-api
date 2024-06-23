const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(cors);
app.use(express.json());


mongoose.connect("mongodb+srv://admin:VUgJBKdRyZ21xQPw@mddatabase.xcrm0t3.mongodb.net/MDdatabase?retryWrites=true&w=majority&appName=MDdatabase")
    .then(() => console.log("Banco de dados conctado!"))
    .catch((error) => console.error("Banco de dados não conctado!", error))


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

module.exports = mongoose;