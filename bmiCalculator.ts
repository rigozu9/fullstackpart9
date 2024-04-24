import { isNotNumber } from "./utils";

export const calculateBmi = (height: number, weight: number) => {
  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error("Invalid input: height and weight must be numbers");
  }
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight " + bmi;
  } else if (bmi > 24.9) {
    return "Overweight " + bmi;
  } else {
    return "Normal " + bmi;
  }
};