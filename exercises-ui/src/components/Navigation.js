import React from 'react';
import {Link} from 'react-router-dom';

function Navigation() {
  return (
    <nav>
       <Link to="/">Home</Link> 
       <a> </a> 
       <Link to="/add-exercise">Add</Link>
    </nav>
  );
}

export default Navigation;