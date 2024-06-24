import User from '../models/user.js';

//Lista de todos os usuários
export async function listUser(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            messege: "Lista de usuários:",
            data: [users],
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            messege: "Ocorreu um erro interno no Servidor durante a operação."
        })
        res.end()
    }
}
//getUser pelo id
export async function UserById(req, res) {
    const { user_id } = req.params;
    try {
        const user = await User.findById(user_id)
        if (!user) {
            return res.status(404).json({
                status: "failed",
                data: [],
                message: "Não foi possível encontrar este usuário.",
                error: "<user_id> não encontrado"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Usuário encontrado!",
            data: [user]
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação."
        })
    }
    res.end();
}

//Atualizar um user




//Delete
export async function deleteUser(req, res) {
    const { user_id } = req.params;
    try {
        const user = await User.findByIdAndDelete(user_id);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                data: [],
                message: "Usuário não encontrada."
            });
        }
        res.status(200).json({
            status: "success",
            message: "Usuário deletado com sucesso!",
            data: [user]
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Seridor durante a operação."
        });
    }
    res.end();
}