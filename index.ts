import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from "./utils";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});