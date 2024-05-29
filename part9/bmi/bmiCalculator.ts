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

console.log(calculateBmi(180, 74));
export { calculateBmi };

