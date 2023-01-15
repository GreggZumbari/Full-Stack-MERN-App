import './App.css';
import React from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

function App() {

    const [exerciseToEdit, setExerciseToEdit] = useState();

    return (
        
        <body>
            <header>
                <h1>ExerciseHelper9000</h1>
                <p>ExerciseHelper9000 is a MERN app that allows the user to add and edit exercises to the list below. The exercises are stored in a MongoDB database.</p>
                <p>You can add your exercises by clicking the "Add" link below! To return to the home page, click the "Home" link!</p>
            </header>

            <div className="App">
            <Router>
                <div className="App-header">
                <Navigation />
                <Routes>
                    <Route path="/" element={
                        <HomePage setExerciseToEdit={setExerciseToEdit}/>
                    }/>
                    <Route path="/add-exercise" element={<AddExercisePage />}/>
                    <Route path="/edit-exercise" element={ 
                        <EditExercisePage exerciseToEdit={exerciseToEdit}/>
                    }/>
                </Routes>
                </div>
            </Router>
            </div>

            <footer>
                <p>© 2022 Greggory Hickman.</p>
            </footer>
        </body>
    );
}

export default App;