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
      title: 'Ogłoszenie wyróżnione',
      description: 'Opis ogłoszenia 1...',
      date: '2024-01-25',
      image: mockImage,
      important: true
    },
    {
      id: 2,
      title: 'Ogłoszenie zwykłe',
      description: 'Opis ogłoszenia 2...',
      date: '2024-01-26',
      image: mockImage,
      important: false
    },
    {
      id: 3,
      title: 'Ogłoszenie z bardzo długim opisem i obrazkiem',
      description: 'Moim zdaniem to nie ma tak, że dobrze albo że nie dobrze. \
                    Gdybym miał powiedzieć, co cenię w życiu najbardziej, powiedziałbym, że ludzi.\
                    Ekhm... Ludzi, którzy podali mi pomocną dłoń, kiedy sobie nie radziłem, kiedy byłem sam. \
                    I co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie.',
      date: '2024-01-26',
      image: "https://code.oursky.com/wp-content/uploads/2015/11/full-text-message-ios.gif",
      important: false
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
