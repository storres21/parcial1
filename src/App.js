import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
          {/* Ruta principal */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/Home" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />

          {/* Ruta para el componente Home */}
          <Route
            path="/Home"
            element={
              isLoggedIn ? (
                <Home />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Otras rutas (si las tienes) */}
          <Route path="/book/:bookModel" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
