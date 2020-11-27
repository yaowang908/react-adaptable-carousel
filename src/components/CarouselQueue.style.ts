import styled from 'styled-components';
import media from '../lib/customMediaQuery';

interface ContainerProps {

};

const Container = styled.div<ContainerProps>`
  width: 100%;
  overflow: hidden;
  position: relative;
  ${media.desktop} {
      
  }
  ${media.tablet} {

  }
  ${media.phone} {

  }
`;

interface HolderProps {
  gap?: number;
};

const ImagesHolder = styled.div<HolderProps>`
  display: flex;
  position relative;
  overflow-x: scroll;
  height: calc(100% + 3px);
  ${props=>props.gap ? `margin-left: -${props.gap}px;` : 'margin: 0;'}
  
  ${media.desktop} {
      
  }
  ${media.tablet} {

  }
  ${media.phone} {

  }
  &::-webkit-scrollbar {
    height: 0px;
  }
  
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    // outline: 1px solid slategrey;
    // background-color: darkgrey;
  }
`;

interface ImagesHolderBeforeProps {
  gap?: number;
  show: boolean;
  color?: string;
  colorBg?: string;
};

const ImagesHolderBefore = styled.div<ImagesHolderBeforeProps>`
    writing-mode: vertical-rl;
    text-orientation: mixed;
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 100%;
    border-radius: ${props=>props.gap ? props.gap/2 : 0}px;
    background-color: ${props=>props.colorBg ? `${props.colorBg}78` : '#00000078'};
    color: ${props=>props.color ? props.color : '#fff'};
    display: grid;
    // display: ${props=>props.show ? 'grid':'none'};
    opacity: ${props=>props.show ? '100':'0'};
    place-items: center;
    z-index: 100;
    transition: all 1s ease-in-out;
`;
const ImagesHolderAfter = styled(ImagesHolderBefore)<ImagesHolderBeforeProps>`
    right: 0;
    left: auto;
`;

export const Styled = {
  Container,
  ImagesHolder,
  ImagesHolderBefore,
  ImagesHolderAfter
}; 
