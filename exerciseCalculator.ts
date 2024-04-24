import { isNotNumber } from "./utils";
interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
  }
  
  function parseArguments(args: string[]): { target: number, dailyHours: number[] } {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    const target = Number(args[2]);
    if (isNotNumber(target)) throw new Error('Invalid target value');
  
    const dailyHours = args.slice(3).map(arg => {
      const hour = Number(arg);

      if (isNotNumber(hour)) throw new Error('All daily hours must be valid numbers');
      return hour;
    });
  
    return { target, dailyHours };
  }
  

  function calculateExercises(dailyHours: number[], target: number): Result {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const totalHours = dailyHours.reduce((a, b) => a + b, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
 
    let rating = 1;
    let ratingDescription = 'you can do better';
  
    if (average >= target) {
      rating = 3;
      ratingDescription = 'great job you reached your target';
    } else if (average >= target * 0.75) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  }
  
  const { target, dailyHours } = parseArguments(process.argv);
  const result = calculateExercises(dailyHours, target);
  console.log(result);