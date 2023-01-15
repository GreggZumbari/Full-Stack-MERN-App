import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiWeightLiftingUp } from "react-icons/gi";

function HomePage({setExerciseToEdit}) {

    let navigate = useNavigate();

    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        const response = await fetch("/exercises");
        const data = await response.json();
        setExercises(data);
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    };

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: "DELETE"});
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } 
        else {
            console.error(`An exercise with id ${_id} does not exist.`)
        }
    };

    useEffect( () => {
        loadExercises();
    }, []);

    return (
        <>
            <h2><GiWeightLiftingUp/> List of Exercises <GiWeightLiftingUp/></h2>
            <ExerciseList exercises={exercises} onEdit={onEdit} onDelete={onDelete}></ExerciseList>
        </>
    );
}

export default HomePage;