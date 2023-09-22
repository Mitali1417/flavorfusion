import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.onLogout(); // Reset the app state
    navigate("/"); // Redirect to the login page
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "pink",
          flexDirection: "column",
        }}
      >
        <h1>Hello Dashboard</h1>
        <h3>{props.username}</h3>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </>
  );
};

export default Dashboard;
