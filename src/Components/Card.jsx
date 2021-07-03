import React from 'react';

export default function Card(props) {
  return (
    <div className="card" style={ { width: '7rem', height: '5rem' } }>
      <div className="card-body">
        <div className="card-subtitle">Card title</div>
        <img src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-hand-drawn-cute-cartoon-burger-with-food-elements-elementlovely-foodcartoon-foodhand-png-image_4056721.jpg" width="40px" />
        {' '}
        <br />
        <a href="#" className="card-link">link 1</a>
        <a href="#" className="card-link">link 2</a>
      </div>
    </div>
  );
}
