import React from 'react';
import styled from 'styled-components';
import media from '../lib/customMediaQuery';

interface ContainerProps {
  isFullWidthElement?: boolean;
  gap?: number;
  roundCorner?: number;
  minWidth?: number;
  height?: number;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  ${(props) => (props.isFullWidthElement ? 'min-width:100%;' : '')}
  height: ${(props) =>
    props.height ? (props) => `${props.height}px` : 'auto'};
  overflow: hidden;
  padding: 0;
  scroll-snap-align: start;
  ${(props) => (props.minWidth ? `min-width:${props.minWidth}px;` : '')}
  ${(props) => (props.gap ? `margin: 0 0 0 ${props.gap}px;` : 'margin: 0;')}
  display: grid;
  place-item: center;
  box-sizing: border-box;
  & img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    object-fit: fill;
    width: ${(props) => (props.height ? 'auto' : '100%')};
    margin: 0 auto;
    height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  }
  & > div {
    display: grid;
    place-items: center;
  }
  ${media.desktop} {
  }
  ${media.tablet} {
    & img {
      width: auto;
      max-width: 100%;
      max-height: 100%;
      min-height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
      height: auto;
    }
  }
  ${media.phone} {
  }
`;

interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  gap?: number;
  roundCorner?: number;
  height?: number;
}

const Image = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))<ImageProps>`
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  object-fit: fill;
  height: ${(props) =>
    props.height ? (props) => `${props.height}px` : 'auto'};
  scroll-snap-align: start;
  box-sizing: border-box;
  ${(props) =>
    props.roundCorner ? `border-radius:${props.roundCorner}px;` : ``}
  ${(props) => (props.gap ? `margin: 0 0 0 ${props.gap}px;` : 'margin: 0;')}
`;

export const Styled = {
  Container,
  Image,
};
