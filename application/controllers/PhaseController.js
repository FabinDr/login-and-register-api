import Phase from "../models/phase.js";
//Operação de CRUD para fase

//Para criar (Create)
export async function createPhase(req, res) {
    const { namephase, orderphase, pointsphase } = req.body;
    try {
        //instância
        const newPhase = new Phase({ namephase, orderphase, pointsphase })
        //salva no DB
        const savedPhase = await newPhase.save()

        res.status(200).json({
            status: "success",
            data: [savedPhase],
            messege: "Sucesso! A fase foi criada"
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            messege: "Ocorreu um erro interno no Servidor durante a operação."
        })
    }
    res.end()
};

// Get/read/ listar 
//Para get todas as fases
export async function listPhase(req, res) {
    try {
        const phase = await Phase.find();
        res.status(200).json({
            status: "success",
            data: [phase],
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

//Get phase by id
export async function PhaseById(req, res) {
    //Pegando um eletmento pelo id (desestruturaç~ao) 
    const { id } = req.params; //req.params -- vai acessr um valor de parâmetro
    try {
        const phase = await Phase.findById(id)
        if (!phase) {
            return res.status(404).json({
                status: "failed",
                data: [],
                message: "Não foi possível encontrar essa fase.",
                error: "<id> não encontrado"
            });
        }
        res.status(200).json({
            status: "success",
            data: [phase],
            message: "Fase encontrada com sucesso!"
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
