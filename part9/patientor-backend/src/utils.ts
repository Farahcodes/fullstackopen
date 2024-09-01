import { NewPatient, Gender, NewEntry, HealthCheckRating, Discharge, SickLeave } from "./types";

// Type guards
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// Parsing functions
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseDiagnosisCodes = (object: unknown): Array<string> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<string>;
  }
  return object.diagnosisCodes as Array<string>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + rating);
  }
  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge');
  }
  if (!('date' in discharge) || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error('Incorrect or missing discharge date');
  }
  if (!('criteria' in discharge) || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge criteria');
  }
  return {
    date: discharge.date,
    criteria: discharge.criteria,
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sickLeave');
  }
  if (!('startDate' in sickLeave) || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error('Incorrect or missing sickLeave startDate');
  }
  if (!('endDate' in sickLeave) || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
    throw new Error('Incorrect or missing sickLeave endDate');
  }
  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate,
  };
};

// Function to convert input data into a NewPatient object
const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing patient');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return newPatient;
  } else {
    throw new Error('Incorrect or missing patient fields');
  }
};

const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  switch (object.type) {
    case "HealthCheck":
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      const occupationalEntry: NewEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
      };
      if (object.sickLeave) {
        occupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return occupationalEntry;
    default:
      throw new Error(`Invalid or missing entry type: ${object.type}`);
  }
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text');
  }
  return text;
};

export default toNewPatient;
export { toNewEntry };