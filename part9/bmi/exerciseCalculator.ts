interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
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

// Example call with hardcoded values
const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;
console.log(calculateExercises(dailyExerciseHours, target));

export { calculateExercises, ExerciseResult };