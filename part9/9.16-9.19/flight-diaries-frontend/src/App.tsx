// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// components
import DiaryEntry from './components/DiaryEntry';
import NewDiaryEntryForm from './components/NewDiaryEntryForm';
// type
import { NewDiaryEntry } from './types';


const App: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  // fetching entries
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries');
        setDiaryEntries(response.data);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };

    fetchDiaries();
  }, []);

  const handleAddEntry = (newEntry: NewDiaryEntry) => {
    const updatedEntry = { ...newEntry, id: Date.now() }; // add id
    setDiaryEntries([...diaryEntries, updatedEntry]);
  };

  return (
    <div>
      <h1>My Diary</h1>
      <NewDiaryEntryForm onAddEntry={handleAddEntry} />
      <ul>
        {diaryEntries.map(entry => (
          <DiaryEntry key={entry.id} entry={entry} />

        ))}
      </ul>
    </div>
  );
};

export default App;
