import React from 'react';

import SingleElement from './SingleElement';
import { Styled } from './Carousel.style';

interface Props {
  componentWidth: number;
  // set the following two for image elements
  isImageElement: boolean;
  imgUrlArray?: string[];
  
  isFullWidthItem: boolean;
  // set these two for div element
  isDivElement: boolean;
  children?: JSX.Element[] | JSX.Element;
  // space between items
  gap?: number;
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
    // Don't apply [] to this useEffect, otherwise offsetWidth will not equal to the real width after first render
    let _containerWidth : number = containerRef.current ? Number(containerRef.current.offsetWidth.toString().replace('px', '')) : 0;
    setContainerWidth(_containerWidth);
    // change container width when window resize
    const resizeHandler = () => {
        let __containerWidth : number = containerRef.current ? Number(containerRef.current.offsetWidth.toString().replace('px', '')) : 0;
        setContainerWidth(__containerWidth);
        console.log(containerWidth);
    }
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  },[containerWidth]);

  //  NOTE: using componentWidth control carousel width, if componentWidth = 0, layout becomes accordion like, container width = 100%
  //            TODO: under accordion layout, should have other variables control round corner and margin in-between
  //  
  /**TODO: steps
   * 1. pass in div element DONE: currently, only handles div > img 
   * 2. pass in img urls as array DONE: create singleElement.tsx
   * 3. pass in url array including videos TODO: import video array
   * 4. when not full width slider container width < sliderWidthSum TODO: should turn to full width slider
   * 5. auto rotate TODO:
   * 6. add link to image TODO:, meanwhile add tooltip
   * 
   */

  return (
      <Styled.Container ref={containerRef} componentWidth={containerWidth}>
        <Styled.ImagesHolder ref={imagesHolderRef} componentWidth={containerWidth} >
          {
            props.isImageElement && props.imgUrlArray ? props.imgUrlArray.map((x, index) => {
              return <SingleElement isDivElement={props.isDivElement} 
                                    isImageElement={props.isImageElement} 
                                    isFullWidthElement={props.isFullWidthItem} 
                                    imgUrl={x}
                                    imgAlt={''}
                                    gap={props.gap}
                                    key={index}
                      ></SingleElement>
            }) : (props.isDivElement && props.children ? React.Children.map(props.children, (child: React.ReactElement) => {
              return (
                <SingleElement isDivElement={props.isDivElement} 
                              isImageElement={props.isImageElement} 
                              isFullWidthElement={props.isFullWidthItem}
                              gap={props.gap}>
                  {child}
                </SingleElement>
              )
            }):'Please set imgUrlArray or props.children')
          }
        </Styled.ImagesHolder>
      </Styled.Container>
  );
};

export default Carousel;