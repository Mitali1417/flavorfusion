import React, { useState } from "react";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.svg";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import RandomMeal from "../components/food/RandomMeal";
import List from "../components/food/List";
import Navbar from "../components/Navbar";
import MealSearch from "../components/food/MealSearch";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = () => {
    console.log("Logging out..."); // Add this line for debugging
    props.onLogout(); // Reset the app state
    navigate("/"); // Redirect to the login page
  };

  // You seem to be missing a try-catch block for handling errors. I've added it below.
  try {
    const [loading, setLoading] = useState(false); // Initialize loading state with false

    if (error) {
      return (
        <div className={`${styles.flexCenter} ${styles.heading2} overflow-hidden min-h-screen text-white`}>
          Error: {error.message}
        </div>
      );
    }

    return (
      <>
        {loading ? (
          <div className={`h-screen w-full ${styles.flexCenter}`}>
            <span className="loader"></span>
          </div>
        ) : (
          <div className={`flex ${styles.paddingX} ${styles.paddingY} selection:bg-white selection:text-shade1 items-center flex-col md:min-h-screen h-fit text-white`}>
            <Navbar onLogout={handleLogout} />

            <div className={`flex flex-col md:flex-row justify-center mb-[17rem] ss:mb-[20rem] sm:mb-[26rem] md:mb-[10rem] my-[10rem] items-center w-full`}>
              <div className={`w-full ${styles.flexCenter} top-[18rem] sm:top-[12rem] md:top-0 md:-left-[4rem] relative`}>
                <img
                  className={`drop-shadow-2xl absolute -top-[9rem] sm:-top-[10rem] md:left-[7rem] z-[5] mx-auto ss:w-[80%] sm:w-[70%] md:w-[30rem]`}
                  src={hero2}
                  alt="hero"
                />
                <div className={`absolute sm:-top-[1.5rem] left-[2rem] sm:left-[9rem] md:left-[5rem] z-[3] w-[6rem] sm:w-[18rem] h-[4rem] sm:h-[9rem] blur-3xl bg-[#556173]`} />
                <div className={`absolute sm:-top-[0.5rem] right-[2rem] sm:right-[9rem] md:left-[16rem] z-[0] w-[6rem] sm:w-[16rem] h-[4rem] sm:h-[9rem] blur-3xl bg-shade4`} />
              </div>
              <div className={`flex justify-center items-center flex-wrap leading-[0.9] w-full`}>
                <span className={`${styles.heading1} drop-shadow-lg text-white`}>flavor</span>
                <span className={`${styles.heading1} drop-shadow-lg`}>fusion</span>
              </div>
            </div>

            <RandomMeal />

            <List />

            <MealSearch />
            <div className={`${styles.marginY} bg1 w-full h-[40vh] md:h-[60vh] lg:h-[80vh] relative overflow-hidden rounded-[4rem] md:rounded-[10rem] rounded-tr-[0] md:rounded-tr-[0]`}>
              <h1 className={`${styles.heading2} sm:w-[75%] absolute bottom-[1rem] md:bottom-[5rem] z-10 px-[3rem] sm:px-[5rem]`}>
                Explore This Banquet of Tempting Meals
              </h1>
              <div className={`absolute blur-3xl -bottom-[5.5rem] -left-[5rem] w-screen h-[20rem] bg-[#111720]/90`} />
            </div>
          </div>
        )}
      </>
    );
  } catch (err) {
    console.error(err);
    setError(err);
  }
};

export default Dashboard;
