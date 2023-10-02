import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import AreaSearch from "./AreaSearch";

const AreaList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null); // To track the selected area
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);


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

  if (error) return <div className={`${styles.flexCenter} ${styles.heading2} overflow-hidden min-h-screen text-white`}>Error: {error.message}</div>;


  return (
    <>
    {loading ? (
        <div className={`h-screen w-full ${styles.flexCenter}`}>
        <span className="loader"></span></div>
      ) : (
      <div className={`h-full min-h-screen flex flex-wrap w-full`}>
      <div className={`scrollBar max-h-screen basis-[20%] bg-[#192230] p-[2rem] overflow-y-scroll fixed left-0 `}
        >
        {data?.meals?.map((area, index) => (
          <div key={index} className={`hover:bg-[#343655] rounded-[0.6rem] p-[0.6rem]`}>
              <button
              onClick={() => {setSelectedArea(area.strArea);
              setShow(true);}}
              className={`${styles.text}`}>
              {area.strArea}
            </button>
          </div>
        ))}</div>
        {show ?
          <div className={`basis-[70%] ml-[20%]`}>
          {selectedArea && <AreaSearch area={selectedArea} />}</div>
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

export default AreaList;
