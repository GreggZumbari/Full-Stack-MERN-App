import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs'); //If the default value is not set to something and the user never clicks on the select element, then a bug occurs where no value is passed for unit
    const [date, setDate] = useState('');

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch("/exercises", {
            method: "POST",
            body: JSON.stringify(newExercise),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 201) {
            alert("Exercise added successfully!");
        }
        else {
            alert(`Failed to add exercise. Status code: ${response.status}`);
        }
        navigate("/")
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <h>Instructions:</h>
            <p>Please enter the desired data into every field down below. Click "Add" when you are done to add the exercise to the list.</p>
            <p>The date must be entered as MM-DD-YY (e.g. 02-15-01 for Feb. 15th 2001).</p>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select 
                value={unit} 
                onChange={e => setUnit(e.target.value)} >
                    
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;