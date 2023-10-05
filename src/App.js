import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./pages/Dashboard.jsx";
import { styles } from "./styles";
import List from "./components/food/List";
import RandomMeal from "./components/food/RandomMeal";
import CategoryList from "./components/food/Category/CategoryList";
import CategorySearch from "./components/food/Category/CategorySearch";
import IngredientList from "./components/food/Ingredient/IngredientList";
import IngredientSearch from "./components/food/Ingredient/IngredientSearch";
import AreaList from "./components/food/Area/AreaList";
import AreaSearch from "./components/food/Area/AreaSearch";
import MealSearch from "./components/food/MealSearch";

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
          <Route
            path="/mealSearch"
            element={<MealSearch onLogout={resetAppState} />}
          />
          <Route path="/list" element={<List onLogout={resetAppState} />} />
          <Route
            path="/randomMeal"
            element={<RandomMeal onLogout={resetAppState} />}
          />
          <Route
            path="/categoryList"
            element={<CategoryList onLogout={resetAppState} />}
          />
          <Route
            path="/categoryList/categorySearch"
            element={<CategorySearch onLogout={resetAppState} />}
          />
          <Route
            path="/ingredientList"
            element={<IngredientList onLogout={resetAppState} />}
          />
          <Route
            path="/ingredientList/ingredientSearch"
            element={<IngredientSearch onLogout={resetAppState} />}
          />
          <Route
            path="/areaList"
            element={<AreaList onLogout={resetAppState} />}
          />
          <Route
            path="/areaList/areaSearch"
            element={<AreaSearch onLogout={resetAppState} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
