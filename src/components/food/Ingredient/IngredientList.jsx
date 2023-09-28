import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import IngredientSearch from "./IngredientSearch";

const IngredientList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {loading ? (
        <div className={`h-screen w-full ${styles.flexCenter}`}>
          <span className="loader"></span>
        </div>
      ) : (
        <div className={`h-full min-h-screen flex flex-wrap w-full`}>
          {data?.meals?.map((ingredient, index) => (
            <div key={index} className="m-5">
              <button
                onClick={() => setSelectedIngredient(ingredient.strIngredient)}
                className={`${styles.text} ${styles.btn}`}
              >
                {ingredient.strIngredient}
              </button>
              <p>{ingredient.strDescription}</p>
            </div>
          ))}

          {selectedIngredient && (
            <IngredientSearch ingredient={selectedIngredient} />
          )}
        </div>
      )}
    </>
  );
};

export default IngredientList;
