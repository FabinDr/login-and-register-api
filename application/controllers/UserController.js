import User from '../models/user.js';
import bcrypt from 'bcrypt'

//Lista de todos os usuários
export async function listUser(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            message: "Lista de usuários:",
            data: [users],
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação."
        })
    }
}

//getUser pelo id
export async function userById(req, res) {
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
}

//Atualizar um user
export async function updateUser(req, res) {
    const { user_id } = req.params;
    const { fullname, username, email, password, birthday, gender } = req.body;

    try {
        //não vamos usar o findByIdAndUpdate pq vamos fazer o hash da nova senha
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                data: [],
                message: "Não foi possível encontrar este usuário.",
                error: "<user_id> não encontrado"
            });
        }
        // para atualizar os dados. O operador || foi usado para o caso de não haver mudanças no update, dessa forma, os dados ja existentes serão preservados 
        user.fullname = fullname || user.fullname
        user.username = username || user.username;
        user.email = email || user.email;
        user.birthday = birthday || user.birthday
        user.gender = gender || user.gender

        //para gerar um hash se a senha for atualizada
        if (password) {
            user.password = await bcrypt.hash(password, 10)
        }

        await user.save();

        res.status(200).json({
            status: "success",
            message: "Usuário atualizado com sucesso!",
            data: [user]
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação."
        })
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
            message: "Usuário deletado com sucesso!",
            data: [user]
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação."
        });
    }
}