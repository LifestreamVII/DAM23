import React, { useState, useEffect } from 'react';

function HistoricalData() {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('/api/historical-data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur de la récupération');
        }
        return response.json();
      })
      .then((data) => {
        setFilteredData(data);
      })
      .catch((error) => {
        console.error('Erreur de la récupération:', error);
      });
  }, []);

  return (
    <div>
      <button onClick={handleFilter}>Filtrer et trier</button>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            Nom du fichier : {item.name} | Type de fichier : {item.fileType} | Date de création : {item.creationDate} | Date de mise à jour : {item.updateDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoricalData;