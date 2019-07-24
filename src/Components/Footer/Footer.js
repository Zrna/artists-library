/* eslint-disable no-unused-vars */

import React from 'react';
import { Container } from 'reactstrap';

import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>All results depends on the Deezer API</p>
        <p>
          Made by
          <a
            href='https://github.com/Zrna'
            target='_blank'
            rel='noopener noreferrer'
          > Luka Zrnic </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
