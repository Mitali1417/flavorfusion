import React, { useState, useEffect } from "react";
import { styles } from "../../styles";

const MealSearch = () => {
  const [searchType, setSearchType] = useState("name"); // "name", "letter", or "id"
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    let url;
    switch (searchType) {
      case "name":
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
        break;
      case "letter":
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchQuery}`;
        break;
      case "id":
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchQuery}`;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result.meals);
    } catch (err) {
      setError(err);
    }
  };

  if (error) return <div className={`${styles.flexCenter} ${styles.heading2} overflow-hidden min-h-screen text-white`}>Error: {error.message}</div>;

  return (
    <>
    
      <div
        className={`${styles.flexCenter} ${styles.paddingX} flex-col  ${styles.paddingY} relative w-full`}
      >
    
        <div className={`${styles.flexCenter} w-full`}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className={`${styles.text2} bg-shade1 rounded-full py-[0.8rem] px-[1rem]`}
          >
            <option className={`bg-[#2A3950]`} value="name">
              By Name
            </option>
            <option className={`bg-[#2A3950]`} value="letter">
              By First Letter
            </option>
            <option className={`bg-[#2A3950]`} value="id">
              By ID
            </option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Enter meal ${searchType}`}
            className={`bg-black py-[1rem] ${styles.text} px-[1rem] rounded-full w-full`}
          />
        </div>
        <div className={`my-[1rem]`}>
          <button
            className={`${styles.btn2} px-[1rem] py-[0.6rem]`}

            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {error && <p>Error: {error.message}</p>}

      {data && (
        <>
          <div
            className={` ${styles.flexCenter} backdrop-blur-xl  bg-black/10 rounded-2xl flex-wrap`}
          >
            {data.map((meal) => (
              <div
                key={meal.idMeal}
                className={`${styles.flexCenter} ${styles.paddingX} ${styles.paddingY} text-center flex-col m-2 w-[30%]`}
              >
                <div className={` ${styles.flexCenter} relative `}>
                <div className={`hover:bg-black rounded-full transition duration-500 ease-in-out`}>
                  <img
                    src={meal.strMealThumb}
                    className={`shadow-2xl hover:opacity-[0.6] rounded-full transition duration-500 ease-in-out`}
                    alt={meal.strMeal}
                  /></div>
                  <div className="flex justify-center items-center rotate-90 absolute top-[3rem] right-[1rem]">
                    <div className="bg-gradient-to-br  from-shade1 to-shade3 z-0 h-[3rem] w-[3rem] absolute rounded-tr-full rounded-tl-[3rem] rounded-b-full  " />
                    <div className="bg-gradient-to-br blur-lg  from-shade1 to-shade4 h-[1rem] w-[1rem] absolute rounded-full" />
                  </div>

                  <div className="flex justify-center items-center absolute bottom-[3rem] left-[1rem]">
                    <div className="bg-gradient-to-br  from-shade1 to-shade3 z-0 h-[5rem] w-[5rem] absolute rounded-tr-full rounded-tl-[3rem] rounded-b-full  " />
                    <div className="bg-gradient-to-br blur-lg  from-shade1 to-shade4 h-[3rem] w-[3rem] absolute rounded-full" />
                  </div>
                </div>
                <div className={``}>
                  <h2 className={`${styles.heading3} text-[1.4rem]`}>
                    {meal.strMeal}
                  </h2>
                  <p className={`${styles.text} text-[1.1rem]`}>
                    {meal.strCategory}
                  </p>
                  <p className={`${styles.text}`}>{meal.strArea}</p>
                  <p className={`${styles.text2} text-[0.8rem]`}>{meal.strTags}</p>{" "}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MealSearch;
