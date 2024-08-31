import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { apiBaseUrl } from "../../constants";
import { Patient, Diagnosis } from "../../types";
import EntryDetails from "../EntryDetails";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Extract patient ID from URL
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, Diagnosis>>({});

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
        const diagnosesObject = response.data.reduce((acc, diagnosis) => {
          acc[diagnosis.code] = diagnosis;
          return acc;
        }, {} as Record<string, Diagnosis>);
        setDiagnoses(diagnosesObject);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      }
    };

    void fetchPatientDetails();
    void fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

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
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Container>
  );
};

export default PatientDetailsPage;