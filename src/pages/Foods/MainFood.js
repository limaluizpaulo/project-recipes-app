import React from 'react';
import Header from '../../components/Header';

export default function MainFood() {
  return (
    <div
      className="main-food-class"
      style={ { width: '100%', position: 'absolute', top: '0' } }
    >
      <Header title="Comidas" classname="display" />
    </div>
  );
}
