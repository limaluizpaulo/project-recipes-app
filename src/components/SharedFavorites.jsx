import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { addFavicon, faviconColor } from '../action';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class SharedFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteIcon: false,
    };
    this.handleClickFav = this.handleClickFav.bind(this);
  }

  handleClickFav() {
    const { favoriteIcon } = this.state;
    this.setState({
      favoriteIcon: true,
    });
    if (favoriteIcon) {
      this.setState({
        favoriteIcon: false,
      });
    }
  }

  render() {
    const { favoriteIcon } = this.state;
    return (
      <section>
        <button
          className="details-btn-share"
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt={ shareIcon } />
        </button>
        <button
          className="details-btn-favorite"
          type="button"
          data-testid="favorite-btn"
          onClick={ this.handleClickFav }
        >
          <img src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon } alt="Favorito" />
        </button>
      </section>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   addFavIcon: (favIcon) => dispatch(addFavicon(favIcon)),
//   colorFavIcon: (color) => dispatch(faviconColor(color)),
// });

// const mapStateToProps = (state) => ({
//   getFavIcon: state.recipeDetails.favIcon,
//   getFavIconColor: state.recipeDetails.favIconColor,
// });

// SharedFavorites.propTypes = {
//   addFavicon: PropTypes.func,
//   colorFavIcon: PropTypes.func,
// }.isRequired;

export default SharedFavorites;
