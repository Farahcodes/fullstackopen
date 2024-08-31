import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// types
import { Entry, Diagnosis, HealthCheckRating } from "../../types";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Record<string, Diagnosis> }> = ({ entry, diagnoses }) => {
  const renderDiagnosisCodes = (diagnosisCodes: string[] | undefined) => {
    if (!diagnosisCodes) return null;
    return (
      <List>
        {diagnosisCodes.map(code => (
          <ListItem key={code}>
            <ListItemText
              primary={`${code}: ${diagnoses[code]?.name || "Unknown diagnosis"}`}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  const renderHealthCheckRating = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <Typography variant="body2">Health Rating: Healthy</Typography>;
      case HealthCheckRating.LowRisk:
        return <Typography variant="body2">Health Rating: Low Risk</Typography>;
      case HealthCheckRating.HighRisk:
        return <Typography variant="body2">Health Rating: High Risk</Typography>;
      case HealthCheckRating.CriticalRisk:
        return <Typography variant="body2">Health Rating: Critical Risk</Typography>;
      default:
        return null;
    }
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <Card style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h6">
              <MedicalServicesIcon /> Health Check
            </Typography>
            <Typography>Date: {entry.date}</Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
            <Typography>Description: {entry.description}</Typography>
            {renderHealthCheckRating(entry.healthCheckRating)}
            {renderDiagnosisCodes(entry.diagnosisCodes)}
          </CardContent>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h6">
              <WorkIcon /> Occupational Healthcare
            </Typography>
            <Typography>Date: {entry.date}</Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            <Typography>Description: {entry.description}</Typography>
            {entry.sickLeave && (
              <Typography>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>
            )}
            {renderDiagnosisCodes(entry.diagnosisCodes)}
          </CardContent>
        </Card>
      );
    case "Hospital":
      return (
        <Card style={{ marginBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h6">
              <LocalHospitalIcon /> Hospital
            </Typography>
            <Typography>Date: {entry.date}</Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
            <Typography>Description: {entry.description}</Typography>
            <Divider />
            <Typography variant="body2">Discharge Date: {entry.discharge.date}</Typography>
            <Typography variant="body2">Criteria: {entry.discharge.criteria}</Typography>
            {renderDiagnosisCodes(entry.diagnosisCodes)}
          </CardContent>
        </Card>
      );
    default:
      // Exhaustive type checking
      return assertNever(entry);
  }
};

// Utility function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default EntryDetails;