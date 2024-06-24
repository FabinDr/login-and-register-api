import mongoose from 'mongoose';
import { DATABASE_URL } from "../config/index.js";

async function connectToDataBase() {
    mongoose.Promise = global.Promise;
    mongoose.set('strictQuery', false)
    await mongoose.connect(DATABASE_URL).then(() => console.log("Banco de dados conectado"))
        .catch((error) => console.error('Não foi possível conectar com o banco de dados', error))
}

//codigo em teste
// async function connectToDataBase() {
//     await mongoose.connect(DATABASE_URL)
//         .then(() => console.log("Banco de dados conectado"))
//         .catch((error) => console.error('Não foi possível conectar com o banco de dados', error))
// }
export default connectToDataBase
