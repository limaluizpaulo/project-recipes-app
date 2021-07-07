import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Overlay, Tooltip } from 'react-bootstrap';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/global.css';

function favoriteStructure(item) {
  if (item.code !== undefined) {
    const
      { idMeal,
        strArea,
        idDrink,
        strCategory,
        strAlcoholic, strDrink, strMeal, strMealThumb, strDrinkThumb } = item.code;

    const favoriteElement = {
      id: idMeal || idDrink,
      type: idMeal === undefined ? 'bebida' : 'comida',
      area: idMeal === undefined ? '' : strArea,
      category: strCategory,
      alcoholicOrNot: idMeal === undefined ? strAlcoholic : '',
      name: strDrink || strMeal,
      image: strMealThumb || strDrinkThumb,
    };
    return favoriteElement;
  }
}

function Icons(item) {
  const [changeIcon, setChangeIcon] = useState(true);
  const [changeCopy, setChangeCopy] = useState(false);
  const [first, setFirst] = useState(false);
  const target = useRef(null);
  const history = useHistory();
  const { pathname } = history.location;

  const DOISMIL = 2000;

  function isFavorite() {
    const { idDrink, idMeal } = item.code;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let flag = 0;
    favorites
      .forEach((fav) => { if (fav.id === (idDrink || idMeal)) flag += 1; });
    if (flag > 0) setChangeIcon(!changeIcon);
  }
  if (!first) {
    isFavorite();
    setFirst(true);
  }

  function copyClipboard() {
    let url;
    if (document.URL.includes('in-progress')) {
      url = document.URL.split('/in-progress');
      navigator.clipboard.writeText(url[0]);
    } else {
      url = document.URL;
      navigator.clipboard.writeText(url);
    }
    setChangeCopy(true);
    setTimeout(() => {
      setChangeCopy(false);
    }, [DOISMIL]);
  }

  function favorite() {
    setChangeIcon(!changeIcon);

    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteElement = favoriteStructure(item);

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

  return (
    <div>
      <div className="shareAndLike">
        <button
          ref={ target }
          type="button"
          className="share"
          onClick={ () => { copyClipboard(); speakCopy(); } }
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
