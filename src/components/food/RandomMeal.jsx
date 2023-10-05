import React, { useState, useEffect } from "react";
import { styles } from "../../styles";

const RandomMeal = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const url = "https://www.themealdb.com/api/json/v1/1/random.php";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json(); // Changed to response.json() to get JSON data
        setData(result);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    fetchData();
  }, []);
  // if (error) return <div className={`${styles.flexCenter} ${styles.heading2} overflow-hidden min-h-screen text-white`}>Error: {error.message}</div>;

  return (
    <>
      <div
        className={`${styles.paddingX} ${styles.paddingY} h-full w-full flex flex-row`}
      >
        <div
          className={`bg-gradient-to-tr from-shade1 to-shade4 w-full text-center md:text-left rounded-3xl shadow-2xl ${styles.paddingX} ${styles.paddingY}  `}
        >
          {data?.meals?.map((meal, index) => (
            <div
              key={index}
              className={`${styles.flexCenter} flex-col md:flex-row  items-center`}
            >
              <div className={`md:basis-[50%]`}>
                <h4 className={`${styles.heading3}`}>{meal.strCategory}</h4>
                <h2 className={`${styles.heading22}`}>{meal.strMeal}</h2>
                <p className={`${styles.text2}`}>Pouplar in {meal.strArea}</p>
                <p className={`${styles.text2}`}>
                  Key Ingredients: {meal.strIngredient4}
                </p>
                {/* <p className={`${styles.text}`}>{meal.strInstructions}</p> */}
              </div>
              <div
                className={`md:basis-[40%] ss:w-[20rem] md:w-full py-[2rem] ml-4`}
              >
                <img
                  src={meal.strMealThumb}
                  className={`rounded-full shadow-2xl`}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RandomMeal;
