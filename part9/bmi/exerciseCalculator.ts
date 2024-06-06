interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseRequest {
    daily_exercises: number[];
    target: number;
}

function calculateExercises(dailyExerciseHours: number[], target: number): ExerciseResult {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(day => day > 0).length;
  const average = dailyExerciseHours.reduce((sum, hour) => sum + hour, 0) / periodLength;
  const success = average >= target;

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Excellent! You met or exceeded your goal.';
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'You need to work harder to meet your goal.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

if (process.argv.length < 4) {
  console.log('Please provide the daily exercise hours and target as command line arguments.');
  process.exit(1);
}

const dailyExerciseHours = process.argv.slice(2).map(Number);
const target = dailyExerciseHours.shift() || 0;

console.log(calculateExercises(dailyExerciseHours, target));

export { calculateExercises, ExerciseResult, ExerciseRequest};