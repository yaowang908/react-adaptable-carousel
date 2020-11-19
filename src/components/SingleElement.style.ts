import styled from 'styled-components';
import media from '../lib/customMediaQuery';

interface ContainerProps {
  isFullWidthElement?: boolean;
  gap?: number;
  roundCorner?: number;
  minWidth?: number;
};

const Container = styled.div<ContainerProps>`
  width: 100%;
  ${props=>props.isFullWidthElement? 'min-width:100%;':''}
  height: 100%;
  overflow: hidden;
  padding: 0;
  scroll-snap-align: start;
  ${props=>props.minWidth ? `min-width:${props.minWidth}px;` :''}
  ${props=>props.gap ? `margin: 0 0 0 ${props.gap}px;` : 'margin: 0;'}

  box-sizing: border-box;
  & img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    width: 100%;
    height: auto;
  }
  ${media.desktop} {
      
  }
  ${media.tablet} {

  }
  ${media.phone} {

  }
`;

interface ImageProps {
  src?: string;
  alt?: string;
  gap?: number;
  roundCorner?: number;
};

const Image = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt,
}))<ImageProps>`
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  object-fit: fill;
  height: 100%;
  scroll-snap-align: start;
  box-sizing: border-box;
  ${props=>props.roundCorner ? `border-radius:${props.roundCorner}px;` : ``}
  ${props=>props.gap ? `margin: 0 0 0 ${props.gap}px;` : 'margin: 0;'}
`;

export const Styled = {
  Container,
  Image,
};