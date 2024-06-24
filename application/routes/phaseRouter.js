import express from 'express'
import { createPhase, listPhase, PhaseById, updatePhase, deletePhase } from "../controllers/PhaseController.js"

const router = express.Router();

//Fases
router.post('/create', createPhase); //Para criar uma fase
router.get('/listPhase', listPhase);// lista de todas as fase
router.get('/PhaseById/:id', PhaseById); // fase pelo id
router.put('/update/:id', updatePhase); // atualiazr uma fase
router.delete('/delete/:id', deletePhase);

export default router