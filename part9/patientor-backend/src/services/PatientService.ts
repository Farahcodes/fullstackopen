import { v1 as uuid } from 'uuid'

import data from "../../data/patients";
import { PublicPatient, Patient, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return data;
}

const getPublicPatients = (): PublicPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  }
  data.push(newPatient);
  return newPatient;
}



export default {
  getPatients,
  getPublicPatients,
  addPatient
};

