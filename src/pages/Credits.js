import React from 'react';
import HomeAndReturn1 from '../components/HomeAndReturn1';
import '../styles/Credits(page).css';

function Credits() {
  return (
    <div>
      <div className="credits-container">
        <div>
          <h3 className="credits-item">App foi desenvolvido por:</h3>
        </div>
        <div>
          <h4 className="credits-item"><strong>Abimael Albuquerque</strong></h4>
        </div>
        <div>
          <h4 className="credits-item"><strong>Anderson Pedrosa</strong></h4>
        </div>
        <div>
          <h4 className="credits-item"><strong>André Arnoni</strong></h4>
        </div>
        <div>
          <h4 className="credits-item"><strong>Renan Antunes</strong></h4>
        </div>
        <footer className="credits-footer">
          Copyrigth© 2021 - Todos os direitos reservados
        </footer>
      </div>
      <HomeAndReturn1 />
    </div>
  );
}

export default Credits;
