import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ShareButton from './Details/ShareButton';
import FavoriteButton from './Details/FavoriteButton';

export default function FavoritesCard({ favorite }) {
  const generateMealOrDrinkTitle = () => {
    switch (favorite.type) {
    case 'comida':
      return <h5>{`${favorite.area} - ${favorite.category}`}</h5>;
    case 'bebida':
      return <h5>{`${favorite.alcoholicOrNot}`}</h5>;
    default:
      break;
    }
  };

  const generateFavoriteTable = () => (
    <table>
      <tbody>
        <tr>
          <td rowSpan="4">
            <img alt={ favorite.name } width="140" src={ favorite.image } />
          </td>
        </tr>
        <tr>
          <td>{ generateMealOrDrinkTitle() }</td>
        </tr>
        <tr>
          <td><h5>{ favorite.name }</h5></td>
        </tr>
        <tr>
          <td>
            <ShareButton id={ favorite.id } type={ favorite.type } />
            <FavoriteButton recipe={ favorite } />
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <Card>
      { generateFavoriteTable() }
    </Card>
  );
}

FavoritesCard.propTypes = {
  favorite: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
};
