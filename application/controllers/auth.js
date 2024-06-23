import User from '../models/user.js'
import bcrypt from 'bcrypt';

//Para registrar um usuário
export async function Register(req, res) {
    const { fullname, username, email, password, birhtday, gender } = req.body;
    try {
        const newUser = new User({
            fullname,
            username,
            email,
            password,
            birhtday,
            gender
        });
        //para checkar se a conta ja existe
        const exitingUser = await User.findOne({ email });
        if (exitingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Você já possui uma conta com este e-mail. Por favor, faça o login."
            })
        const savedUser = await newUser.save();
        //Retornar informações do usuário exceto a senha.
        const { password, role, ...user_data } = savedUser._doc;
        res.status(200).json({
            status: "success",
            data: [user_data],
            message:
                "Sua conta foi criada com sucesso! Obrigado por se registrar!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação.",
        });
    }
    res.end();
}

//Fazer login de um usuário

export async function Login(req, res) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "E-mail ou senha inválidos. Por favor, tente novamente com as credenciais corretas.",
            });
        // se o User existe
        // verificando/validando senha
        const isPasswordValid = await bcrypt.compare(
            `${req.body.password}`,
            user.password
        );
        // Retorna uma resposta não autorizada se não for válida
        if (!isPasswordValid)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "E-mail ou senha inválidos. Por favor, tente novamente com as credenciais corretas.",
            });
        //Retornar informações do usuário exceto a senha.
        const { password, ...user_data } = user._doc;

        res.status(200).json({
            status: "success",
            data: [user_data],
            message: "Você fez login com sucesso.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação.",
        });
    }
    res.end();
}


// export default Register