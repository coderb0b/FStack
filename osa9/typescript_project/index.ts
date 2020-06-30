import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
    
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        const error = {
            error: "malformatted parameters"
        };
        res.send(error);
    }

    const result = {
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
    };

    res.send(result);
    
});

app.post('/exercises', (req, res) => {
    if (!req.body.daily_exercises || !req.body.target) {
        res.send({
            error: "parameters missing"
          });
    }

    const target = Number(req.body.target);
    const ex_hours = req.body.daily_exercises;
    
    if (ex_hours.some(isNaN) || isNaN(target)) {
        res.send({
            error: "malformatted parameters"
          });
    }

    const result = calculateExercises(target, ex_hours);
    res.json(result);

});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});