import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import IngredientSearch from "./IngredientSearch";

const IngredientList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState(null); // To track the selected ingrdient

  //   const url = 'www.themealdb.com/api/json/v1/1/list.php?i=list';
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);

        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (error)
    return (
      <div
        className={`${styles.flexCenter} ${styles.heading2} overflow-hidden min-h-screen text-white`}
      >
        Error: {error.message}
      </div>
    );

  return (
    <>
      {loading ? (
        <div className={`h-screen w-full ${styles.flexCenter}`}>
          <span className="loader"></span>
        </div>
      ) : (
        <div
          className={`${styles.boxWidth} h-full min-h-screen flex flex-col sm:flex-row w-full`}
        >
          <div
            className={`scrollBar hidden sm:flex flex-row sm:flex-col max-w-screen-2xl sm:max-h-screen bg-[#192230] p-[2rem] overflow-x-scroll sm:overflow-y-scroll fixed left-0 `}
          >
            {data?.meals?.map((ingredient, index) => (
              <div
                key={index}
                className={`hover:bg-[#343655] rounded-[0.6rem] p-[0.6rem] `}
              >
                <button
                  onClick={() => {
                    setSelectedIngredient(ingredient.strIngredient);
                    setShow(true);
                  }}
                  className={`${styles.text}`}
                >
                  {ingredient.strIngredient}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile view of side scrollbar */}
          {/* <div className={` sm:hidden`}>
            <div>
              <button
                onClick={() => setDisplay(true)}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Select the Ingredient
                <svg
                  class="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </div>

            <div>
              {display && (
                <div
                  id="dropdown"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  {data?.meals?.map((ingredient, index) => (
                    <ul
                      key={index}
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li className={`bg-yellow-400`}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => {
                            setSelectedIngredient(ingredient.strIngredient);
                            setShow(true);
                            setDisplay(true);
                            console.log("dropdown worked!");
                          }}
                        >
                          {ingredient.strIngredient}
                        </a>
                      </li>
                    </ul>
                  ))}
                </div>
              ) : (
                <div>

                </div>
              )}
            </div>
          </div> */}

          <div className={`sm:hidden w-full`}>
            <div className="relative text-left">
              <button
                onClick={() => setDisplay(!display)} // Toggle the visibility of the dropdown
                id="dropdown-trigger"
                aria-haspopup="true"
                aria-expanded={display ? "true" : "false"}
                className={`${styles.flexCenter} flex-row px-4 py-[1rem] text-sm w-full font-medium text-gray-700 ${styles.btn2} rounded-lg shadow-sm`}
                type="button"
              >
                Select Ingredient
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 ${
                    display ? "transform rotate-180" : ""
                  }`} // Rotate the arrow when dropdown is open
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {display && (
                <div
                  id="dropdown-menu"
                  className="z-10 bg-[#1b2533] text-white w-full divide-y divide-[#222e40] rounded-lg shadow-lg absolute"
                  aria-labelledby="dropdown-trigger"
                >
                  {data?.meals?.map((ingredient, index) => (
                    <ul
                      key={index}
                      className="py-2 hover:bg-[#222e40] transition duration-500 ease-in-out "
                    >
                      <li className={`px-4 py-2`}>
                        <a
                          href="#"
                          className="block"
                          onClick={() => {
                            setSelectedIngredient(ingredient.strIngredient);
                            setDisplay(false); // Hide the dropdown when an option is clicked
                            setShow(true);
                          }}
                        >
                          {ingredient.strIngredient}
                        </a>
                      </li>
                    </ul>
                  ))}
                </div>
              )}
            </div>
          </div>

          {show ? (
            <div className={`basis-[70%] mx-auto sm:ml-[27%]`}>
              {selectedIngredient && (
                <IngredientSearch ingredient={selectedIngredient} />
              )}
            </div>
          ) : (
            <div
              className={`${styles.heading3} hidden sm:${styles.flexCenter} w-full`}
            >
              Select the Ingredient
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default IngredientList;
