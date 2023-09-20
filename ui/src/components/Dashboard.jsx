import React, { useState } from 'react';
import Dashboardfooter from './Dashboardfooter';

/*
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
            {/* Afficher le contenu en fonction de l'élément sélectionné }
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
*/
import React, { useState } from 'react';
import FileUploader from './mediadash';

function TabComponent(){
  const [onglet, setOnglet] = useState(0);

  const handleTabChange = (index) => {
    setOnglet(index);
  };

  return (
    <div>
        <nav>
      <ul>
        <li>
          <button className={onglet === 0 ? 'active' : ''} onClick={() => handleTabChange(0)}>
          <h2>Média</h2>
          </button>
        </li>
        <li>
          <button className={onglet === 1 ? 'active' : ''}
          onClick={() => handleTabChange(1)}>
          <h2>
            Profil
          </h2>
          </button>
        </li>
        <li>
          <button className={onglet=== 2 ? 'active' : ''}
          onClick={() => handleTabChange(2)}>
          <h2>Historique</h2>
          </button>
        </li>
        <li>
          <button className={onglet === 3 ? 'active' : ''}
          onClick={function() {handleTabChange(3); }}>
            <h2>
              Projet
            </h2>
          </button>
        </li>
      </ul>
      {onglet === 0 && <div><FileUploader/></div>}
      {onglet === 1 && <div>Contenu de l'onglet 2</div>}
      {onglet === 2 && <div>Contenu de l'onglet 3</div>}
      {onglet === 3 && <div>Contenu de l'onglet 4</div>}
      </nav>
    </div>
  );
};

export default TabComponent;