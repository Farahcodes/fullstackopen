import { NewPatient } from "./types";

const parseString = (value: unknown): string => {
  if (typeof value !== 'string') {
    throw new Error('Invalid string value');
  }
  return value;
};

const toNewPatient = (object: unknown): NewPatient => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing patient');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseString(object.gender),
      occupation: parseString(object.occupation)
    };
  return newPatient;
  } else {
    throw new Error('Incorrect or missing patient');
  }
};

export default toNewPatient;
