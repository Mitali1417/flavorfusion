import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "skyblue",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <h1>Login</h1>
        <form
          method="POST"
          style={{
            backgroundColor: "#fffff146",
            padding: "5rem",
            border: "1px solid transparent",
            borderRadius: "1rem",
          }}
        >
          <label>Email</label>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            name="email"
            onChange={postData}
            value={data.email}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            name="password"
            onChange={postData}
            value={data.password}
          />
          <br />
          {/* <button onClick={()=>{
            navigate(<Dashboard/>)
          }}>Login</button> */}
          <button type="submit" onClick={handleSubmit}>
            Log in
          </button>
          <p>
            Don't have an account,{" "}
            <button onClick={() => props.onFormSwitch("signup")}>
              Sign up
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
