// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiaryEntry from './components/DiaryEntry';


const App: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

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

  return (
    <div>
      <h1>My Diary</h1>
      <ul>
        {diaryEntries.map(entry => (
          <DiaryEntry key={entry.id} entry={entry} />
        ))}
      </ul>
    </div>
  );
};

export default App;
