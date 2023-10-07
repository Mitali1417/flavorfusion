import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { useState } from "react";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleLogout = () => {
    console.log("Logging out..."); // Add this line for debugging
    props.onLogout(); // Reset the app state
    navigate("/"); // Redirect to the login page
  };

  return (
    <div>
      <nav
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className={`${styles.flexCenter} justify-between ${styles.paddingX} max-w-[1580px] mx-auto fixed z-10 top-[0.6rem] left-[2rem] right-[2rem] py-[1.4rem] rounded-full bg-[#0a0e13]/50 backdrop-blur-2xl  shadow-2xl   shadow-[#111720] `}
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
        <div className={`${styles.flexCenter} flex-row  w-full hidden md:flex`}>
          <div className={`w-fit ${styles.btn3} ${styles.flexCenter}`}>
            <a className={``} href="/categoryList">
              Category
            </a>
          </div>
          <div
            className={`w-fit ${styles.btn3} mx-[1rem] ${styles.flexCenter}`}
          >
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
        <div
          className={`flex md:hidden  z-50`}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <img className={`w-[2rem]`} src={toggle ? close : menu} alt="" />
        </div>
        {/* -----------------------------Mobile Navbar---------------------------------------- */}
        {toggle && (
          <div 
            data-aos="zoom-out-up"
            className={`bg-[#1b2533] md:hidden  ${styles.flexCenter} justify-start items-start w-screen min-h-screen fixed -top-[0.6rem] -left-[2rem] z-[40]`}
          >
            <div className={`relative  `}>
              <div
                className={`${styles.flexCenter} absolute z-[50] -left-[3rem] -top-[9rem] flex-col`}
              >
                <div className="flex flex-col ">
                  <div
                    className={`${styles.text} hover:scale-105 hover:bg-shade1 transition duration-500 ease-in-out px-[1rem] py-[0.6rem] rounded-[0.5rem]  my-[1rem] ${styles.flexCenter}`}
                  >
                    <a className={``} href="/categoryList">
                      Category
                    </a>
                  </div>

                  <div
                    className={`${styles.text} hover:scale-105 hover:bg-shade1 transition duration-500 ease-in-out px-[1rem] py-[0.6rem] rounded-[0.5rem]  my-[1rem] ${styles.flexCenter}`}
                  >
                    <a className={``} href="/ingredientList">
                      Ingredient
                    </a>
                  </div>

                  <div
                    className={`${styles.text} hover:scale-105 hover:bg-shade1 transition duration-500 ease-in-out px-[1rem] py-[0.6rem] rounded-[0.5rem]  my-[1rem] ${styles.flexCenter}`}
                  >
                    <a className={``} href="/areaList">
                      Area
                    </a>
                  </div>

                  <button
                    className={`${styles.btn} my-[1rem]`}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
              <div
                className={` absolute -top-[25rem] -left-[35rem] z-[0] w-[22rem] h-[24rem] blur-3xl bg-shade4/30 rotate-[25deg]`}
              />
              <div
                className={` absolute top-[15rem] -left-[14rem] z-[0] w-[12rem] h-[9rem] blur-3xl bg-[#556173]/30 rotate-[25deg]`}
              />
              <div
                className={` absolute -top-[13rem] left-[9rem] z-[0] w-[22rem] h-[22rem] blur-3xl bg-shade4/30 rotate-[15deg]`}
              />
              <div
                className={` absolute -top-[13rem] -right-[22rem] z-[1] w-[12rem] h-[19rem] blur-3xl bg-[#556173]/60 rotate-[25deg]`}
              />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
