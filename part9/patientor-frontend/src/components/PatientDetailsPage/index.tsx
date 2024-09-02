import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography } from "@mui/material";

import { apiBaseUrl } from "../../constants";
import { Patient, Diagnosis } from "../../types";
import EntryDetails from "../EntryDetails";
import PatientInfo from "../PatientInfo";
import NewEntryForm from "../NewEntryForm";

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

  const handleEntryAdded = (updatedPatient: Patient) => {
    setPatient(updatedPatient);
  };

  if (!patient) {
    return <div>Loading patient details...</div>;
  }

  return (
    <Container>
      {/* Display patient info */}
      <PatientInfo patient={patient} />

      {/* Render the form ONCE to add a new entry */}
      <NewEntryForm patientId={id!} onEntryAdded={handleEntryAdded} />

      {/* Display the existing entries */}
      <Typography variant="h5">Entries:</Typography>
      {patient.entries?.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Container>
  );
};

export default PatientDetailsPage;