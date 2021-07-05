import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/footer.css';
import FooterButtons from './Footer/FooterButtons';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Container className="footer">
        <FooterButtons />
      </Container>
    </footer>
  );
}

export default Footer;
