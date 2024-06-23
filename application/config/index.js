//arquivo para organizar as variáveis de ambiente

import * as dotenv from "dotenv"
dotenv.config();

const { DATABASE_URL, PORT, SECRET_TOKEN } = process.env;

export { DATABASE_URL, PORT, SECRET_TOKEN };