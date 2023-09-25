import React from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";

const Dashboard = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.onLogout(); // Reset the app state
    navigate("/"); // Redirect to the login page
  };

  return (
    <>
      <div className={`flex flex-1 justify-center items-center flex-col`}>
        <h1 className={`${styles.heading1}`}>Rythm</h1> <span>Music</span>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </>
  );
};

export default Dashboard;
