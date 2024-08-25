
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender{
  Male = 'male',
  Female = 'female',
  Other= 'other'
}

export interface Entry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  discharge?: {
    date: string;
    criteria: string;
  };
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  healthCheckRating?: number;
  employerName?: string;
  [key: string]: any;
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// Patient interface without ssn
export type PublicPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;



