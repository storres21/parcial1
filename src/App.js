// app.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './views/Home';
import Login from './views/Login';
import './App.css';
import BookDetail from './views/BookDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de inicio de sesión */}
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/Home" element={<Home />} />
          <Route path="/book/:bookModel" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
