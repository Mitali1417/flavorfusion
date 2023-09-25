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
      <div className={`flex flex-1 selection:bg-white selection:text-shade1 relative justify-center items-center flex-col h-screen`}
     
      >
      <h1 className={`${styles.heading1}`}>Sign up</h1>
        <div className="flex justify-center items-center absolute bottom-[11rem] left-[40em]">
        <div className="bg-gradient-to-br  from-shade1 to-shade3   shadow-xl  z-0 h-[14rem] w-[14rem] absolute rounded-tr-full rounded-tl-[3rem] rounded-b-full  " />
        <div className="bg-gradient-to-br blur-lg  from-shade1 to-white h-[10rem] w-[10rem] absolute rounded-full" />
        </div> 

        <div className="flex justify-center items-center absolute top-[13rem] right-[29rem]">
        <div className="bg-gradient-to-bl  from-shade1 to-shade3  shadow-xl z-0 h-[7rem] w-[7rem] absolute rounded-tr-full rounded-tl-[3rem] rounded-b-full  " />
        <div className="bg-gradient-to-bl blur-lg  from-shade1 to-white h-[4rem] w-[4rem] absolute rounded-full" />
        </div>

        <div className="flex justify-center items-center absolute top-[10rem] right-[12rem]">
        <div className="bg-gradient-to-bl  from-shade1 to-shade3  shadow-xl z-0 h-[18rem] w-[18rem] absolute rounded-tl-full rounded-tr-[3rem] rounded-b-full  " />
        <div className="bg-gradient-to-bl blur-lg  from-shade1 to-white h-[12rem] w-[12rem] absolute rounded-full" />
        </div>

      
        <form
          method="POST"
          className={`p-[3rem] px-[5rem] flex flex-col text-center w-full max-w-[28rem]  backdrop-blur-sm ${styles.text} bg-shade3/60 shadow-2xl rounded-[2rem]`}
        >
          <div className={`flex justify-between items-center`}>
            <label>Username</label>
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
          <div className={`flex justify-between items-center`}>
            <label>Email</label>
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
          <div  className={`flex justify-between items-center`}>
            <label>Password</label>
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
            <button className={`text-shade1 hover:text-shade1/50 font-semibold`} onClick={() => props.onFormSwitch("login")}>Log In</button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
