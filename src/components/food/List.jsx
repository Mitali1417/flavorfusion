import React, { useState, useEffect } from "react";
import { styles } from "../../styles";
import Marquee from "react-fast-marquee";

const List = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Updated URL
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {loading ? (
        <div className={`h-screen w-full ${styles.flexCenter}`}>
          <span className="loader"></span>
        </div>
      ) : (
        <div
          className={`${styles.paddingY} flex w-full`}
        >
          <Marquee autoFill="true" speed="180" className={`${styles.flexCenter}`}>
            
              {data?.categories?.map((category, index) => (
                <div
                  key={index}
                  className={`${styles.flexCenter} overflow-hidden relative bg-shade1 hover:hoverbg flex-col rounded-xl w-[30rem] h-[35rem] p-9 m-5`}
                >
                {/* <div
                  key={index}
                  className={`${styles.flexCenter} bg-shade1 rounded-xl flex-col w-full max-w-[30%] min-h-[30rem] p-9 m-5`}
                > */}
                  <p className={`${styles.text}`}>{category.strCategory}</p>
                  <img
                    src={category.strCategoryThumb}
                    className={`rounded-full my-[2rem]`}
                    alt={`Image for ${category.strCategory}`}
                  />
                  <p className={``}>{category.strCategoryDescription}</p>
              {/* <div className={`w-[40rem] h-[40rem] blur-3xl absolute -bottom-[37rem]  bg-black `} /> */}
                </div>
              ))}
          </Marquee>
        </div>
      )}
    </>
  );
};

export default List;
