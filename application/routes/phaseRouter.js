import express from 'express'
import { createPhase, listPhase, PhaseById, updatePhase, deletePhase } from "../controllers/PhaseController.js"

const router = express.Router();

//Fases
router.post('/create', createPhase);
router.get('/listPhase', listPhase);
router.get('/PhaseById/:id', PhaseById);
router.put('/update/:id', updatePhase);
router.delete('/delete/:id', deletePhase);

export default router