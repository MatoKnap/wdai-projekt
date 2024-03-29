import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AddAdvertisementForm from './AddAdvertisementForm';
import LoginPage from './LoginPage';
import './styles/App.css';

const App = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/advertisements')
      .then((response) => response.json())
      .then((data) => setAdvertisements(data))
      .catch((error) => console.error('Błąd podczas pobierania ogłoszeń:', error));
    
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Błąd podczas pobierania użytkowników:', error));
  }, []);

  const handleAddAdvertisement = (newAdvertisement) => {
    const formData = new FormData();
    formData.append('title', newAdvertisement.title);
    formData.append('description', newAdvertisement.description);
    formData.append('date', newAdvertisement.date);
    formData.append('important', false);
  
    if (newAdvertisement.image) {
      formData.append('image', newAdvertisement.image);
    }
  
    fetch('http://localhost:3001/advertisements', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setAdvertisements([...advertisements, data]))
      .catch((error) => console.error('Błąd podczas dodawania ogłoszenia:', error));
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
          element={<AddAdvertisementForm
                      onAddAdvertisement={handleAddAdvertisement}
                      loggedInUser={loggedInUser}
                  />}
        />
        <Route
          path="/login"
          element={<LoginPage
                      users={users}
                      setLoggedInUser={setLoggedInUser}
                  />}
        />
      </Routes>
    </Router>
  );
};

export default App;
