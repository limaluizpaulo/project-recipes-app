import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Recipes() {
  const { pathname } = useHistory().location;
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (pathname.includes('comidas')) setTitle('Comidas');
    if (pathname.includes('bebidas')) setTitle('Bebidas');
  }, [pathname]);
  return (
    <div>
      <Header title={ title } search />
      <Footer />
      <h1>receita</h1>
    </div>
  );
}
