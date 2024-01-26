// Card.js
import React, { useState, useEffect } from 'react';
import './styles/Card.css';

const Card = ({ advertisement }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (advertisement.image instanceof File) {
      // If it's a File object, read as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(advertisement.image);
    } else if (typeof advertisement.image === 'string') {
      // If it's a string, assume it's a static URL
      setImageSrc(advertisement.image);
    }
  }, [advertisement.image]);

  return (
    <>
    <div
      className={"card-container"
                + (isActive ? "-active" : "")
                + (advertisement.important === true ? " important" : "")}
      onClick={() => {if (!isActive) setIsActive(true)}}
    >
      {imageSrc && <img src={imageSrc} alt={advertisement.title} />}
      <div className="text-container">
        <h3>{advertisement.title}</h3>
        <p className={"description" + (isActive ? "-active" : "")}>{advertisement.description}</p>
        <p>{advertisement.date}</p>
      </div>
      <div
        className="close"
        style={isActive ? {display: "block"} : {}}
        onClick={() => setIsActive(false)}
      >X</div>
    </div>
    <div
      className="shadow"
      style={isActive ? {display: "block"} : {}}
      onClick={() => setIsActive(false)}
    ></div>
    </>
  );
};

export default Card;
