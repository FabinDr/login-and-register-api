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
            message: "Sucesso! A fase foi criada",
            data: [savedPhase],
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação."
        })
    }
};

// Get/read/ listar 
//Para get todas as fases
export async function listPhase(req, res) {
    try {
        const phase = await Phase.find();
        res.status(200).json({
            status: "success",
            message: "Lista de fases obtidas com sucesso",
            data: [phase]
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

//Get phase by id
export async function phaseById(req, res) {
    //Pegando um elemento pelo id (desestruturaç~ao) 
    const { id } = req.params; //req.params -- vai acessar um valor de parâmetro
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
            message: "Fase encontrada com sucesso!",
            data: [phase]
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

//Update/ Atualizar
export async function updatePhase(req, res) {
    const { id } = req.params;
    const { namephase, orderphase, pointsphase } = req.body;

    if (!id) {
        return res.status(400).json({
            status: "failed",
            data: [],
            message: "O identificador da fase não foi informado. " +
                "Por favor, forneça um valor válido para o campo 'phase_id'.",
            error: "<phase_id> não foi informado"
        });
    }
    try {
        const updatedPhase = await Phase.findByIdAndUpdate(id, { namephase, orderphase, pointsphase }, { new: true });
        //verifica se a fase foi atualizada e encontrada dps de (findByIdAndUpdate) 
        if (!updatedPhase) {
            return res.status(404).json({
                status: "success",
                message: "Não foi encontrada uma fase com o identificador informado",
                error: 'Fase não encontrada'
            });
        }

        return res.json({
            status: "success",
            message: "Fase atualizada com sucesso!",
            data: [updatedPhase]
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Ocorreu um erro interno no Servidor durante a operação."
        });
    }
}

//Delete
export async function deletePhase(req, res) {
    const { id } = req.params;
    try {
        const deletePhase = await Phase.findByIdAndDelete(id);
        if (!deletePhase) {
            return res.status(404).json({
                status: "failed",
                data: [],
                message: "Fase não encontrada."
            });
        }
        res.status(200).json({
            status: "success",
            message: "Fase deletada com sucesso!",
            data: [deletePhase]
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