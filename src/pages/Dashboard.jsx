import React, { useState } from "react";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import herobg from "../assets/herobg.jpg";
import herobg2 from "../assets/herobg2.jpg";
import RandomMeal from "../components/food/RandomMeal";
import List from "../components/food/List";
import Navbar from "../components/Navbar";
import MealSearch from "../components/food/MealSearch";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = () => {
    console.log("Logging out...");
    props.onLogout();
    navigate("/");
  };
  try {
    const [loading, setLoading] = useState(false);

    if (error) {
      return (
        <div
          className={`${styles.flexCenter} ${styles.heading2} overflow-hidden min-h-screen text-white`}
        >
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
          <div
            className={`flex  selection:bg-white selection:text-shade1 items-center flex-col md:min-h-screen h-fit text-white`}
          >
            <Navbar onLogout={handleLogout} />

            <div
              className={`flex justify-center items-center ${styles.paddingY} flex-col md:flex-row mb-[17rem] ss:mb-[20rem] sm:mb-[26rem] md:mb-[10rem] mt-[7rem] md:mt-[20em]`}
            >
              <div
                className={`w-full ${styles.flexCenter} top-[23rem] sm:top-[22rem] md:top-0  md:-left-[4rem] mx-auto relative`}
              >
                <div className={`mx-auto`}>
                  <img
                    // data-aos="zoom-in"
                    className={`drop-shadow-2xl rounded-3xl absolute -top-[10rem] left-[2rem] sm:left-[6rem] z-[5] mx-auto w-[55%] sm:w-[17rem]`}
                    src={herobg}
                    alt="hero"
                  />
                  <img
                    // data-aos="zoom-in"
                    className={` drop-shadow-2xl rounded-3xl absolute -top-[4rem] right-[2rem] sm:left-[19rem] z-[5] mx-auto w-[45%] sm:w-[12rem]`}
                    src={herobg2}
                    alt="hero"
                  />
                </div>
                <div
                  data-aos="zoom-in"
                  className={`absolute sm:-top-[1.5rem] left-[0rem] z-[3] w-[16rem] sm:w-[18rem] h-[4rem] sm:h-[9rem] blur-3xl bg-[#556173]`}
                />
                <div
                  data-aos="zoom-in"
                  className={`absolute -bottom-[14.5rem] -right-[3rem] z-[0] w-[10rem] sm:w-[16rem] h-[4rem] sm:h-[9rem] blur-3xl bg-shade4`}
                />
                <div
                  data-aos="zoom-in"
                  className={`${styles.flexCenter} p-2 w-[7rem] h-[7rem] rounded-full absolute -top-[12rem]  md:right-[0rem] z-[5] bg-gradient-to-tr from-black to-[#0c1016] shadow-2xl`}
                >
                  <p
                    className={` font-OpenSans text-[0.6rem] uppercase tracking-widest text-white`}
                  >
                    flavor fusion
                  </p>
                </div>
              </div>
              <div
                className={`${styles.paddingX} flex justify-center items-center flex-wrap md:ml-[4rem] leading-[0.9] w-full`}
              >
                <span
                  data-aos="zoom-in-right"
                  className={`${styles.heading1} drop-shadow-lg text-white`}
                >
                  flavor
                </span>
                <span
                  data-aos="zoom-in-left"
                  className={`${styles.heading1} drop-shadow-lg`}
                >
                  fusion
                </span>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
              className={`w-full  ${styles.paddingX}`}
            >
              <div
                className={`${styles.marginY} mt-[12rem] ss:mt-[15rem] sm:mt-[10rem] md:mt-[4rem] bg1 w-full shadow-2xl h-[44vh] md:h-[60vh] relative overflow-hidden rounded-[4rem] md:rounded-[6rem] rounded-tr-[0] md:rounded-tr-[0]`}
              >
                <div
                  className={`absolute md:w-[75%]  bottom-[2rem] md:bottom-[7rem] z-[5] px-[2rem] sm:px-[5rem]`}
                >
                  <h1 className={`${styles.heading22} `}>
                    Explore This Banquet of Tempting Meals
                  </h1>
                  <p className={`${styles.text2}`}>
                    Savor the magic on every plate, where crispy meets
                    excitement!
                  </p>
                </div>
                <div
                  className={`absolute blur-3xl -bottom-[5.5rem] -left-[5rem] w-screen h-[20rem] bg-[#111720]/90`}
                />
              </div>
            </div>
            <List />

            <MealSearch />
            <RandomMeal />

            <Contact />
            <div className={`w-full ${styles.paddingX}`}>
              <Footer />
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
