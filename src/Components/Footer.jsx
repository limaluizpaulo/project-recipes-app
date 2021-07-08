import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import { resetSelectedCategory } from '../redux/actions';

class Footer extends React.Component {
  render() {
    const bebidas = 'bebidas';
    const comidas = 'comidas';
    const { resetCategory } = this.props;

    return (
      <footer className="footer" data-testid="footer">
        <Link
          onClick={ () => resetCategory() }
          to={ { pathname: `/${bebidas}` } }
        >
          <img
            src={ drinkIcon }
            alt="drinkIcone"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explorar">
          <img
            src={ exploreIcon }
            alt="explorarIcon"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link
          onClick={ () => resetCategory() }
          to={ { pathname: `/${comidas}` } }
        >
          <img
            src={ mealIcon }
            alt="mealtIcon"
            data-testid="food-bottom-btn"
          />
        </Link>
      </footer>
    );
  }
}

Footer.propTypes = {
  resetCategory: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => (dispatch) => ({
  resetCategory: () => dispatch(resetSelectedCategory()),
});

export default connect(null, mapDispatchToProps)(Footer);
