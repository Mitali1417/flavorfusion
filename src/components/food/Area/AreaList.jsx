import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import AreaSearch from "./AreaSearch";

const AreaList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null); // To track the selected area
  const [loading, setLoading] = useState(true);

  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

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
        <span className="loader"></span></div>
      ) : (
      <div className={`h-full min-h-screen flex flex-wrap w-full`}>
        {data?.meals?.map((area, index) => (
          <div key={index} className="m-5">
            <button
              onClick={() => setSelectedArea(area.strArea)}
              className={`${styles.text} ${styles.btn}`}>
              {area.strArea}
            </button>
          </div>
        ))}
      {/* Display meals of selected area */}
      {selectedArea && <AreaSearch area={selectedArea} />}
      </div>
      )}
    </>
  );
};

export default AreaList;
