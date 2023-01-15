import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';
import {body, oneOf, validationResult} from 'express-validator';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new execise with all 5 required properties provided in the body
 */
app.post(
    '/exercises', 

    //This is where all of the input validation happens
    body('name').isAscii(),
    body('name').isLength({min: 1}),
    body('reps').isInt({min: 1}),
    body('weight').isInt({min: 1}),
    oneOf([
        body('unit').equals('kgs'),
        body('unit').equals('lbs')
    ]),
    body('date').blacklist('/').isDate("MM-DD-YY", true, ['-']),

    (req, res) => 
{
    // If there were any validation errors, return status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({Error: "Invalid request"});
    }
    
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // Send back status code 400 in case of an error.
            res.status(400).json({ Error: "Invalid request"});
        });
});

/**
 * Retrieve all exercises.
 */
 app.get('/exercises', (req, res) => {
    exercises.findExerciseById({})
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Request failed" });
        });
});

/**
 * Retrive the single exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const filter = {_id: req.params._id} // A filter which contains the provided ID

    exercises.findExerciseById(filter)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } 
            else {
                res.status(404).json({ Error: "Resource not found" });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: "Not found"});
        });
});

/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put(
    '/exercises/:_id', 

    // This is where all of the input validation happens
    body('name').isAscii(),
    body('name').isLength({min: 1}),
    body('reps').isInt({min: 1}),
    body('weight').isInt({min: 1}),
    oneOf([
        body('unit').equals('kgs'),
        body('unit').equals('lbs')
    ]),
    body('date').blacklist('/').isDate("MM-DD-YY", true, ['-']),

    (req, res) => 
{
    // If there were any validation errors, return status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({Error: "Invalid request"});
    }

    const filter = {_id: req.params._id} // A filter which contains the provided ID
    const exercise_update = { // An object which contains the updated information
        name: req.body.name, 
        reps: req.body.reps, 
        weight: req.body.weight, 
        unit: req.body.unit, 
        date: req.body.date
    }

    exercises.replaceExercise(filter, exercise_update)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({
                    _id: req.params._id, 
                    name: req.body.name, 
                    reps: req.body.reps, 
                    weight: req.body.weight, 
                    unit: req.body.unit, 
                    date: req.body.date
                })
            } 
            else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request"});
        });
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } 
            else {
                res.status(404).json({ Error: "Not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(404).json({ Error: "Not found"});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});