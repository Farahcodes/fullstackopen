import React from "react";
import { Patient } from "../../types";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface PatientInfoProps {
  patient: Patient;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">{patient.name}</Typography>
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
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
    </>
  );
};

export default PatientInfo;