interface BmiResult {
  bmi: number;
  category: string;
}

const calculateBmi = (heightCm: number, weightKg: number): BmiResult => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return { bmi, category: "Underweight" };
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return { bmi, category: "Normal (healthy weight)" };
  } else if (bmi >= 25 && bmi < 29.9) {
    return { bmi, category: "Overweight" };
  } else {
    return { bmi, category: "Obese" };
  }
};

if (process.argv.length !== 4) {
  console.log("Please provide the height (in cm) and weight (in kg) as command line arguments.");
} else {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
}

export { calculateBmi };
