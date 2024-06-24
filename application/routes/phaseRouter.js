import express from 'express'
import { createPhase, listPhase, PhaseById } from "../controllers/PhaseController.js"

const router = express.Router();

//Fases
router.post('/create', createPhase);
router.get('/listPhase', listPhase);
router.get('/PhaseById', PhaseById);

export default router