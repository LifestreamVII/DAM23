import React, { useState, useEffect } from 'react';

function HistoricalData() {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/asset_history');
        if (!response.ok) {
          throw new Error('Erreur de la récupération');
        }
        const data = await response.json();
        setFilteredData(data);
      } catch (error) {
        console.error('Erreur de la récupération:', error);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={handleFilter}>Filtrer et trier</button>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            Id de l'URL : {item.asset_id} | URL du projet: {item.file} | Version : {item.version} | Date : {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoricalData;