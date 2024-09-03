import { useState } from "react";
import { TextField, Button, Alert, Typography, MenuItem, Select, FormControl, InputLabel, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";
import { NewHealthCheckEntry, HealthCheckRating, Patient, NewEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, Diagnosis } from "../../types";
import { apiBaseUrl } from "../../constants";

interface NewEntryFormProps {
  patientId: string;
  onEntryAdded: (patient: Patient) => void;
  diagnoses: Diagnosis[];  // Passing diagnoses as props
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const NewEntryForm: React.FC<NewEntryFormProps> = ({ patientId, onEntryAdded, diagnoses }) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [newEntry, setNewEntry] = useState<NewEntry>({
    type: "HealthCheck",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    healthCheckRating: HealthCheckRating.Healthy,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [field]: event.target.value });
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setNewEntry({ ...newEntry, diagnosisCodes: typeof value === 'string' ? value.split(',') : value });
  };

  const handleEntryTypeChange = (event: SelectChangeEvent<EntryType>) => {
    const selectedType = event.target.value as EntryType;
    setEntryType(selectedType);

    switch (selectedType) {
      case "HealthCheck":
        setNewEntry({
          type: "HealthCheck",
          description: "",
          date: "",
          specialist: "",
          healthCheckRating: HealthCheckRating.Healthy,
          diagnosisCodes: [],
        });
        break;
      case "Hospital":
        setNewEntry({
          type: "Hospital",
          description: "",
          date: "",
          specialist: "",
          discharge: { date: "", criteria: "" },
          diagnosisCodes: [],
        });
        break;
      case "OccupationalHealthcare":
        setNewEntry({
          type: "OccupationalHealthcare",
          description: "",
          date: "",
          specialist: "",
          employerName: "",
          sickLeave: { startDate: "", endDate: "" },
          diagnosisCodes: [],
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<Patient>(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry);
      onEntryAdded(response.data);
      setError(null);
      // Reset form after submission
      setEntryType("HealthCheck");
      setNewEntry({
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
        diagnosisCodes: [],
      });
    } catch (error: unknown) {
      console.error("Error adding entry:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "An error occurred");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const renderAdditionalFields = () => {
    switch (entryType) {
      case "HealthCheck":
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>Healthcheck Rating</InputLabel>
            <Select
              value={(newEntry as NewHealthCheckEntry).healthCheckRating.toString()}
              onChange={(event) =>
                setNewEntry({ ...newEntry, healthCheckRating: parseInt(event.target.value) as HealthCheckRating } as NewHealthCheckEntry)
              }
              label="Healthcheck Rating"
            >
              <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
            </Select>
          </FormControl>
        );
      case "Hospital":
        return (
          <>
            <TextField
              label="Discharge date"
              value={(newEntry as NewHospitalEntry).discharge?.date || ""}
              onChange={handleInputChange("discharge.date")}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Discharge criteria"
              value={(newEntry as NewHospitalEntry).discharge?.criteria || ""}
              onChange={handleInputChange("discharge.criteria")}
              fullWidth
              margin="normal"
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              label="Employer name"
              value={(newEntry as NewOccupationalHealthcareEntry).employerName || ""}
              onChange={handleInputChange("employerName")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Sick leave start date"
              value={(newEntry as NewOccupationalHealthcareEntry).sickLeave?.startDate || ""}
              onChange={handleInputChange("sickLeave.startDate")}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Sick leave end date"
              value={(newEntry as NewOccupationalHealthcareEntry).sickLeave?.endDate || ""}
              onChange={handleInputChange("sickLeave.endDate")}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Typography variant="h5">New {entryType} entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select value={entryType} onChange={handleEntryTypeChange}>
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          value={newEntry.description}
          onChange={handleInputChange("description")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          value={newEntry.date}
          onChange={handleInputChange("date")}
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Specialist"
          value={newEntry.specialist}
          onChange={handleInputChange("specialist")}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={newEntry.diagnosisCodes || []}
            onChange={handleDiagnosisChange}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox checked={newEntry.diagnosisCodes?.includes(diagnosis.code) || false} />
                <ListItemText primary={diagnosis.name} secondary={diagnosis.code} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderAdditionalFields()}
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
    </>
  );
};

export default NewEntryForm;