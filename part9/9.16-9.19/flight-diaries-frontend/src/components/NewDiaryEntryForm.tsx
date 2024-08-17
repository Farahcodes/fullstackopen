import React, { useState } from 'react';
import axios from 'axios';

// types
import { DiaryEntry, Weather, Visibility, NewDiaryEntry } from '../types';

interface NewDiaryEntryFormProps {
  onAddEntry: (newEntry: NewDiaryEntry) => void;
}

const NewDiaryEntryForm: React.FC<NewDiaryEntryFormProps> = ({ onAddEntry }) => {
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Great);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };

    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newEntry);
      onAddEntry(response.data);
      // Clear the form
      setNewDate('');
      setNewWeather(Weather.Sunny); // Reset to default
      setNewVisibility(Visibility.Great); // Reset to default
      setNewComment('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(`Failed to add diary entry: ${error.response.data}`);
        } else {
          alert('Network error. Please try again later.');
        }
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={newDate} onChange={e => setNewDate(e.target.value)} required />
      </div>

      {/* Weather radio buttons */}
      <div>
        <label>Weather:</label>
        {Object.values(Weather).map((weather) => (
          <label key={weather}>
            <input
              type="radio"
              value={weather}
              checked={newWeather === weather}
              onChange={() => setNewWeather(weather)}
            />
            {weather}
          </label>
        ))}
      </div>

      {/* Visibility radio buttons */}
      <div>
        <label>Visibility:</label>
        {Object.values(Visibility).map((visibility) => (
          <label key={visibility}>
            <input
              type="radio"
              value={visibility}
              checked={newVisibility === visibility}
              onChange={() => setNewVisibility(visibility)}
            />
            {visibility}
          </label>
        ))}
      </div>

      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default NewDiaryEntryForm;