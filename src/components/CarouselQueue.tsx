import React from 'react';

import SingleElement from './SingleElement';
import debounce from '../lib/debounce';
import { scrollTo } from '../lib/smoothScrollTo';
import { Styled } from './CarouselQueue.style';

interface Props {
  imgUrlArray?: string[];
  componentHeight?: number;
  isDivElement: boolean;
  roundCorner?: number;
  gap: number; // gap is necessary
};

interface Position {
  position: "left-end" | "right-end" | "middle";
}

// TODO: fixed amount children

const CarouselQueue: React.FC<Props> = (props) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [currentSliderIndex, setCurrentSliderIndex] = React.useState<number>(0);
  const [carouselPosition, setCarouselPosition] = React.useState<Position>({position: 'left-end'});
  // const containerRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderBeforeRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderAfterRef = React.useRef<HTMLDivElement>(null);
  const [imageHolderBeforeVisibility, setImageHolderBeforeVisibility] = React.useState<boolean>(false);
  const [imageHolderAfterVisibility, setImageHolderAfterVisibility] = React.useState<boolean>(false);
  // const [itemsWidth, setItemsWidth] = React.useState<number[]>([]);
  // const [itemAmount, setItemAmount] = React.useState<number>(0);
  // const [isCarouselPaused, setIsCarouselPaused] = React.useState<boolean>(false);
  // const [itemRefs, setItemRefs] = React.useState<React.RefObject<HTMLDivElement>[]>([]); 
  // 1. drag function
  React.useEffect(() => {// handler drag move carousel
    if (null !== imagesHolderRef.current) {
      const holder = imagesHolderRef.current;
      holder.style.cursor = 'grab';
      let pos = { top:0, left:0, x:0, y:0};
      const mouseDownHandler = (e: MouseEvent) => {
        e.stopPropagation();
        // console.log('Mouse down');
        holder.style.cursor = 'grabbing';
        holder.style.userSelect = 'none';
        holder.style.removeProperty('scroll-snap-type');
        holder.style.margin='0';//scroll snap will conflict with preset margin 

        pos = {
          left:holder.scrollLeft,
          top: holder.scrollTop,
          x: e.clientX,
          y: e.clientY,
        };

        holder.addEventListener('mousemove', mouseMoveHandler);
        holder.addEventListener('mouseup', mouseUpHandler);
      }
      const mouseMoveHandler = (e: MouseEvent) => {
        e.stopPropagation();
        // console.log('Mouse move');
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        holder.scrollTop = pos.top - dy;
        holder.scrollLeft = pos.left - dx;
      };
      const mouseUpHandler = (e: MouseEvent) => {
        e.stopPropagation();
        console.log('Mouse up');
        holder.style.cursor = 'grab';
        holder.style.removeProperty('user-select');
        holder.style['scroll-snap-type' as any] = 'x mandatory';
        // console.log('ScrollLeft: '+holder.scrollLeft);
        // console.log('width: '+holder.offsetWidth);
        // console.log('ScrollWidth: '+holder.scrollWidth);
        if((holder.scrollWidth - holder.offsetWidth) <= holder.scrollLeft ) {
          setCarouselPosition( {position: 'right-end'} );
        } else if (holder.scrollLeft <= props.gap) {
          setCarouselPosition( {position: 'left-end'} );
        } else {
          setCarouselPosition( {position: 'middle'} );
        }

        holder.removeEventListener('mousemove', mouseMoveHandler);
        holder.removeEventListener('mouseup', mouseUpHandler);
      };
      holder.addEventListener('mousedown', mouseDownHandler);
      return () => {
        holder.removeEventListener('mousedown', mouseDownHandler);
        holder.removeEventListener('mousemove', mouseMoveHandler);
        holder.removeEventListener('mouseup', mouseUpHandler);
      };
    }
  });
  // remove auto scroll function in Queue
  // 2. when scroll to the end
  /**
   * next drag would enable a block indicate this is the end
   * when mouse up the block will snap back
   */
  React.useEffect(() => {// both end reminder
    const _before = imagesHolderBeforeRef.current;
    const _after = imagesHolderAfterRef.current;
    // console.log('ScrollLeft: '+holder.scrollLeft);
    // console.log('width: '+holder.offsetWidth);
    // console.log('ScrollWidth: '+holder.scrollWidth);
    if(_before && _after) {
      if(carouselPosition.position === 'left-end') {
        setImageHolderBeforeVisibility(true);
        setTimeout(() => {
          setImageHolderBeforeVisibility(false);
        }, 2000);
      } else if (carouselPosition.position === 'right-end'){
        setImageHolderAfterVisibility(true);
        setTimeout(() => {
          setImageHolderAfterVisibility(false);
        }, 2000);
      } else {
        setImageHolderAfterVisibility(false);
        setImageHolderBeforeVisibility(false);
      }
    }
    
  },[carouselPosition]);

  // TODO: 3. add link option to single element
  
  return (
    <Styled.Container>
      <Styled.ImagesHolderBefore ref={imagesHolderBeforeRef} gap={props.gap} show={imageHolderBeforeVisibility}>{'First One'}</Styled.ImagesHolderBefore>
      <Styled.ImagesHolder ref={imagesHolderRef} gap={props.gap}>
        {
          props.imgUrlArray ? props.imgUrlArray.map((x, index) => {
              return <SingleElement isDivElement={props.isDivElement} 
                                    isImageElement={true} 
                                    isFullWidthElement={false} 
                                    imgUrl={x}
                                    imgAlt={''}
                                    gap={props.gap? props.gap : 0}
                                    height={props.componentHeight}
                                    roundCorner={props.roundCorner? props.roundCorner : 0}
                                    key={index}
                      ></SingleElement>
            }) : (props.isDivElement && props.children ? React.Children.map(props.children as any, (child: React.ReactElement, index: number) => {
              return (
                <SingleElement isDivElement={props.isDivElement} 
                              isImageElement={false} 
                              isFullWidthElement={false} 
                              gap={props.gap? props.gap : 0}
                              height={props.componentHeight}
                              minWidth={0}// full width div item don't care
                              roundCorner={props.roundCorner? props.roundCorner : 0} >
                                
                  {child}
                </SingleElement>
              )
            }):'Please set imgUrlArray or props.children')
        }
      </Styled.ImagesHolder>
      <Styled.ImagesHolderAfter ref={imagesHolderAfterRef} gap={props.gap} show={imageHolderAfterVisibility}>{'Last One'}</Styled.ImagesHolderAfter>
    </Styled.Container>
  );
}

export default CarouselQueue