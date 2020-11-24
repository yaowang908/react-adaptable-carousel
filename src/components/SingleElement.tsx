import React from 'react';

import { Styled } from './SingleElement.style';
import mergeRefs from '../lib/mergeRefs';

interface Props {
  isImageElement: boolean;
  imgUrl?: string;
  imgAlt?: string;
  height?: number;

  link?: string;

  isFullWidthElement?: boolean;
  
  isDivElement:boolean;
  children?: JSX.Element[] | JSX.Element;

  roundCorner?: number;//only work when full-width is disabled 
  minWidth?: number;//if child element is div, must set a minWidth for child container
  gap?: number; //space between items
  _ref?: React.RefObject<HTMLDivElement>;//ref is reserved, cannot use ref as prop here
};
// TODO: add link options
const SingleElement: React.FC<Props> = (props) => {
  // const [ isUserDragging, setIsUserDragging ] = React.useState<boolean>(false);
  
  const elementRef = React.useRef<HTMLDivElement>(null);

  const onClickHandler = (link: string) => {
    return () => {
      return window.open(link,'_BLANK');
    };
  };
  
  React.useEffect(() => {
    let __isUserDragging = false;
    if (null !== elementRef.current) {
      const ele = elementRef.current;
      const mouseDownHandler = (e: MouseEvent) => {
        // e.stopPropagation(); //disable stopPropagation to allow parent component working
        ele.addEventListener('mousemove', mouseMoveHandler);
        ele.addEventListener('mouseup', mouseUpHandler);
        __isUserDragging = false;
      };

      const mouseMoveHandler = (e: MouseEvent) => {
        // e.stopPropagation(); //disable stopPropagation to allow parent component working
        console.log('move');
        __isUserDragging = true;
        ele.removeEventListener('mousemove', mouseMoveHandler);
      };

      const mouseUpHandler = (e: MouseEvent) => {
        // e.stopPropagation(); //disable stopPropagation to allow parent component working
        if(__isUserDragging) {
          // user is dragging
          console.log('drag');
        } else {
          // user is clicking
          // console.log('click');
          if(props.link) {
            window.open(props.link,'_BLANK');
          } else {
            console.log('No link provided!');
            // console.log(props.link);
          }
        }
      };

      ele.addEventListener('mousedown', mouseDownHandler);
      return () => {
        ele.removeEventListener('mousedown', mouseDownHandler);
        ele.removeEventListener('mousemove', mouseMoveHandler);
        ele.removeEventListener('mouseup', mouseUpHandler);
      };
    }
    
  }, [elementRef]);

  
  if(props.isImageElement) {
    if(props.isFullWidthElement) {
      // console.log(props.children);
      return (
        <Styled.Container isFullWidthElement={props.isFullWidthElement} height={props.height} gap={props.gap} ref={props._ref}>
          <Styled.Image src={props.imgUrl} alt={props.imgAlt} height={props.height} ref={elementRef as any}/>
        </Styled.Container>
      );
    } else {
      return (
        <Styled.Image src={props.imgUrl} alt={props.imgAlt} height={props.height} gap={props.gap} roundCorner={props.roundCorner} ref={mergeRefs(props._ref, elementRef)}/>
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