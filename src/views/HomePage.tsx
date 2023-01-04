import React from "react";

const HomePage: React.FC = () => {
  return (
    <div id="homeCont">
      <div id="homeSpacer"></div>
      <h1 id="homeCard1">Welcome to Taskr</h1>
      <h1 id="homeCard2">The <span className="text-info">easy</span> productivity tracker</h1>
      <h1 id="homeCard3">Login/Register to get started</h1>
    </div>
  );
};

export default HomePage;
