import patients from '../../data/patients';

import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';

import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...entry,
        entries: []
    };
  
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

export default {
    getPatients,
    getNonSensitiveEntries,
    addPatient,
    getPatientById
};
