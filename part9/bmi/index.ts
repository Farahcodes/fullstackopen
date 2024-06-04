import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const port = 3003;

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({
    weight: Number(weight),
    height: Number(height),
    bmi
  });

  return;
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

