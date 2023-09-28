import React, { useState, useEffect } from "react";
import { styles } from "../../styles";

const List = () => {
  const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url =
    "https://yummly2.p.rapidapi.com/reviews/list?offset=0&globalId=a8d6747a-bfaa-46a7-92fb-892e3f76b264&limit=20";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1830cb13c3mshf49a464db199291p157e45jsn59a819ff6308",
      "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

//   if (loading) return <span className="loader"></span>
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="h-full min-h-screen flex flex-col">
        {/* Average Rating and total count */}
        <div className={``} style={{}}>
          <p>Average Rating: {data?.averageRating}</p>
          <h3 className={`${styles.heading1}`}>Total Review Count: {data?.totalReviewCount}</h3>

          {/* <svg className={`bg-yellow-400 h-[20rem] w-[20rem]`} viewBox="0 0 320 320">
            <circle className="bg" cx="160" cy="160" r="82" />
            <circle className ="meter" cx="-46" cy="160" r="82" />
          </svg> */}

          <span class="loader"></span>
        </div>

        <div className={`flex justify-between items-center`}>
          {data?.reviewImages?.map((image, index) => (
            <div key={index}>
              <img
                src={image?.resizableImageUrl}
                alt="Review"
                className="h-[5rem]"
              />
              <h3 className={`${styles.text}`}>{image?.user?.profileName}</h3>
            </div>
          ))}
        </div>

        <div className={`flex justify-between items-center`}>
          {/* Individual reviews */}
          {data?.reviews?.map((review, index) => (
            <div key={index} className="m-5">
              <h3>{review?.profiles?.[0]?.displayName}</h3>
              <h3>{review?.profiles?.[0]?.profileName}</h3>
              {/* Display user's image if available */}
              <a href={review?.profiles?.[0]?.profileUrl}>
                <img
                  src={review?.profiles?.[0]?.pictureUrl || ""}
                  alt={review?.profiles?.[0]?.displayName}
                  className="h-[5rem]"
                />
              </a>
              <p>Rating: {review.rating}</p>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
