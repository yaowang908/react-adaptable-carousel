import styled from 'styled-components';
import media from '../lib/customMediaQuery';

interface ContainerProps {

};

const Container = styled.div<ContainerProps>`
  width: 100%;

  ${media.desktop} {
      
  }
  ${media.tablet} {

  }
  ${media.phone} {

  }
`;

interface HolderProps {

};

const ImagesHolder = styled.div<HolderProps>`
  display: flex;
  overflow-x: scroll;
  ${media.desktop} {
      
  }
  ${media.tablet} {

  }
  ${media.phone} {

  }
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

export const Styled = {
  Container,
  ImagesHolder
}; 