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

        if (!updatedPhase) {
            return res.status(404).json({
                success: false,
                message: "Não foi encontrada uma fase com o identificador informado",
                error: 'Fase não encontrada'
            });
        }

        return res.json({
            success: true,
            message: "Fase atualizada com sucesso!",
            data: [updatedPhase]
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            messege: "Ocorreu um erro interno no Servidor durante a operação."
        });
    }
    res.end();
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
            data: [deletePhase],
            message: "Fase deletada com sucesso!"
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
