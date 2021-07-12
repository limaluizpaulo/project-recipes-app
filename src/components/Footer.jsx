import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
  };

  return (
    <footer
      data-testid="footer"
      className="d-flex justify-content-between"
    >
      <ButtonGroup style={ bottomFixed }>
        <Button
          variant="light"
          type="button"
          onClick={ () => history.push('/bebidas') }
        >
          <img src={ drinkIcon } alt="drinks-icon" data-testid="drinks-bottom-btn" />
        </Button>
        <Button
          variant="light"
          type="button"
          onClick={ () => history.push('/explorar') }
        >
          <img src={ exploreIcon } alt="explore-icon" data-testid="explore-bottom-btn" />
        </Button>
        <Button
          variant="light"
          type="button"
          onClick={ () => history.push('/comidas') }
        >
          <img src={ mealIcon } alt="food-icon" data-testid="food-bottom-btn" />
        </Button>
      </ButtonGroup>
    </footer>
  );
}

export default Footer;
