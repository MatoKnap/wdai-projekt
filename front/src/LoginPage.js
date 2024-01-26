import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/AddAdvertisementForm.css';

const LoginPage = ({ users, setLoggedInUser }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function tryLogin() {
    try {
      for (let user of users) {
        if (user.login == login && user.password == password) {
          setLoggedInUser("login");
          navigate("/");
          break;
        }
      }
    } catch (error) {
      alert("Nie udało się zalogować!");
      console.log("Nie udało się zalogować!");
    }
  }

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="login"
        value={login}
        onChange={(e) =>
          setLogin(e.target.value)
        }
      />
      <textarea
        placeholder="hasło"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />
      <button className="login-button" onClick={tryLogin}>Zaloguj się</button>
    </div>
  );
};

export default LoginPage;
