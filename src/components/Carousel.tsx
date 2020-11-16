import React from 'react';

import { Styled } from './Carousel.style';

interface Props {
  children: JSX.Element[] | JSX.Element
}

const Carousel: React.FC<Props> = (props) => {
  return (
      <Styled.Container>
          {props.children}
      </Styled.Container>
  );
};

export default Carousel;