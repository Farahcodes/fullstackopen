import { NewPatient, Gender } from "./types";

// type guards
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown): string => {
  if (typeof value !== 'string') {
    throw new Error('Invalid string value');
  }
  return value;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }

  return gender;
}

const toNewPatient = (object: unknown): NewPatient => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing patient');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    };
  return newPatient;
  } else {
    throw new Error('Incorrect or missing patient');
  }
};

export default toNewPatient;
