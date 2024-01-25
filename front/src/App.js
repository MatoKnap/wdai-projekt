// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AddAdvertisementForm from './AddAdvertisementForm';
import './styles/App.css';
import mockImage from './assets/1705524885623.jpg';

const App = () => {
  // Mockowane dane ogłoszeń
  const [advertisements, setAdvertisements] = useState([
    {
      id: 1,
      title: 'Ogłoszenie 1',
      description: 'Opis ogłoszenia 1...',
      date: '2024-01-25',
      image: mockImage,
    },
    {
      id: 2,
      title: 'Ogłoszenie 2',
      description: 'Opis ogłoszenia 2...',
      date: '2024-01-26',
      image: mockImage,
    },
  ]);

  const handleAddAdvertisement = (newAdvertisement) => {
    // Przygotowanie danych do przesłania
    const formData = new FormData();
    formData.append('title', newAdvertisement.title);
    formData.append('description', newAdvertisement.description);
    formData.append('date', newAdvertisement.date);
    formData.append('image', newAdvertisement.image);

    // Dodaj nowe ogłoszenie do listy
    const newAdvertisements = [
      ...advertisements,
      { id: advertisements.length + 1, ...newAdvertisement },
    ];
    setAdvertisements(newAdvertisements);
  };


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage advertisements={advertisements} />}
        />
        <Route
          path="/add"
          element={<AddAdvertisementForm onAddAdvertisement={handleAddAdvertisement} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
