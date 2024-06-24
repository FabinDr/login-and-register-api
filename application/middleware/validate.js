import { validationResult } from "express-validator";
//Vamos validar a entrada do usuario em busca de informção incorretas. Para confirmar se oss usuários fornecem informações corretas 
const Validacao = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {}
        errors.array().map((err) => (error[err.parm] = err.msg))
        return res.status(422).json({ error });
    }
    next();
}

export default Validacao;

