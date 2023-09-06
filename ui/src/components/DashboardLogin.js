import React, { useState } from 'react';
import Dashboard from './Dashboard';

const styles = {
  screen:{
    display: 'flex',
    height: '100vh',
    width:'100vw',
  },
  container: {
    width: '50%',
    margin: 'auto',
    padding: '20px',
  },
  title: {
    fontFamily: 'Poppins',
    position: "relative",
    left: "25px",
  },
  form: {
    padding: '20px',
    backgroundcolor: '#f2f2f2',
    fontFamily:'Poppins',
  },
  input: {
    marginBottom: '10px',
    padding: '0.625rem 12rem',
    border: 'none',
    backgroundColor:'#F2F2F2',
    display:'flex',
  },
  button: {
    fontFamily:'Poppins',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '10px 14rem',
    cursor: 'pointer',
  },
  logo: {
    width:'50%',
    flex: '1',
    display: 'flex',
    justifycontent: 'center',
    alignitems: 'center',
    backgroundcolor: '#ffffff',
  },
  img:{
    height : '300px',
    width : '300px',
    position : 'relative',
    top : '250px',
    left:'200px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};


function DashboardLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setError('');
      } else {
        setIsLoggedIn(false);
        setError('Identifiant ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête :', error);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setError('');
  }

  if (isLoggedIn) {
    return (
      <div style={styles.container}>
        <Dashboard />
        <button style={styles.button} onClick={handleLogout}>Déconnexion</button>
      </div>
    );
  } else {
    return (
      <div style={styles.screen}>
        <div style={styles.container}>
          <h1 style={styles.title}>Connexions</h1>
          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Se connecter</button>
            {error && <p style={styles.error}>{error}</p>}
          </form>
        </div>
        <div style={styles.logo}>
          <img style={styles.img} src="https://www.accr-europe.org/media/accr/187560-187560-sra.png" alt="Logo" />
        </div>
      </div>
    );
  }
}

export default DashboardLogin;
