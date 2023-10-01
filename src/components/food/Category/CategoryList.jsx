import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import CategorySearch from "./CategorySearch";

const CategoryList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // To track the selected category
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

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

  if (error) return <div className={`${styles.flexCenter} ${styles.heading2} overflow-hidden min-h-screen text-white`}>Error: {error.message}</div>;

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
            {data?.meals?.map((category, index) => (
              <div key={index} className={`hover:bg-[#343655] rounded-[0.6rem] p-[0.6rem]`}>
                <button
                  onClick={() => {
                    setSelectedCategory(category.strCategory);
                    setShow(true); // Show the CategorySearch component
                  }}
                  className={`${styles.text} `}
                >
                  {category.strCategory}
                </button>
              </div>
            ))}
          </div>
          {show ?
          <div className={`basis-[70%] ml-[20%]`}>
            {selectedCategory && <CategorySearch category={selectedCategory} />}
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

export default CategoryList;
