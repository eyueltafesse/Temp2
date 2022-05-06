import React from "react";
import backgroundimg from "../../img/MPqduy.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <img src={backgroundimg} className="background-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
