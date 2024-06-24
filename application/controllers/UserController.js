import User from '../models/user.js';


//Para pegar todos os usuários
export async function listUser(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            data: [users],
            messege: "Lista de fases obtidas com sucesso"
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
            data: [user],
            message: "Usuário deletado com sucesso!"
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