import { v1 as uuid } from 'uuid'

import patients from "../../data/patients";
import { PublicPatient, Patient, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
}

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  }
  patients.push(newPatient);
  return newPatient;
}

export default {
  getPatients,
  getPublicPatients,
  addPatient
};

