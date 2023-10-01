import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";

const CategorySearch = ({ category }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [category]);

  if (error)
    return (
      <div
        className={`${styles.flexCenter} ${styles.heading2} overflow-hidden min-h-screen text-white`}
      >
        Error: {error.message}
      </div>
    );

  return (
    <div className={`${styles.flexCenter} flex-col`}>
      <div className={`${styles.flexCenter} my-[2rem]`}>
        <h2 className={`${styles.heading2}`}>{category} Meals</h2>
      </div>
      <div
        className={`flex justify-center items-start text-center h-full min-h-screen text-white flex-wrap w-full`}
      >
        {data?.meals?.map((item, index) => (
          <div key={index} className={`w-[28%] m-[1rem]`}>
            <div
              className={`relative overflow-hidden rounded-2xl hover:scale-105  hover:skew-x-2  transition duration-[900ms] ease-in-out `}
            >
              <div className={``}>
                <p
                  className={`${styles.text} px-[1.5rem] z-30 absolute  bottom-[1.5rem]`}
                >
                  {item.strMeal}
                </p>
                <div
                  className={`absolute blur-2xl -bottom-[4.5rem] -left-[5rem] w-screen h-[10rem] bg-[#111720]`}
                />
              </div>
              <img src={item.strMealThumb} className={``} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySearch;
