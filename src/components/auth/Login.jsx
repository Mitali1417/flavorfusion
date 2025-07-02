import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../../styles";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  let name, value;
  const postData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      const res = await fetch(
        "https://auth-f3932-default-rtdb.firebaseio.com/SignupData.json"
      );
      const usersData = await res.json();

      if (usersData) {
        let userFound = false;
        for (let userId in usersData) {
          if (
            usersData[userId].email === email &&
            usersData[userId].password === password
          ) {
            userFound = true;
            break;
          }
        }
        if (userFound) {
          // alert("Login Successful.");
          navigate("/dashboard");
        } else {
          alert("Invalid Credentials");
        }
      } else {
        alert("Invalid Credentials.");
      }
    } else {
      alert("Please fill the data");
    }
  };

  return (
    <>
      <div
        className={`flex flex-1 ${styles.paddingX} selection:bg-white selection:text-shade1 relative justify-center items-center flex-col h-screen`}
      >
        {/* <h1 className={`${styles.heading1}`}>Login</h1> */}
        <div className="flex justify-center items-center absolute bottom-[11rem] left-[8rem] sm:left-[13rem] lg:left-[40em]">
          <div className="bg-gradient-to-br  from-shade1 to-shade3  shadow-xl  z-0 h-[10rem] sm:h-[14rem] w-[10rem] sm:w-[14rem] absolute rounded-tr-full rounded-tl-[3rem] rounded-b-full  " />
          <div className="bg-gradient-to-br blur-lg  from-shade1 to-shade4 h-[6rem] sm:h-[10rem] w-[6rem] sm:w-[10rem] absolute rounded-full" />
        </div>

        <div className="flex justify-center items-center absolute top-[13rem] right-[29rem]">
          <div className="bg-gradient-to-bl  from-shade1 to-shade3  shadow-xl z-0 h-[7rem] w-[7rem] absolute rounded-tr-full rounded-tl-[3rem] rounded-b-full  " />
          <div className="bg-gradient-to-bl blur-lg  from-shade1 to-shade4 h-[4rem] w-[4rem] absolute rounded-full" />
        </div>

        <div className="flex justify-center items-center absolute top-[10rem] right-[10rem] sm:right-[12rem]">
          <div className="bg-gradient-to-bl  from-shade1 to-shade3  shadow-xl z-0 h-[14rem] sm:h-[18rem] w-[14rem] sm:w-[18rem] absolute rounded-tl-full rounded-tr-[3rem] rounded-b-full  " />
          <div className="bg-gradient-to-bl blur-lg  from-shade1 to-shade4 h-[10rem] sm:h-[12rem] w-[10rem] sm:w-[12rem] absolute rounded-full" />
        </div>

        <form data-aos="zoom-out"
          method="POST"
          className={`p-[3rem] sm:px-[5rem] flex flex-col text-center w-full max-w-[28rem]  backdrop-blur-3xl  ${styles.text} shadow-2xl rounded-[2rem]`}
        >
          <div
            className={`flex justify-between items flex-col sm:flex-row w-full `}
          >
            <label className={`mb-4 sm:mb-0`}>Email</label>
            <input
              className={`${styles.input} w-full sm:w-[13rem] `}
              type="email"
              placeholder="youremail@gmail.com"
              name="email"
              onChange={postData}
              value={data.email}
            />
          </div>
          <br />
          <div
            className={`flex justify-between items-center flex-col sm:flex-row w-full`}
          >
            <label className={`mb-4 sm:mb-0`}>Password</label>
            <input
              className={`${styles.input} w-full sm:w-[13rem]`}
              type="password"
              placeholder="********"
              name="password"
              onChange={postData}
              value={data.password}
            />
          </div>
          <br />
          <button
            className={`${styles.btn}`}
            type="submit"
            onClick={handleSubmit}
          >
            Log in
          </button>
          <p className={`pt-[1.5rem]`}>
            Don't have an account,{" "}
            <button
              className={`text-shade4 hover:text-shade4/50 font-semibold`}
              onClick={() => props.onFormSwitch("signup")}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
