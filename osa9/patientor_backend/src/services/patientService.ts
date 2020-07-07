import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';

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

const patientEntries: Patient [] = patientData.map(obj => {
    const object = toNewPatientEntry(obj) as Patient;
    object.id = obj.id;
    return object;
});

export default {
    getEntries,
    addPatient,
    patientEntries
};

