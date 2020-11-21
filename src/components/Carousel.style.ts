import styled from 'styled-components';
import media from '../lib/customMediaQuery';

interface ContainerProps {
  componentWidth?: number;
  componentHeight: number;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${props=>props.componentHeight}px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  position: relative;
  box-sizing: border-box;
  ${media.desktop} {
      
  }
  ${media.tablet} {

  }
  ${media.phone} {

  }
`;

interface ImagesHolderProps {
  componentWidth?: number;
  gap?: number;
}

const ImagesHolder = styled.div<ImagesHolderProps>`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: calc(100% + 3px);
  padding: 0;
  box-sizing: border-box;
  draggable: false;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  
  ${props=>props.gap ? `margin: 0 0 0 -${props.gap}px;` : 'margin: 0;'}
  ${props=>props.gap ? `width: calc(100% + ${props.gap}px);` : ''}
  
  // & > div {
  //   scroll-snap-align: start;
  //   height: 100%;
  //   max-width:100%;
  //   ${props=>props.componentWidth === 0 ? 'width: auto' : 'width:'+props.componentWidth+'px'};
  //   ${props=>props.componentWidth === 0 ? 'flex: 0 0 auto' : 'flex: 0 0' + props.componentWidth+'px'};
  //   ${props=>props.componentWidth === 0 ? '' : 'display: grid;place-items: center;'};
  // }
  // & img {
  //   -webkit-user-drag: none;
  //   -khtml-user-drag: none;
  //   -moz-user-drag: none;
  //   -o-user-drag: none;
  //   user-drag: none;
  //   object-fit: fill;
  //   height: 100%;
  // }
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
  ImagesHolder,
};