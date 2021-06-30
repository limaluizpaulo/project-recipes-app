import React from 'react';
import DoneRecipeCard from './DoneRecipeCard';

function DoneRecipesList() {
  // receber o localStorage ou context
  const localStorageContext = [
    {
      id: 'id-da-receita',
      type: 'comida-ou-bebida',
      area: 'area-da-receita-ou-texto-vazio',
      category: 'categoria-da-receita-ou-texto-vazio',
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-da-receita',
      image: 'imagem-da-receita',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: 'array-de-tags-da-receita-ou-array-vazio',
    },
    {
      id: 'id-da-receita',
      type: 'comida-ou-bebida',
      area: 'area-da-receita-ou-texto-vazio',
      category: 'categoria-da-receita-ou-texto-vazio',
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-da-receita',
      image: 'imagem-da-receita',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: 'array-de-tags-da-receita-ou-array-vazio',
    },
  ];
  return (
    <div>
      { localStorageContext.map((recipe, index) => (
        <DoneRecipeCard key={ index } recipe={ recipe } index={ index } />
      )) }
    </div>
  );
}

export default DoneRecipesList;
