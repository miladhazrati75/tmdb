import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Details from './Details'

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/movie/:id/details' element={<Details/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
    );
}

export default App;
