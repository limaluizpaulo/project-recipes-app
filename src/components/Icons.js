import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Overlay, Tooltip } from 'react-bootstrap';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/global.css';

function Icons(item) {
  const [changeIcon, setChangeIcon] = useState(true);
  const [changeCopy, setChangeCopy] = useState(false);
  const target = useRef(null);
  const history = useHistory();
  const { pathname } = history.location;

  const DOISMIL = 2000;

  function copyClipboard() {
    const url = document.URL;
    navigator.clipboard.writeText(url);
    setChangeCopy(true);
    setTimeout(() => {
      setChangeCopy(false);
    }, [DOISMIL]);
  }

  function favorite() {
    setChangeIcon(!changeIcon);
    const
      { idMeal,
        strArea,
        idDrink,
        strCategory,
        strAlcoholic, strDrink, strMeal, strMealThumb, strDrinkThumb } = item.code;

    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteElement = {
      id: idMeal || idDrink,
      type: idMeal === undefined ? 'bebida' : 'comida',
      area: idMeal === undefined ? '' : strArea,
      category: strCategory,
      alcoholicOrNot: idMeal === undefined ? strAlcoholic : '',
      name: strDrink || strMeal,
      image: strMealThumb || strDrinkThumb,
    };
    // let isFavoriteBefore = 0;
    // favorites.forEach((fav) => { isFavoriteBefore += fav.id === favoriteElement.id; });

    favorites = favorites.filter((fav) => fav.id !== favoriteElement.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));

    if (changeIcon) {
      favorites = [...favorites, favoriteElement];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    }
  }

  function speakCopy() {
    return (
      <Overlay target={ target.current } show={ changeCopy } placement="bottom">
        {(props) => (
          <Tooltip id="overlay" { ...props }>
            Link copiado!
          </Tooltip>
        )}
      </Overlay>
    );
  }

  console.log(speakCopy);

  return (
    <div>
      <div className="shareAndLike">
        <button
          ref={ target }
          type="button"
          className="share"
          onClick={ copyClipboard }
        >
          <img
            src={ shareIcon }
            alt="share icon"
            data-testid={ pathname.includes('receitas-favoritas')
              ? '{index}-horizontal-share-btn' : 'share-btn' }
          />
        </button>
        <button
          type="button"
          className="favorite"
          onClick={ () => { favorite(); setChangeIcon(!changeIcon); } }
        >
          <img
            src={ changeIcon ? whiteHeartIcon : blackHeartIcon }
            alt="favorite icons"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      { changeCopy && <p>Link copiado!</p> }
    </div>
  );
}

export default Icons;
