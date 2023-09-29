import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './views/Home';
import Login from  './views/Login';
import './App.css';
import BookDetail from './views/BookDetail';

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/book/:bookModel" element={<BookDetail />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;