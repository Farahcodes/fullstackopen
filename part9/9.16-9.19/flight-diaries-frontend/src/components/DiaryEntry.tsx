// src/components/DiaryEntry.tsx
import React from 'react';

import type { DiaryEntry } from '../types';


interface DiaryEntryProps {
  entry: DiaryEntry;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry }) => {
  return (
    <li>
      <h3>{entry.date}</h3>
      <p>Weather: {entry.weather}</p>
      <p>Visibility: {entry.visibility}</p>
      {entry.comment && <p>Comment: {entry.comment}</p>} {/* Conditionally render comment */}
    </li>
  );
};

export default DiaryEntry;
