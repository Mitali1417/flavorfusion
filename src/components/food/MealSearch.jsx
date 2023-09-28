import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <div>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">By Name</option>
          <option value="letter">By First Letter</option>
          <option value="id">By ID</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Enter meal ${searchType}`}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p>Error: {error.message}</p>}

      {data && (
        <div>
          {data.map((meal) => (
            <div key={meal.idMeal}>
              <h2>{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strInstructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealSearch;
