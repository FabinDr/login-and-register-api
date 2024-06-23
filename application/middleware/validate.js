import { validationResult } from "express-validator";

//Vamos validar a entrada do usuario em busca de informção incorretas ou malicious attempts. tudo isso para confirmar se o usuários fornecem informações corretas 

//função middleware

const Validacao = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {}
        errors.array().map((err) => (error[err.parm] = err.msg))
    }
}