import express from 'express';

import patientService from '../services/PatientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

export default router;