import patientData from '../../data/patients.json';

import { NonSensitivePatientEntry } from '../types';

const getEntries = (): NonSensitivePatientEntry [] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default {
    getEntries
};

