// src/components/NewDiaryEntryForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

import { DiaryEntry,Weather,Visibility,NewDiaryEntry } from '../types';

interface NewDiaryEntryFormProps {
  onAddEntry: (newEntry: NewDiaryEntry) => void;
}

const NewDiaryEntryForm: React.FC<NewDiaryEntryFormProps> = ({ onAddEntry }) => {
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: Omit<DiaryEntry, 'id'> = {
      date: newDate,
      weather: newWeather as Weather,
      visibility: newVisibility as Visibility,
      comment: newComment,
    };

    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newEntry)


      onAddEntry(response.data);
      // Clear the form
      setNewDate('');
      setNewWeather('');
      setNewVisibility('');
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
      <div>
        <label htmlFor="weather">Weather:</label>
        <input type="text" id="weather" value={newWeather} onChange={e => setNewWeather(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="visibility">Visibility:</label>
        <input type="text" id="visibility" value={newVisibility} onChange={e => setNewVisibility(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" value={newComment} onChange={e => setNewComment(e.target.value)} />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default NewDiaryEntryForm;
