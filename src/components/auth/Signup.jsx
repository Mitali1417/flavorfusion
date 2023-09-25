import { useState } from "react";
import { styles } from "../../styles";

const Signup = (props) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let name, value;
  const postData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = data;

    if (username && email && password) {
      const res = await fetch(
        "https://auth-f3932-default-rtdb.firebaseio.com/SignupData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      if (res) {
        setData({
          username: "",
          email: "",
          password: "",
        });
        alert("Data Stored");
      } else {
        alert("Please fill the data");
      }
    } else {
      alert("Please fill the data");
    }
  };

  return (
    <>
      <div  className={`flex flex-1 ${styles.paddingX} selection:bg-white selection:text-shade1 relative justify-center items-center flex-col h-screen`}>
    
      <div className="flex justify-center items-center absolute bottom-[11rem] left-[8rem] sm:left-[13rem] lg:left-[40em]">
          <div className="bg-gradient-to-br  from-shade1 to-shade3  shadow-xl  z-0 h-[10rem] sm:h-[14rem] w-[10rem] sm:w-[14rem] absolute rounded-tr-full rounded-tl-[3rem] rounded-b-full  " />
          <div className="bg-gradient-to-br blur-lg  from-shade1 to-shade4 h-[6rem] sm:h-[10rem] w-[6rem] sm:w-[10rem] absolute rounded-full" />
        </div>

        <div className="flex justify-center items-center absolute rotate-12  top-[10rem] right-[29rem]">
          <div className="bg-gradient-to-bl  from-shade1 to-shade3  shadow-xl z-0 h-[7rem] w-[7rem] absolute rounded-tr-full rounded-tl-[3rem] rounded-b-full  " />
          <div className="bg-gradient-to-bl blur-lg  from-shade1 to-shade4 h-[4rem] w-[4rem] absolute rounded-full" />
        </div>

        <div className="flex justify-center items-center absolute top-[10rem] right-[10rem] sm:right-[12rem]">
          <div className="bg-gradient-to-bl  from-shade1 to-shade3  shadow-xl z-0 h-[14rem] sm:h-[18rem] w-[14rem] sm:w-[18rem] absolute rounded-tl-full rounded-tr-[3rem] rounded-b-full  " />
          <div className="bg-gradient-to-bl blur-lg  from-shade1 to-shade4 h-[10rem] sm:h-[12rem] w-[10rem] sm:w-[12rem] absolute rounded-full" />
        </div>

      
        <form
          method="POST"
          className={`p-[3rem] px-[5rem] flex flex-col text-center w-full max-w-[28rem]  backdrop-blur-md ${styles.text} bg-shade3/40 shadow-2xl rounded-[2rem]`}
         >
          <div className={`flex justify-between items-center flex-col sm:flex-row`}>
            <label  className={`mb-4 sm:mb-0`}>Username</label>
            <input
            className={`${styles.input}`}
              type="text"
              placeholder="username"
              name="username"
              onChange={postData}
              value={data.username}
            />
          </div>
          <br />
          <div className={`flex justify-between items-center flex-col sm:flex-row`}>
            <label  className={`mb-4 sm:mb-0`}>Email</label>
            <input
            className={`${styles.input}`}
              type="email"
              placeholder="youremail@gmail.com"
              name="email"
              onChange={postData}
              value={data.email}
            />
          </div>
          <br />
          <div  className={`flex justify-between items-center flex-col sm:flex-row`}>
            <label  className={`mb-4 sm:mb-0`}>Password</label>
            <input
            className={`${styles.input}`}
              type="password"
              placeholder="********"
              name="password"
              onChange={postData}
              value={data.password}
            />
          </div>
          <br />
          <button className={`${styles.btn}`} type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <p className={`pt-[1.5rem]`}>
            Already have an account,{" "}
            <button className={`text-shade4 hover:text-shade4/50 font-semibold`} onClick={() => props.onFormSwitch("login")}>Log In</button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
