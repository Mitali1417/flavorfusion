import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import IngredientSearch from "./IngredientSearch";

const IngredientList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [show, setShow] = useState(false);

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
        <div className={`h-full min-h-screen flex flex-row w-full`}>
          <div
            className={`scrollBar max-h-screen basis-[20%] bg-[#272840] p-[2rem] overflow-y-scroll fixed left-0 `}
          >
            {data?.meals?.map((ingredient, index) => (
              <div key={index} className={`hover:bg-[#343655] rounded-[0.6rem] p-[0.6rem]`}>
                <button
                  onClick={() =>{
                    setSelectedIngredient(ingredient.strIngredient);
                    setShow(true);
                  }
                  }
                  className={`${styles.text}`}
                >
                  {ingredient.strIngredient}
                </button>
                {/* <p>{ingredient.strDescription}</p> */}
              </div>
            ))}
          </div>
          {show ?
            <div className={`basis-[70%] ml-[27%]`}>
            {selectedIngredient && (
              <IngredientSearch ingredient={selectedIngredient} />
            )}
          </div>
          :
          <div className={`${styles.heading3} ${styles.flexCenter} w-full`}>
            Select the Category
          </div>
          }
          
        </div>
      )}
    </>
  );
};

export default IngredientList;
