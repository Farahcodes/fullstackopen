import express from 'express';

import diagnosisService from '../services/DiagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnoses());
});

export default router;