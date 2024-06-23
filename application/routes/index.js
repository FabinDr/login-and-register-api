import express from "express";
import Auth from './auth.js'


const app = express();

app.use('/application/auth', Auth)
//Para desabilitar o cabeçalo das resposta HTTP
app.disable('x-powered-by');

app.get("/application", (req, res) => {
    try {
        res.status(200).json({
            status: 'Success',
            data: [],
            message: "Seja bem-vindo à página inicial da API Mangue Defender"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Ocorru um erro interno no Servidor"
        })
    }
})



export default app;