import React, { useState } from "react";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.svg";
import RandomMeal from "../components/food/RandomMeal";
import List from "../components/food/List";
import Navbar from "../components/Navbar";
import MealSearch from "../components/food/MealSearch";

const Dashboard = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out..."); // Add this line for debugging
    props.onLogout(); // Reset the app state
    navigate("/"); // Redirect to the login page
  };
  const [loading, setLoading] = useState();

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
          <Navbar onLogout={handleLogout} />
          <div className={`flex justify-between my-[5rem] items-center`}>
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

          <RandomMeal />

          <List />

          <MealSearch />
          <div className={`bg1 w-full h-[80vh] relative overflow-hidden rounded-[10rem] rounded-tr-[0]`}>
            <h1 className={`${styles.heading2} w-[75%] absolute bottom-[5rem] z-10 px-[5rem]`}>Explore This Banquet of Tempting Meals </h1>
            <div
              className={`absolute blur-3xl -bottom-[5.5rem] -left-[5rem] w-screen h-[20rem] bg-[#111720]/90`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
