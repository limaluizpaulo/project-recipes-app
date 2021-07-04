import React from 'react';

export default function Profile() {
  const email = localStorage.getItem('user');
  return (
    <div>
      <span data-testid="profile-email">{ Object.values(email) }</span>
      <button data-testid="profile-done-btn">Receitas Feitas</button>
      <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button data-testid="profile-logout-btn">Sair</button>
    </div>
  );
}
