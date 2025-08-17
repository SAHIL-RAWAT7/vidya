// src/utils/bmiCalculator.js

/**
 * Calculate BMI
 * @param {number} weight in kilograms
 * @param {number} height in centimeters
 * @returns {object} { bmi, category }
 */
export const calculateBMI = (weight, height) => {
  if (!weight || !height) return { bmi: null, category: 'Invalid input' };

  const heightInMeters = height / 100;
  const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(1);

  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 24.9) category = 'Normal weight';
  else if (bmi < 29.9) category = 'Overweight';
  else category = 'Obese';

  return { bmi, category };
};
