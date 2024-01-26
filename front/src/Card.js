import React, { useState, useEffect } from 'react';
import './styles/Card.css';

const Card = ({ advertisement }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof advertisement.image === 'string') {
      setImageSrc(advertisement.image);
    }
    console.log(advertisement.image)
    const base64Image = arrayBufferToBase64(advertisement.image);
    console.log(base64Image)
    setImageSrc(`data:image/jpeg;base64, ${base64Image}`);


  }, [advertisement.image]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer.data);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return (
    <>
      <div
        className={"card-container"
          + (isActive ? "-active" : "")
          + (advertisement.important === true ? " important" : "")}
        onClick={() => { if (!isActive) setIsActive(true) }}
      >
        {imageSrc && <img src={imageSrc} alt={advertisement.title} />}
        <div className="text-container">
          <h3>{advertisement.title}</h3>
          <p className={"description" + (isActive ? "-active" : "")}>{advertisement.description}</p>
          <p>{advertisement.date}</p>
        </div>
        <div
          className="close"
          style={isActive ? { display: "block" } : {}}
          onClick={() => setIsActive(false)}
        >X</div>
      </div>
      <div
        className="shadow"
        style={isActive ? { display: "block" } : {}}
        onClick={() => setIsActive(false)}
      ></div>
    </>
  );
};

export default Card;
