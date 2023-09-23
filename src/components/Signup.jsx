import { useState } from "react";

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
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gold",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <h1>Hello Signup</h1>
        <form
          method="POST"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#fffff176",
            padding: "5rem",
            border: "1px solid transparent",
            borderRadius: "1rem",
          }}
        >
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={postData}
              value={data.username}
            />
          </div>
          <br />
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="youremail@gmail.com"
              name="email"
              onChange={postData}
              value={data.email}
            />
          </div>
          <br />
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              name="password"
              onChange={postData}
              value={data.password}
            />
          </div>
          <br />
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <p>
            Already have an account,{" "}
            <button onClick={() => props.onFormSwitch("login")}>Log In</button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
