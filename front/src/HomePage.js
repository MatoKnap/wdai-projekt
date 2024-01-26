// HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import './styles/HomePage.css';

const HomePage = ({ advertisements }) => {
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filteredAdvertisements, setFilteredAdvertisements] = useState(advertisements);

  const handleFilter = () => {
    const filtered = advertisements.filter(advertisement => {
      const date = new Date(advertisement.date);
      const from = filterDateFrom ? new Date(filterDateFrom) : null;
      const to = filterDateTo ? new Date(filterDateTo) : null;

      if (from && date < from) {
        return false;
      }

      if (to && date > to) {
        return false;
      }

      return true;
    });

    setFilteredAdvertisements(filtered);
  };

  return (
    <div className="app">
      {/* Filtry daty */}
      <div className="menu">
        <div className="filters">
          <input
            type="date"
            placeholder="Od"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
          />
          <input
            type="date"
            placeholder="Do"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
          />
          <button onClick={handleFilter}>Filtruj</button>
        </div>

        {/* Link do przekierowania na stronę dodawania ogłoszenia */}
        <Link to="/add" className="add-button">
          Dodaj nowe ogłoszenie
        </Link>
      </div>

      {/* Lista ogłoszeń */}
      <div className="advertisement-list">
        {filteredAdvertisements.map((advertisement) => (
          <Card key={advertisement.id} advertisement={advertisement} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;