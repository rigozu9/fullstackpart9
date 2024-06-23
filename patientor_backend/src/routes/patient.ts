import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(NewPatientEntry);
    res.json(addedEntry);
  }  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);

  if (patient) {
      res.json(patient);
  } else {
      res.status(404).send({ error: 'Patient not found' });
  }
});

export default router;