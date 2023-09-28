import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import hero from "../assets/hero.svg";
import RandomMeal from "../components/food/RandomMeal";
import List from "../components/food/List";

const Dashboard = (props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState();

  const handleLogout = () => {
    props.onLogout(); // Reset the app state
    navigate("/"); // Redirect to the login page
  };

  return (
    <>
      {loading ? (
        <div className={`h-screen w-full ${styles.flexCenter}`}>
          <span className="loader"></span>
        </div>
      ) : (
        <div
          className={`flex ${styles.paddingX} ${styles.paddingY} selection:bg-white selection:text-shade1 items-center flex-col min-h-screen h-fit text-white`}
        >
          <div className={`flex justify-between items-center`}>
            <div className={`w-full`}>
              <img className={``} src={hero} alt="hero" />
            </div>
            <div className={`flex flex-wrap leading-[0.9] w-full`}>
              <span className={`${styles.heading1} drop-shadow-lg text-white`}>
                flavor
              </span>
              <span className={`${styles.heading1} drop-shadow-lg`}>
                fusion
              </span>
            </div>
          </div>
          <button className={`${styles.btn}`} onClick={handleLogout}>
            Log out
          </button>
          <a className={`${styles.btn}`} href="/mealSearch">
            Search
          </a>
          {/* <a className={`${styles.btn}`} href="/randomMeal">
            Checkout Random Meal
          </a> */}
          <RandomMeal />
          {/* <a className={`${styles.btn}`} href="/list">
            Checkout List of Items
          </a> */}
          <List/>
          <a className={`${styles.btn}`} href="/categoryList">
            Checkout Category List
          </a>
          <a className={`${styles.btn}`} href="/ingredientList">
            Checkout Ingredient List
          </a>
          <a className={`${styles.btn}`} href="/areaList">
            Checkout Area List
          </a>
        
        </div>
      )}
    </>
  );
};

export default Dashboard;
