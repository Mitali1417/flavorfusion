import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";

const IngredientSearch = ({ ingredient }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    //   const url = `www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [ingredient]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{ingredient} Meals</h2>
      <div className={`h-full min-h-screen text-white flex flex-wrap w-full`}>
        {data?.meals?.map((item, index) => (
          <div key={index} className="m-5">
            <p className={`${styles.text} ${styles.btn}`}>
              {item.strMeal}
            </p>
            <img src={item.strMealThumb} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSearch;
