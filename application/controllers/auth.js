import User from '../models/User.js';
import Blacklist from '../models/blacklist.js';
import bcrypt from 'bcrypt';

//Controlador para registros de usuários
// Vai receber os dados listados da solicitaça~o
export async function Register(req, res) {
    const { fullname, username, email, password, birthday, gender } = req.body;
    try {
        //Vai verificar se a conta ja existe (Email)
        const exitingUser = await User.findOne({ email });
        if (exitingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Você já possui uma conta com este e-mail. Por favor, faça o login."
            })

        // O mesmo para o Username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Nome de usuário já existe! Por favor, escolha outro nome de usuário."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword, //hash da senha antes de salvar no banco de dados
            birthday,
            gender,
        });

        const savedUser = await newUser.save();

        //Vai retornar as informações do usuário exceto a senha.
        const { password: _, ...user_data } = savedUser._doc;

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
            message: "Ocorreu um erro interno no Servidor durante a operação (./controllers).",
        });
    }
    res.end();
}

//Controlador para fazer login de um usuário
export async function Login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Conta não existe. Por favor, tente novamente com as credenciais corretas.",
            }); // Buscamos um User no DB com base no email e incluimos a senhas mesmo que ela esteja oculta. Se não encontrae o user, retorna (401)

        // se o User existe, vamos verificar se a senha é valida 
        const isPasswordValid = await bcrypt.compare(
            `${req.body.password}`, user.password);
        // Retorna (status 401) se não for válida
        if (!isPasswordValid)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "E-mail ou senha inválidos. Por favor, tente novamente com as credenciais corretas.",
            });
        //Retornar informações do usuário exceto a senha.
        const { password, _, ...user_data } = user._doc;

        // gerar Token e configurar cookie
        let options = {
            maxAge: 3600000, //60 min
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };
        // geramos um token para autenticção e um cookie ´SessionID´ com  token
        const token = user.generateAccessJWT();
        res.cookie("SessionID", token, options);

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

//Controlador para loigout e lista negra do banco de dados
export async function Logout(req, res) {
    try {
        const authHeader = req.headers['cookie'];
        if (!authHeader) return res.sendStatus(204);

        const cookie = authHeader.split('=')[1];
        const accessToken = cookie.split(';')[0];

        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });
        if (checkIfBlacklisted) return res.sendStatus(204);

        const newBlacklist = new Blacklist({ token: accessToken, });
        await newBlacklist.save();

        res.setHeader('Clear-Site-Data', '"cookies"');
        res.status(200).json({ message: 'Sua conta foi desconectada!' });

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Ocorreu um erro interno no Servidor durante a operação.',
        });
    }
    res.end();
}
// export default Register