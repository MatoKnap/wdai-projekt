// AddAdvertisementForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/AddAdvertisementForm.css';

const AddAdvertisementForm = ({ onAddAdvertisement, loggedInUser }) => {
  const [newAdvertisement, setNewAdvertisement] = useState({
    title: '',
    description: '',
    date: '',
    image: null,
    important: false
  });

  const [imageSrc, setImageSrc] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Image preview logic
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    reader.readAsDataURL(file);

    setNewAdvertisement({ ...newAdvertisement, image: file });
  };

  const handleAddAdvertisement = async () => {
    // Walidacja formularza
    if (!newAdvertisement.title.trim()) {
      setValidationError('Tytuł nie może być pusty.');
      return;
    }
  
    if (newAdvertisement.description.length > 500) {
      setValidationError('Opis nie może przekraczać 500 znaków.');
      return;
    }
  
    if (!newAdvertisement.date) {
      setValidationError('Proszę ustawić datę.');
      return;
    }
  
    try {
      // Pass the newAdvertisement object directly
      await onAddAdvertisement(newAdvertisement);
  
      setNewAdvertisement({
        title: '',
        description: '',
        date: '',
        image: null,
        important: false
      });
      setImageSrc(null);
      setValidationError(null);
  
      // Przekieruj na stronę główną po dodaniu ogłoszenia
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas dodawania ogłoszenia:', error);
    }
  };
  
  



  return loggedInUser != null ? (
    <div className="form-container">
      {validationError && <p style={{ color: 'red' }}>{validationError}</p>}

      <input
        type="text"
        placeholder="Tytuł"
        value={newAdvertisement.title}
        onChange={(e) =>
          setNewAdvertisement({ ...newAdvertisement, title: e.target.value })
        }
      />
      <textarea
        placeholder="Opis"
        value={newAdvertisement.description}
        onChange={(e) =>
          setNewAdvertisement({
            ...newAdvertisement,
            description: e.target.value,
          })
        }
      />
      <input
        type="date"
        placeholder="Data"
        value={newAdvertisement.date}
        onChange={(e) =>
          setNewAdvertisement({ ...newAdvertisement, date: e.target.value })
        }
      />
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {imageSrc && <img src={imageSrc} alt="Preview" style={{ maxWidth: '100%' }} />}
      <button onClick={handleAddAdvertisement}>Dodaj ogłoszenie</button>
    </div>
  ) : (
    <div className="alert">
      <h2>Dostępne tylko dla zalogowanych!</h2>
      <Link to="/login" className="login-button">Zaloguj się</Link>
    </div>
  );
};

export default AddAdvertisementForm;
