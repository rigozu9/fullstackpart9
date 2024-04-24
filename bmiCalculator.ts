const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

const calculateBmi = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
        return "Underweight " + bmi
    } else if (bmi > 24.9) {
        return "Overweight " + bmi
    } else 
        return "Normal " + bmi
}

console.log(calculateBmi(height, weight))