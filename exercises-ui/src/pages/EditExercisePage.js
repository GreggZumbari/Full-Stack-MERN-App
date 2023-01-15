import Reaimportct, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {

    let navigate = useNavigate();

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: "PUT",
            body: JSON.stringify(editedExercise),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            alert("Changes saved successfully!");
        }
        else {
            alert(`Failed to edit exercise. Status code: ${response.status}`);
        }
        navigate("/")
    };

    return (
        <div>
            <h2>Edit Exercise</h2>
            <h>Instructions:</h>
            <p>The selected exercise's data is displayed in the fields down below. Click "Save Changes" when you are done editing the desired fields.</p>
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
                onClick={editExercise}
            >Save Changes</button>
        </div>
    );
}

export default EditExercisePage;