import data from "../../data/patients";
import { PublicPatient, Patient } from "../types";

const getPatients = (): Patient[] => {
  return data;
}

const getPublicPatients = (): PublicPatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
}

export default {
  getPatients,
  getPublicPatients
};

