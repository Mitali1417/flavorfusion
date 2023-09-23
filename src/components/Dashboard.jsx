import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [musicData, setMusicData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    props.onLogout(); // Reset the app state
    navigate("/"); // Redirect to the login page
  };



  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
       const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'YOUR_API_KEY', // Replace with your key
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json(); // Assuming the API returns JSON data
        setMusicData(result);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchData();
  }, []);




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
