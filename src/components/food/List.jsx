import React, { useState, useEffect } from "react";
import { styles } from "../../styles";

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

  return (
    <>
      {loading ? (
        <div className={`h-screen w-full ${styles.flexCenter}`}>
          <span className="loader"></span>
        </div>
      ) : (
        <div
          className={`${styles.paddingX} ${styles.paddingY} ${styles.flexCenter} flex-col  w-full`}
        >
          <div
            data-aos="zoom-out-up"
            className={` ${styles.paddingY} ${styles.flexCenter} text-center`}
          >
            <h2 className={`${styles.heading2} font-Roboto`}>
              Banquet of Savory & <br />
              <span className={`${styles.heading4} leading-[0.94]`}>
                Delicious Offerings
              </span>
            </h2>
          </div>
          <div
            data-aos="zoom-out-up" className={`${styles.flexCenter} relative flex-wrap`}>
            {data?.categories
              ?.filter((category) => category.idCategory < 6)
              .map((category, index) => (
                <div
                  key={index}
                  className={`flex hover:scale-90  hover:skew-x-2  transition duration-[900ms]  ease-in-out justify-start  items-center overflow-hidden relative z-[2] backdrop-blur-3xl  hover:bg-[#545679] hover:bg-gradient-to-tr hover:from-shade1 hover:to-[#212235] flex-col rounded-xl w-full h-[24rem] sm:max-w-[40%] md:max-w-[30%] p-9 m-5`}
                >
                    <div
                      className={`w-[40rem] h-[9rem] blur-3xl z-0 absolute -top-[5rem]  bg-[#2e2f4a] `}
                    />
                    <p className={`${styles.heading3} absolute`}>
                      {category.strCategory}
                    </p>
                    <img
                      src={category.strCategoryThumb}
                      className={`rounded-full h-[8rem] mt-[4rem] my-[2rem]`}
                      alt={`Image for ${category.strCategory}`}
                    />
                    <p className={`${styles.text2} `}>
                      {category.strCategoryDescription.slice(0, 100) + "..."}
                    </p>
                </div>
              ))}
            <div
              className={` absolute top-[6rem] right-[6rem] z-[0] w-[22rem] h-[4rem] blur-3xl bg-shade4/90 rotate-[25deg]`}
            />
            <div
              className={` absolute top-[15rem] right-[3rem] z-[0] w-[12rem] h-[9rem] blur-3xl bg-[#556173] rotate-[25deg]`}
            />
            <div
              className={` absolute top-[44rem] left-[16rem] z-[0] w-[18rem] h-[9rem] blur-3xl bg-shade4/60 rotate-[15deg]`}
            />
            <div
              className={` absolute -botttom-[19rem] left-[26rem] z-[0] w-[12rem] h-[9rem] blur-3xl bg-[#556173] rotate-[25deg]`}
            />
            <div
              className={` absolute bottom-[5rem] left-[17rem] z-[0] w-[12rem] h-[10rem] blur-3xl bg-shade4/20 rotate-[125deg]`}
            />
            <div
              className={` absolute bottom-[35rem] right-[14rem] z-[0] w-[12rem] h-[9rem] blur-3xl bg-[#556173] rotate-[25deg]`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default List;
