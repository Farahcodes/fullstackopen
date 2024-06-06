import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseRequest } from './exerciseCalculator';

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

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body as ExerciseRequest;

    if (!daily_exercises || target === undefined) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(Number(target))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const result = calculateExercises(daily_exercises, Number(target));
    return res.json(result);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

