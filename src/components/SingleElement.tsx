/* eslint-disable no-undef */
import React from 'react';
import ReactPlayer from 'react-player/lazy';

import { Styled } from './SingleElement.style';
// import mergeRefs from '../lib/mergeRefs';

interface Props {
  className?: string;
  isImageElement: boolean;
  isVideoElement?: boolean;
  url?: string;
  imgAlt?: string;
  height?: number;

  link?: string;

  isFullWidthElement?: boolean;

  isDivElement: boolean;
  children?: JSX.Element[] | JSX.Element;

  roundCorner?: number; // only work when full-width is disabled
  minWidth?: number; // if child element is div, must set a minWidth for child container
  gap?: number; // space between items
  _ref?: React.RefObject<HTMLDivElement>; // ref is reserved, cannot use ref as prop here
}
// DONE: add link options
const SingleElement: React.FC<Props> = (props) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const {
    className,
    isImageElement,
    isVideoElement,
    isFullWidthElement,
    url,
    imgAlt,
    height,
    link,
    isDivElement,
    children,
    roundCorner,
    minWidth,
    gap,
    _ref,
  } = props;

  React.useEffect(() => {
    // differentiating click and drag
    let __isUserDragging = false;
    const ele = elementRef?.current || _ref?.current;
    if (ele !== null && ele) {
      const mouseDownHandler = () => {
        // e.stopPropagation(); //disable stopPropagation to allow parent component working
        ele.addEventListener('mousemove', mouseMoveHandler);
        ele.addEventListener('mouseup', mouseUpHandler);
        __isUserDragging = false;
        // console.log('down');
      };

      const mouseMoveHandler = () => {
        // e.stopPropagation(); //disable stopPropagation to allow parent component working
        // console.log('move');
        __isUserDragging = true;
        ele.removeEventListener('mousemove', mouseMoveHandler);
      };

      const mouseUpHandler = () => {
        // e.stopPropagation(); //disable stopPropagation to allow parent component working
        if (__isUserDragging) {
          // user is dragging
          // console.log('drag');
        } else if (link) {
          // console.log(link);
          window.open(link, '_BLANK');
        } else {
          console.error('No link provided!');
          // console.log(link);
        }
      };

      ele.addEventListener('mousedown', mouseDownHandler);
      return () => {
        ele.removeEventListener('mousedown', mouseDownHandler);
        ele.removeEventListener('mousemove', mouseMoveHandler);
        ele.removeEventListener('mouseup', mouseUpHandler);
      };
    }
    return () => {};
  }, [elementRef, _ref]);

  if (isVideoElement) {
    return (
      <Styled.Container
        className={className || ''}
        isFullWidthElement={isFullWidthElement}
        height={height}
        gap={gap}
        minWidth={minWidth}
        ref={_ref}
      >
        <ReactPlayer url={url} width="100%" height="100%" />
      </Styled.Container>
    );
  }
  if (isImageElement) {
    if (isFullWidthElement) {
      // console.log(children);
      return (
        <Styled.Container
          className={className || ''}
          isFullWidthElement={isFullWidthElement}
          height={height}
          gap={gap}
          ref={_ref}
        >
          <Styled.Image
            src={url}
            alt={imgAlt}
            height={height}
            ref={elementRef as any}
          />
        </Styled.Container>
      );
    }
    return (
      <Styled.Image
        className={className || ''}
        src={url}
        alt={imgAlt}
        height={height}
        gap={gap}
        roundCorner={roundCorner}
        ref={_ref as any}
      />
    );
  }
  if (isDivElement && children) {
    return (
      <Styled.Container
        className={className || ''}
        isFullWidthElement={isFullWidthElement}
        height={height}
        gap={gap}
        minWidth={minWidth}
        ref={_ref}
      >
        {children}
      </Styled.Container>
    );
  }
  return <>{/* return empty when the pattern is not matched */}</>;
};

export default SingleElement;
