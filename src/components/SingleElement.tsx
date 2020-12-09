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
    className: _className,
    isImageElement: _isImageElement,
    isVideoElement: _isVideoElement,
    isFullWidthElement: _isFullWidthElement,
    url: _url,
    imgAlt: _imgAlt,
    height: _height,
    link: _link,
    isDivElement: _isDivElement,
    roundCorner: _roundCorner,
    minWidth: _minWidth,
    gap: _gap,
    _ref: __ref,
    children: _children,
  } = props;
  const [className, setClassName] = React.useState(_className);
  const [isImageElement, setIsImageElement] = React.useState(_isImageElement);
  const [isVideoElement, setIsVideoElement] = React.useState(_isVideoElement);
  const [isFullWidthElement, setIsFullWidthElement] = React.useState(
    _isFullWidthElement
  );
  const [url, setUrl] = React.useState(_url);
  const [imgAlt, setImgAlt] = React.useState(_imgAlt);
  const [height, setHeight] = React.useState(_height);
  const [link, setLink] = React.useState(_link);
  const [isDivElement, setIsDivElement] = React.useState(_isDivElement);
  const [children, setChildren] = React.useState(_children);
  const [roundCorner, setRoundCorner] = React.useState(_roundCorner);
  const [minWidth, setMinWidth] = React.useState(_minWidth);
  const [gap, setGap] = React.useState(_gap);
  const [_ref, set_ref] = React.useState(__ref);

  React.useEffect(() => {
    if (_className) setClassName(_className);
    if (_isImageElement) setIsImageElement(_isImageElement);
    if (_isVideoElement) setIsVideoElement(_isVideoElement);
    if (_isFullWidthElement) setIsFullWidthElement(_isFullWidthElement);
    if (_url) setUrl(_url);
    if (_imgAlt) setImgAlt(_imgAlt);
    if (_height) setHeight(_height);
    if (_link) setLink(_link);
    if (_isDivElement) setIsDivElement(_isDivElement);
    if (_children) setChildren(_children);
    if (_roundCorner) setRoundCorner(_roundCorner);
    if (_minWidth) setMinWidth(_minWidth);
    if (_gap) setGap(_gap);
    if (__ref) set_ref(__ref);
  }, [
    _className,
    _isImageElement,
    _isVideoElement,
    _isFullWidthElement,
    _url,
    _imgAlt,
    _height,
    _link,
    _isDivElement,
    _children,
    _roundCorner,
    _minWidth,
    _gap,
    __ref,
  ]);

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
  }, [elementRef, _ref, link]);

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
