import express from 'express'
import { createPhase, listPhase, phaseById, updatePhase, deletePhase } from "../controllers/PhaseController.js"

const router = express.Router();

router.post('/create', createPhase); //Para criar uma fase
router.get('/listPhase', listPhase);// lista de todas as fase
router.get('/phaseById/:id', phaseById); // fase pelo id
router.put('/update/:id', updatePhase); // atualizar uma fase
router.delete('/delete/:id', deletePhase);

export default router