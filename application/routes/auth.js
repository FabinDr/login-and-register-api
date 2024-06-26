import express from 'express'
import { Register, Login, Logout } from '../controllers/auth.js'
import { listUser, userById, updateUser, deleteUser } from "../controllers/UserController.js"
import Validate from '../middleware/validate.js'
import { check } from 'express-validator'

const router = express.Router();

router.post(
    "/register",
    check("email")
        .isEmail()
        .withMessage("Por favor, insira um endereço de e-mail válido")
        .normalizeEmail(),
    check("fullname")
        .not()
        .isEmpty()
        .withMessage("Seu nome é obrigatório")
        .trim()
        .escape(),
    check("username")
        .not()
        .isEmpty()
        .withMessage("Nome de Usuário é obrgatório!")
        .trim()
        .escape(),
    check("password")
        .notEmpty()//se não está vazio
        .isLength({ min: 4 })
        .withMessage("A senha deve conter pelo menos 4 caracteres."),
    check("birthday")//problemas com a data
        .optional({ checkFalsy: true })
        .isISO8601() //yyy/mm/dd
        .withMessage("Por favor, insira uma data de nascimento válida"),
    check("gender")
        .isIn(['M', 'F'])
        .withMessage("Por favor, insira um gênero válido (M ou F)")
    ,
    Validate,
    Register
);

// Rota de Login
router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Por favor, insira um endereço de email válido")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
)
//Rota de Logout
router.get('/logout', Logout);

//ROTAS CRUD PARA USER
router.get('/listUser', listUser);// lista User
router.get('/UserById/:id', userById); // User pelo id
router.get('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser);

export default router;