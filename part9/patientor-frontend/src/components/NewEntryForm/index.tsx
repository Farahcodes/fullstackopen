import { useState } from "react";
import { TextField, Button, Alert, Typography } from "@mui/material";
import { NewHealthCheckEntry, HealthCheckRating, Patient } from "../../types";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

interface NewEntryFormProps {
  patientId: string;
  onEntryAdded: (patient: Patient) => void;
}

const NewEntryForm: React.FC<NewEntryFormProps> = ({ patientId, onEntryAdded }) => {
  const [newEntry, setNewEntry] = useState<NewHealthCheckEntry>({
    type: "HealthCheck",
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: HealthCheckRating.Healthy,
    diagnosisCodes: [],
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof NewHealthCheckEntry) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (field === "healthCheckRating") {
      setNewEntry({ ...newEntry, [field]: parseInt(event.target.value, 10) as HealthCheckRating });
    } else if (field === "date") {
      setNewEntry({ ...newEntry, [field]: event.target.value });
    } else {
      setNewEntry({ ...newEntry, [field]: event.target.value });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<Patient>(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry);
      onEntryAdded(response.data);
      setNewEntry({
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
        diagnosisCodes: [],
      });
      setError(null);
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

  return (
    <>
      <Typography variant="h5">New HealthCheck entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
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
        <TextField
          label="Healthcheck rating"
          value={newEntry.healthCheckRating}
          onChange={handleInputChange("healthCheckRating")}
          fullWidth
          margin="normal"
          type="number"
          inputProps={{ min: 0, max: 4 }}
        />
        <TextField
          label="Diagnosis codes"
          value={newEntry.diagnosisCodes?.join(", ") || ""}
          onChange={(event) =>
            setNewEntry({ ...newEntry, diagnosisCodes: event.target.value.split(",").map((code) => code.trim()) })
          }
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
    </>
  );
};

export default NewEntryForm;