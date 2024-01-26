// Card.js
import React, { useState, useEffect } from 'react';
import './styles/Card.css';

const Card = ({ advertisement }) => {
  const [imageSrc, setImageSrc] = useState(null);

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
    <div className={"card-container" + (advertisement.important == false ? "" : " important")}>
      {imageSrc && <img src={imageSrc} alt={advertisement.title} />}
      <h3>{advertisement.title}</h3>
      <p className="description">{advertisement.description}</p>
      <p>{advertisement.date}</p>
    </div>
  );
};

export default Card;
