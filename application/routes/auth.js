//rota de registro
import express from 'express'
import { Register, Login } from '../controllers/auth.js'
import Validacao from '../middleware/validate.js'
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
        .notEmpty()
    // .isLength({ min: 8 })
    // .withMessage("A senha deve conter pelo menos 8 caracteres."),
    ,
    check("birthday")
        .optional({ checkFalsy: true })
        .isISO8601()
        .withMessage("Por favor, insira uma data de nascimento válida"),
    check("gender")
        .optional({ checkFalsy: true })
        .isIn(['M', 'F'])
        .withMessage("Por favor, insira um gênero válido (M ou F)")
    ,
    Validacao,
    Register
);

// Rota de Login ------------------------

router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Por favor, insira um endereço de email válido")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validacao,
    Login
)

export default router;