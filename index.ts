import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'; 
import { isNotNumber } from "./utils";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
  
    if (!height || !weight || isNotNumber(Number(height)) || isNotNumber(Number(weight))) {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }
  
    try {
      const bmi = calculateBmi(Number(height), Number(weight));
      res.json({
        weight,
        height,
        bmi
      });
    } catch (error) {
      res.status(400).json({ error: "malformatted parameters" });
    }
  });

  app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
  
    if (!daily_exercises || !target) {
      res.status(400).json({ error: "parameters missing" });
      return;
    }
  
    if (!Array.isArray(daily_exercises) ||
        daily_exercises.some(isNotNumber) ||
        isNotNumber(target)) {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }
  
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = calculateExercises(daily_exercises, target);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "malformatted parameters" });
    }
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});