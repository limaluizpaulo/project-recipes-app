import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { getDonesRecipes } from '../services/localStorage';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function RecipesMade() {
  const [dones, setDones] = useState();
  const [filter, setFilter] = useState();

  useEffect(() => {
    setDones(getDonesRecipes());
  }, []);

  const renderCards = () => dones
    
      );
    });

  return (
    <div>
      
    </div>
  );
}

export default RecipesMade;
