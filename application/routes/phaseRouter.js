import express from 'express'
import { createPhase, listPhase, PhaseById } from "../controllers/PhaseController.js"

const router = express.Router();

//Fases
router.post('/create', createPhase); // Criar uma nova fase
router.get('/listPhase', listPhase); // Obter todas as fases
router.get('/PhaseBy', PhaseById); // Obter uma fase pelo ID

export default router