import React from 'react'
import "./style.scss";
import CloudBackground from "./../../assets/images/Cloudy.svg";
import TreeVisualizer from '../../components/tree-vizualizer';
const HomePage = () => {
  return (
    <div>
      <div className="fullheightContainer">
        <TreeVisualizer />
        <img src={CloudBackground} className={"cloud-image"} alt="" />
      </div>
    </div>
  );
}

export default HomePage