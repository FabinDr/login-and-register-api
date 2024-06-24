//middleware de autenticação com jwt
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.js";

export async function Verify(req, res, next) {
    try {
        const authHeader = req.headers["cookie"]; // vai extrair o cookie da sessão do header da req HTTP

        if (!authHeader) return res.sendStatus(401); // se não houver cookie no header, enviar uma resposta não autorizada (status 401).

        const cookie = authHeader.split("=")[1];
        const accessToken = cookie.split(";")[0];
        // Se houver, dividir a string do cookie para obter o jwt real

        //verifica se o token está na blacklist
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken })

        if (checkIfBlacklisted)
            return res
                .status(401)
                .json({ message: "Esta sessão expirou. Por favor, faça login" });

        //Usando a função jwt.verify para ver se o token foi adulterado ou se expirou.
        jwt.verify(cookie, config.SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                // se o token foi alterado ou expirou, retornar um erro não autorizado (401)
                return res
                    .status(401)
                    .json({ message: "Esta sessão expirou. Por favor, faça login" });
            }

            const { id } = decoded; // se token = valido, o cod pega o ID do usuário a partir do token decodificado
            const user = await User.findById(id); // busca o user com esse ´id´ no Database
            const { password, ...data } = user._doc; // vai retornar objeto do usuário sem a senha

            req.user = data; // vai colcar o objeto de dads do usuário em req.user
            next(); //continua a exec. a rota
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação.",
        });
    }
}