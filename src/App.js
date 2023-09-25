import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./pages/Dashboard.jsx";
import { styles } from "./styles";

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
    <div className={`${styles.boxWidth}`}>
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
      </Routes>
    </Router></div>
  );
};

export default App;
