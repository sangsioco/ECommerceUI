import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  const footerStyles = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%'
  };

  return (
    <footer style={footerStyles}>
      <Container>
        <p className="mb-0">© 2024 Sara Angsioco</p>
      </Container>
    </footer>
  );
};

export default Footer;
