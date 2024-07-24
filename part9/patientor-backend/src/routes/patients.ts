import express from 'express';

import patientService from '../services/PatientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});



export default router;