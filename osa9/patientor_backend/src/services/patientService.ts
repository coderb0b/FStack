import patientData from '../../data/patients.json';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getEntries = (): NonSensitivePatientEntry [] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
        id: (((1+Math.random())*0x10000)|0).toString(16),
        ...entry
    };

    patientData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient
};

