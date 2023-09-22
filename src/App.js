import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [key, setKey] = useState(0);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const resetAppState = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <Router key={key}>
      <Routes>
        <Route
          path="/"
          element={
            currentForm === "login" ? (
              <Login onFormSwitch={toggleForm} />
            ) : (
              <Signup onFormSwitch={toggleForm} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard onLogout={resetAppState} />}
        />
        {/* Pass the function as prop */}
      </Routes>
    </Router>
  );
};

export default App;
