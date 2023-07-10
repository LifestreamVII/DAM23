import React from 'react';
import handleLogout from './DashboardLogin';

function Dashboardherder(){
  const username = 'John Doe'; // Remplacez par le nom de l'utilisateur connecté
    handleLogout();

  return (
    <header className="flex items-center justify-between bg-gray-800 px-4 py-2">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold">Mon Application</h1>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <p className="text-white">Bonjour, {username}</p>
        </div>
        <button
          className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
      <nav className="flex flex-col mt-4">
        <a
          href="#"
          className="text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Média
        </a>
        <a
          href="#"
          className="text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Projet
        </a>
      </nav>
    </header>
  );
};

export default Dashboardherder;
