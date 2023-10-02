import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="flex justify-center items-center bg-[#222e40]">
      <App />
    </div>
  </React.StrictMode>
);
