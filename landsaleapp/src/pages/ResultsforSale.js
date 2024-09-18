import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Nav2 from "../components/Nav2.js";
import "../css/ResultsForSale.css";
import BathImg from "../assets/bathroom.png";
import BedImg from "../assets/bedroom.png";

const ResultsForSale = () => {
  const location = useLocation();
  const { filteredResults } = location.state;

  return (
    <>
      <Nav2 />
      <div className="res-con-0">
        <div className="res-con-1">
          {filteredResults.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </>
  );
};

const PropertyCard = ({ property }) => {
  const images = Object.values(property.images);
  const imageCount = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageCount) % imageCount);
  };

  const nextImage = images[(currentIndex + 1) % imageCount];
  const secondNextImage = images[(currentIndex + 2) % imageCount];

  return (
    <div className="res-con-2">
      <div className="res-con-3">
        <p>
          <i className="ri-camera-2-line cam-icon"></i> {currentIndex + 1}/
          {imageCount}
        </p>
        <p>{property.cityortown}</p>
        <p>{property.type}</p>
      </div>
      <div className="res-con-4">
        <div className="res-con-4-a">
          <div className="res-con-5">
            <div
              className="res-con-5-a"
              style={{
                backgroundImage: `url(${require(`../${images[currentIndex]}`)})`,
              }}
            ></div>
            <div className="res-con-5-b">
              <div
                className="res-con-5-b-1"
                style={{
                  backgroundImage: `url(${require(`../${nextImage}`)})`,
                }}
              ></div>
              <div
                className="res-con-5-b-2"
                style={{
                  backgroundImage: `url(${require(`../${secondNextImage}`)})`,
                }}
              ></div>
            </div>
            <i
              className="ri-arrow-right-s-line res-con-arrow right"
              onClick={handleNext}
            ></i>
            <i
              className="ri-arrow-left-s-line res-con-arrow left"
              onClick={handlePrevious}
            ></i>
          </div>
          <div className="res-con-6">LKR : {property.price}</div>
        </div>
        <div className="res-con-4-b">
          <div className="res-con-4-b-i">{property.location}</div>
          <div className="res-con-4-b-ii">
            <div className="res-con-4-b-ii-a">
              <img src={BedImg} alt="BathImg" />
              <p>{property.bedrooms}</p>
            </div>
            <div className="res-con-4-b-ii-b">
              <img src={BathImg} alt="BathImg" />
              <p>{property.bathrooms}</p>
            </div>
          </div>
          <div className="res-con-4-b-iii"></div>
          <div className="res-con-4-b-iv"></div>
        </div>
      </div>
    </div>
  );
};

export default ResultsForSale;
