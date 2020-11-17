import React from 'react';

import { Styled } from './Carousel.style';

interface Props {
  children: JSX.Element[] | JSX.Element;
  componentWidth: number;
}

const Carousel: React.FC<Props> = (props) => {
  
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {// handler drag move carousel
    if (null !== imagesHolderRef.current) {
      const holder = imagesHolderRef.current;
      holder.style.cursor = 'grab';
      let pos = { top:0, left:0, x:0, y:0};

      const mouseDownHandler = (e: MouseEvent) => {
        holder.style.cursor = 'grabbing';
        holder.style.userSelect = 'none';
        holder.style.removeProperty('scroll-snap-type');

        pos = {
          left:holder.scrollLeft,
          top: holder.scrollTop,
          x: e.clientX,
          y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      }

      const mouseMoveHandler = (e: MouseEvent) => {
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        holder.scrollTop = pos.top - dy;
        holder.scrollLeft = pos.left - dx;
      };

      const mouseUpHandler = () => {
        holder.style.cursor = 'grab';
        holder.style.removeProperty('user-select');
        holder.style['scroll-snap-type' as any] = 'x mandatory';

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      holder.addEventListener('mousedown', mouseDownHandler);
      
    }
  });
  React.useEffect(() => {//set container width
    if(props.componentWidth === 0) {
      setContainerWidth(0);
    } else {
      setContainerWidth(props.componentWidth);
    }
  },[containerWidth, props.componentWidth]);

  React.useEffect(() => {//set containerWidth on window resize
    // TODO: set containerWidth on window resize
    // if (null !== containerRef.current) {
    //   setContainerWidth(containerRef.current.offsetWidth);
    //   // console.log(containerWidth);
    // }
  });

  //  NOTE: using componentWidth control carousel width, if componentWidth = 0, layout becomes accordion like, container width = 100%
  //  
  /**TODO: steps
   * 1. pass in div element FIXME: currently, only handles div > img 
   * 2. pass in img urls as array TODO: create singleElement.tsx
   * 3. pass in url array including videos TODO: import video array
   */

  return (
      <Styled.Container ref={containerRef} componentWidth={containerWidth}>
        <Styled.ImagesHolder ref={imagesHolderRef} componentWidth={containerWidth} >
          {props.children}
        </Styled.ImagesHolder>
      </Styled.Container>
  );
};

export default Carousel;