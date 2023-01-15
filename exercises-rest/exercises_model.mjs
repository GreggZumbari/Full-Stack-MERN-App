import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async(name, reps, weight, unit, date) => {
    const new_exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return new_exercise.save();
}

const findExerciseById = async(filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

const replaceExercise = async(filter, exercise_update) => {

    //Return error if filter (which is the user's id) is undefined
    if (filter == undefined) {
        return 0;
    }

    //Update the user
    const update_exercise = await Exercise.updateOne(filter, exercise_update);

    //Return 0 (fail) or 1 (success)
    return update_exercise.modifiedCount;
}

const deleteById = async(_id) => {
    let exercise_id = {_id: _id}
    const delete_exercise = await Exercise.deleteOne(exercise_id);

    //Return 0 (fail) or 1 (success)
    return delete_exercise.deletedCount;
}

export {createExercise, findExerciseById, replaceExercise, deleteById};
