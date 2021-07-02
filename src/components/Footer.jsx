import React from 'react';
import { Container, Row } from 'react-bootstrap';
import '../css/footer.css';
import Drink from './FooterIcons/Drink';
import Explore from './FooterIcons/Explore';
import Meal from './FooterIcons/Meal';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Container className="footer">
        <Row>
          <Meal />
          <Explore />
          <Drink />
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
