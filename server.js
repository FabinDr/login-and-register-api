import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDataBase from './application/database/mongoose.js';
import { PORT } from "./application/config/index.js";
import app from "./application/router/index.js";
import { config } from "dotenv";

const server = express();

//cConfigurando o header
server.use(cors());

server.disable("x-powered-by");

server.use(cookieParser());

server.use(express.urlencoded({ extended: false }));

server.use(express.json());

//Connect DATABASE
connectToDataBase()

server.use(app);

server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));




