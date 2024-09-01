import { v1 as uuid } from 'uuid';

// data
import patients from "../../data/patients-full";
// types
import { PublicPatient, Patient, NewPatient, Entry, NewEntry } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {  // Accepting NewEntry, not Entry
  // Find the patient by ID
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }

  // Create a new entry with a generated ID
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  // Add the new entry to the patient's entries array
  patient.entries.push(newEntry);

  // Return the newly created entry
  return newEntry;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  getPatient,
  addEntry
};