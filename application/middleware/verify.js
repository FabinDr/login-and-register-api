import User from "../models/user.js";
import jwt from "jsonwebtoken";

export async function Verify(req, res, next) {
    try {
        const authHeader = req.headers["cookie"]; // Para obter o cookie da sessão do cabeçalho da solicitação

        if (!authHeader) return res.sendStatus(401); // se não houver cookie no cabeçalho da solicitação, enviar uma resposta não autorizada.
        const cookie = authHeader.split("=")[1]; // Se houver, dividir a string do cookie para obter o jwt real
        const accessToken = cookie.split(";")[0];
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken })

        if (checkIfBlacklisted)
            return res
                .status(401)
                .json({ message: "Esta sessão expirou. Por favor, faça login" });

        // Verificar usando jwt para ver se o token foi adulterado ou se expirou.
        // é como verificar a integridade do cookie
        jwt.verify(cookie, config.SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                // se o token foi alterado ou expirou, retornar um erro não autorizado
                return res
                    .status(401)
                    .json({ message: "Esta sessão expirou. Por favor, faça login" });
            }
            const { id } = decoded; // obter o ID do usuário a partir do token decodificado
            const user = await User.findById(id); // encontrar o usuário com esse `id`
            const { password, ...data } = user._doc; //retornar o objeto do usuário sem a senha
            req.user = data; // colocar o objeto de dados em req.user
            next();
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