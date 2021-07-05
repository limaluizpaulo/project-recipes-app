import React from 'react';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <main>
      <p data-testid="profile-email">{ email }</p>
      <button data-testid="profile-done-btn">Receitas Feitas</button>
      <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button data-testid="profile-logout-btn">Sair</button>
    </main>
  );
}

export default Profile;
