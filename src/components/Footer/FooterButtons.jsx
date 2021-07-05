import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';

function FooterButtons() {
  const [footerButtonsJSON] = useState([
    {
      rota: '/comidas',
      imagem: {
        caminho: mealIcon,
        alt: 'meal icon',
      },
      dataTestId: 'food-bottom-btn',
    },
    {
      rota: '/explorar',
      imagem: {
        caminho: exploreIcon,
        alt: 'explore icon',
      },
      dataTestId: 'explore-bottom-btn',
    },
    {
      rota: '/bebidas',
      imagem: {
        caminho: drinkIcon,
        alt: 'drink icon',
      },
      dataTestId: 'drinks-bottom-btn',
    },
  ]);

  return (
    <Row>
      { footerButtonsJSON.map((infoBotao) => (
        <Col className="center-footer-icons" key={ infoBotao.dataTestId }>
          <Link to={ `${infoBotao.rota}` }>
            <img
              data-testid={ `${infoBotao.dataTestId}` }
              src={ infoBotao.imagem.caminho }
              alt={ infoBotao.imagem.alt }
            />
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default FooterButtons;
