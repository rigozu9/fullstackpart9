import patients from '../../data/patients';

import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';

import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
    const id = uuid()
    const newPatientEntry = {
      id: id,
      ...entry
    };
  
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitiveEntries,
    addPatient
};