import React, { useState } from 'react';
import Dashboardfooter from './Dashboardfooter';

// Styles CSS intégrés pour le tableau de bord
const styles = {
  container: {
    width: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  title: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: '20px',
  },
  menuItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'pointer',
  },
};

// Composant principal du tableau de bord
function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(null);
  // Fonction pour gérer le clic sur un élément du menu
  const handleMenuClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <header>
        Tableau de Bord
      </header>
      <div style={styles.container}>
        <h1 style={styles.title}>Tableau de bord</h1>

        <div style={styles.menuItem} onClick={() => handleMenuClick('Dashboard')}>
          Dashboard
        </div>

        <div style={styles.menuItem} onClick={() => handleMenuClick('Profil')}>
          Profil
        </div>

        <div style={styles.menuItem} onClick={() => handleMenuClick('Paramètres')}>
          Paramètres
        </div>

        {selectedItem && (
          <div>
            <h2>Contenu du {selectedItem}</h2>
            {/* Afficher le contenu en fonction de l'élément sélectionné */}
          </div>
        )}
      </div>
      <footer>
      <Dashboardfooter/>
      </footer>
    </div>
  );
}

export default Dashboard;