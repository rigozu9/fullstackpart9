// src/components/PatientDetail.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from "../constants";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/api/patients/${id}`);
        setPatient(patientData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  console.log(patient.entries);

  return (
    <Box p={3}>
      <Typography variant="h5">{patient.name}</Typography>
      <Typography variant="body1">Gender: {patient.gender}</Typography>
      <Typography variant="body1">SSH: {patient.ssn}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography variant="h5">Entries:</Typography>
      {patient.entries.map((entry: Entry) => (
        <Box key={entry.id} mb={2}>
          <Typography variant="body2">Date: {entry.date}</Typography>
          <Typography variant="body2">Description: {entry.description}</Typography>
          <Typography variant="body2">Diagnosis codes: {entry.diagnosisCodes ? entry.diagnosisCodes.join(', ') : 'None'}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientDetail;
