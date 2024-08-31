import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { apiBaseUrl } from "../../constants";
import { Patient, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, Diagnosis } from "../../types";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Extract patient ID from URL
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(response.data);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      }
    };

    void fetchPatientDetails();
    void fetchDiagnoses();
  }, [id]);

  if (!patient || !diagnoses) {
    return <div>Loading patient details...</div>;
  }

  // Function to get the diagnosis name by its code
  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? `${code} ${diagnosis.name}` : code;
  };

  // Function to render specific entry type
  const renderEntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return renderHealthCheckEntry(entry);
      case "OccupationalHealthcare":
        return renderOccupationalHealthcareEntry(entry);
      case "Hospital":
        return renderHospitalEntry(entry);
      default:
        return null;
    }
  };

  const renderHealthCheckEntry = (entry: HealthCheckEntry) => (
    <Card style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography variant="h6">Health Check</Typography>
        <Typography>Date: {entry.date}</Typography>
        <Typography>Specialist: {entry.specialist}</Typography>
        <Typography>Description: {entry.description}</Typography>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map(code => (
              <li key={code}>{getDiagnosisName(code)}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );

  const renderOccupationalHealthcareEntry = (entry: OccupationalHealthcareEntry) => (
    <Card style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography variant="h6">Occupational Healthcare</Typography>
        <Typography>Date: {entry.date}</Typography>
        <Typography>Specialist: {entry.specialist}</Typography>
        <Typography>Employer: {entry.employerName}</Typography>
        <Typography>Description: {entry.description}</Typography>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map(code => (
              <li key={code}>{getDiagnosisName(code)}</li>
            ))}
          </ul>
        )}
        {entry.sickLeave && (
          <Typography>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>
        )}
      </CardContent>
    </Card>
  );

  const renderHospitalEntry = (entry: HospitalEntry) => (
    <Card style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography variant="h6">Hospital</Typography>
        <Typography>Date: {entry.date}</Typography>
        <Typography>Specialist: {entry.specialist}</Typography>
        <Typography>Description: {entry.description}</Typography>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map(code => (
              <li key={code}>{getDiagnosisName(code)}</li>
            ))}
          </ul>
        )}
        <Typography>Discharge Date: {entry.discharge.date}</Typography>
        <Typography>Discharge Criteria: {entry.discharge.criteria}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">{patient.name}</Typography>
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : (
          <FemaleIcon />
        )}
      </div>
      <List>
        <ListItem>
          <ListItemText primary="SSN" secondary={patient.ssn} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Occupation" secondary={patient.occupation} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Gender" secondary={patient.gender} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Date of Birth" secondary={patient.dateOfBirth} />
        </ListItem>
      </List>
      <Typography variant="h5">Entries:</Typography>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          {renderEntryDetails(entry)}
        </div>
      ))}
    </Container>
  );
};

export default PatientDetailsPage;