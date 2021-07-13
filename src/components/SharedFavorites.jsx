import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { addFavicon, faviconColor } from '../action';
import copy from 'clipboard-copy';
import identification from '../helper/dictionaryApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class SharedFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: false,
      favIconColor: whiteHeartIcon,
      link: false,
    };
    this.handleFavClick = this.handleFavClick.bind(this);
    this.renderState = this.renderState.bind(this);
  }

  componentDidMount() {
    this.renderState();
  }

  handleFavClick() {
    const { favIcon } = this.state;
    const { details, id, page } = this.props;
    const keyName = identification(details);
    const recovery = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!favIcon) {
      this.setState({
        favIconColor: blackHeartIcon,
        favIcon: true,
      });

      const recipe = [
        ...recovery, {
          id: details[keyName.Id],
          type: page.includes('comidas') ? 'comida' : 'bebida',
          area: details[keyName.Area] ? details[keyName.Area] : '',
          category: details[keyName.Category] ? details[keyName.Category] : '',
          alcoholicOrNot: details[keyName.Alcoholic] ? details[keyName.Alcoholic] : '',
          name: details[keyName.Name],
          image: details[keyName.Thumb],
        },
      ];

      console.log(recovery);

      return localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
    }
    if (favIcon) {
      console.log('sou verdadeiro', id, page);

      this.setState({
        favIconColor: whiteHeartIcon,
        favIcon: false,
      });
      const favoriteKeys = recovery.filter((el) => el.id !== id) || {};
      console.log(favoriteKeys);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteKeys));
    }
  }

  renderState() {
    const { id } = this.props;
    const recoveryFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const check = recoveryFavorite.some((el) => el.id === id);

    if (check) {
      this.setState({ favIconColor: blackHeartIcon,
        favIcon: true });
    }
  }

  render() {
    const { favIconColor, link } = this.state;
    const { page, id } = this.props;
    return (
      <section>
        <button
          className="details-btn-share"
          type="button"
          onClick={ () => copy(`http://localhost:3000/${page}/${id}`)
            .then(() => this.setState({ link: true })) }
        >
          <img data-testid="share-btn" src={ shareIcon } alt={ shareIcon } />
        </button>
        {link && <p>Link copiado!</p>}
        <button
          className="details-btn-favorite"
          type="button"
          // data-testid="favorite-btn"
          onClick={ this.handleFavClick }
        >
          <img src={ favIconColor } data-testid="favorite-btn" alt={ favIconColor } />
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  details: state.recipeDetails.details,
});
export default connect(mapStateToProps)(SharedFavorites);

// const mapDispatchToProps = (dispatch) => ({
//   addFavIcon: (favIcon) => dispatch(addFavicon(favIcon)),
//   colorFavIcon: (color) => dispatch(faviconColor(color)),
// });

// const mapStateToProps = (state) => ({
//   getFavIcon: state.recipeDetails.favIcon,
//   getFavIconColor: state.recipeDetails.favIconColor,
// });

SharedFavorites.propTypes = {
  details: PropTypes.shape.isRequired,
  page: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

// export default SharedFavorites;
