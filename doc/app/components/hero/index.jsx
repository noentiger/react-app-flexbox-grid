import React from 'react';
import {Row} from 'react-app-flexbox-grid';
import style from './style';

import Button from '../button';

const Hero = () => {
  return (
    <header className={style.hero}>
      <Row center="xs">
        <h1 className={style.headline}>react-app-flexbox-grid</h1>
      </Row>
      <Row className={style.description} center="xs">
        <code>React(CSS-Modules(flexboxgrid.css));</code>
      </Row>
      <Row center="xs">
        <Button url="https://github.com/noentiger/react-app-flexbox-grid">Github</Button>
      </Row>
    </header>
  );
};

export default Hero;
