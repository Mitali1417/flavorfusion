import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import CategorySearch from "./CategorySearch";

const CategoryList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // To track the selected category
  const [loading, setLoading] = useState(true);

  const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

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
          {data?.meals?.map((category, index) => (
            <div key={index} className="m-5">
              <button
                onClick={() => setSelectedCategory(category.strCategory)}
                className={`${styles.text} ${styles.btn}`}
              >
                {category.strCategory}
              </button>
            </div>
          ))}
          {/* Display meals of selected category */}
          {selectedCategory && <CategorySearch category={selectedCategory} />}
        </div>
      )}
    </>
  );
};

export default CategoryList;
