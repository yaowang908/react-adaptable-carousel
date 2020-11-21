import React from 'react';

import { Styled } from './SingleElement.style';

interface Props {
  isImageElement: boolean;
  imgUrl?: string;
  imgAlt?: string;
  height?: number;

  isFullWidthElement?: boolean;
  
  isDivElement:boolean;
  children?: JSX.Element[] | JSX.Element;

  roundCorner?: number;//only work when full-width is disabled 
  minWidth?: number;//if child element is div, must set a minWidth for child container
  gap?: number; //space between items
  _ref?: React.RefObject<HTMLDivElement>;//ref is reserved, cannot use ref as prop here
};

const SingleElement: React.FC<Props> = (props) => {

  if(props.isImageElement) {
    if(props.isFullWidthElement) {
      // console.log(props.children);
      return (
        <Styled.Container isFullWidthElement={props.isFullWidthElement} height={props.height} gap={props.gap} ref={props._ref}>
          <Styled.Image src={props.imgUrl} alt={props.imgAlt} height={props.height} />
        </Styled.Container>
      );
    } else {
      return (
        <Styled.Image src={props.imgUrl} alt={props.imgAlt} height={props.height} gap={props.gap} roundCorner={props.roundCorner} ref={props._ref as any}/>
      );
    }
  } else if(props.isDivElement && props.children) {
      return (
        <Styled.Container isFullWidthElement={props.isFullWidthElement} height={props.height} gap={props.gap} minWidth={props.minWidth} ref={props._ref}>
          {props.children}
        </Styled.Container>
      )
  } else {
    return (
      <>
        {/* return empty when the pattern is not matched */}
      </>
    );
  }

};

export default SingleElement;