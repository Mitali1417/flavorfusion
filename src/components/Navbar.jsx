import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out..."); // Add this line for debugging
    props.onLogout(); // Reset the app state
    navigate("/"); // Redirect to the login page
  };

  return (
    <div
      className={`${styles.flexCenter} justify-between ${styles.paddingX} max-w-[1980px] mx-auto fixed z-10 top-[0.6rem] left-[4rem] right-[4rem] py-[1.4rem] rounded-full bg-black/50 backdrop-blur-lg `}
    >
      <div className={`flex flex-wrap leading-[0.9] w-full`}>
        <span
          className={`${styles.heading5} text-[1.6rem] drop-shadow-lg text-white`}
        >
          flavor
        </span>
        <span className={`${styles.heading5} text-[1.6rem] drop-shadow-lg`}>
          fusion
        </span>
      </div>

      <div className={`w-fit ${styles.btn3} ${styles.flexCenter}`}>
        <a className={``} href="/categoryList">
          Category
        </a>
      </div>
      <div className={`w-fit ${styles.btn3} mx-[1rem] ${styles.flexCenter}`}>
        <a className={``} href="/ingredientList">
          Ingredient
        </a>
      </div>
      <div className={`w-fit ${styles.btn3} ${styles.flexCenter}`}>
        <a className={``} href="/areaList">
          Area
        </a>
      </div>
      <div className={`w-full flex justify-end items-center`}>
        <button className={`${styles.btn2}`} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
