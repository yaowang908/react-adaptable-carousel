import React from 'react';

import SingleElement from './SingleElement';
import debounce from '../lib/debounce';
import { scrollTo } from '../lib/smoothScrollTo';
import { Styled } from './CarouselFullWidth.style';
import { Button } from './Button.style';

interface Props {
  isDivElement: boolean;
  imgUrlArray?: {imgUrl: string, link?: string;}[];
  componentHeight?: number;// if height = null, set height to auto
};

const CarouselFullWidth: React.FC<Props> = (props) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [currentSliderIndex, setCurrentSliderIndex] = React.useState<number>(0);
  const [carouselPosition, setCarouselPosition] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderRef = React.useRef<HTMLDivElement>(null);
  const [itemsWidth, setItemsWidth] = React.useState<number[]>([]);
  const [itemAmount, setItemAmount] = React.useState<number>(0);
  const [isCarouselPaused, setIsCarouselPaused] = React.useState<boolean>(false);
  const [itemRefs, setItemRefs] = React.useState<React.RefObject<HTMLDivElement>[]>([]);

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
        // console.log('Mouse up');
        holder.style.cursor = 'grab';
        holder.style.removeProperty('user-select');
        holder.style['scroll-snap-type' as any] = 'x mandatory';
        // console.log(holder.scrollLeft);
        setCarouselPosition( holder.scrollLeft );
        
        const stepsLengthArr: number[] = [];//these are the actual number to move 
        let __position = 0;
        stepsLengthArr.push(__position);
        for(let i = 0; i<itemAmount-1; i++) {
          __position = __position + itemsWidth[i];
          stepsLengthArr.push(__position);
        }
        let __tempIndex:number = 0;
        for(let i=0; i<stepsLengthArr.length; i++) {
          if(holder && (holder.scrollLeft >= stepsLengthArr[i])) {
            __tempIndex = i;
          }
        }
        setCurrentSliderIndex(__tempIndex);
        // console.log('__tempIndex: '+__tempIndex);

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
  React.useEffect(() => {//set container width
    if(containerRef.current) {
      setContainerWidth(Number(containerRef.current.offsetWidth.toString().replace('px', '')));
    } else {
      //do nothing
    }
  },[containerWidth]);
  const resizeHandler = React.useCallback(// keep the function instance the same between renders
      debounce(()=>{
        let __containerWidth : number = containerRef.current ? Number(containerRef.current.offsetWidth.toString().replace('px', '')) : 0;
        setContainerWidth(__containerWidth);
        console.log(__containerWidth);
      }, 500),
      []
  );
  React.useEffect(() => {//set containerWidth on window resize
    // DONE: set containerWidth on window resize
    // Don't apply [] to this useEffect, otherwise offsetWidth will not equal to the real width after first render
    let _containerWidth : number = containerRef.current ? Number(containerRef.current.offsetWidth.toString().replace('px', '')) : 0;
    setContainerWidth(_containerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  },[containerWidth, resizeHandler]);
  React.useEffect(() => {// set item amount
    if(!props.isDivElement && props.imgUrlArray) {
      setItemAmount(props.imgUrlArray?.length);
    } else if (props.isDivElement) {
      setItemAmount(React.Children.count(props.children));
    }
  },[props.isDivElement,props.imgUrlArray,props.children]);
  React.useEffect(() => {// init item refs
    setItemRefs(itemRefs => (
      Array(itemAmount).fill(0).map((_,i) => itemRefs[i] || React.createRef<React.RefObject<HTMLDivElement>>())
    ));
  }, [itemAmount]);
  React.useEffect(() => { //get all items width
    const __itemsWidth:number[] = Array(itemAmount).fill(0).map((_,i) => {
        if( itemRefs[i] ) {
          let _cur = itemRefs[i].current;
          return Number(_cur?.offsetWidth.toString().replace('px', ''));
        } else {
          // console.error('1');
          return 0;
        }
      });
    setItemsWidth(__itemsWidth);
  }, [containerWidth, itemAmount, itemRefs]);
  React.useEffect(() => {//auto increase slider index
    const auto_interval = 2000; //interval 
    // if is paused then pause
    // if is not paused, auto increase current slide index by 1 until reach the end then go back to 0
    const nIntervalId = setInterval(() => {
      if(isCarouselPaused) {
        //pause carousel
        // console.log('paused');
      } else {
        // console.log(currentSliderIndex);
        if(currentSliderIndex === (itemAmount - 1)) {
          setCurrentSliderIndex(0);
        } else {
          setCurrentSliderIndex(currentSliderIndex + 1);
        }
        // TODO: when reach the end, instead of going to 0, go back 1 per step until 0 then go forward by 1 a time
      }
    }, auto_interval);

    return () => clearInterval(nIntervalId);
  },[currentSliderIndex, isCarouselPaused, itemAmount]);
  React.useEffect(() => { // move the slide automatically or by clicking the buttons. Not swap or drag
    //DONE: smooth swipe
    //take the current slide index and display it
    const holder = imagesHolderRef.current;
    const stepsLengthArr: number[] = [];//these are the actual number to move 
    let __position = 0;
    // console.log('itemsWidth: '+itemsWidth);
    const carouselWidth = itemsWidth.reduce((acc, cur) => { return acc+cur}, 0) ; 
    // console.log('carouselWidth: '+carouselWidth);
    const positionLeftLimit = carouselWidth - containerWidth; //going to assign it with carouselWidth - containerWidth, but the result is missing one gap, compare to the real circumstance 
    stepsLengthArr.push(__position);
    for(let i = 0; i<itemAmount-1; i++) {
      __position = __position + itemsWidth[i];
      stepsLengthArr.push(__position);
    }

    let currentPosition: number = 0;// the number to set scrollLeft
    let __temp = false;
    for(let i = 0; i<currentSliderIndex; i++) {
      if(stepsLengthArr[i] <= positionLeftLimit) {
        currentPosition = stepsLengthArr[i];
      } else {
        if(__temp) {
          currentPosition = 0;
          setCurrentSliderIndex(0);
        } else {
          currentPosition = positionLeftLimit;
          __temp = true;
        }
      }
    }
    // console.log('currentPosition: '+currentPosition);
    if(holder && !isCarouselPaused) {
      // holder.scrollLeft = currentPosition;
      scrollTo.left(holder, currentPosition, 1000);
    }
  },[containerWidth, itemsWidth, currentSliderIndex, carouselPosition, itemAmount, isCarouselPaused]);
  React.useEffect(() => { // pause auto movement when tag lose focus
    const visibilityHandler = () => {
      if(document.visibilityState === 'visible') {
        // console.log("focus");
        setIsCarouselPaused(false);
      } else {
        // console.log("blur");
        setIsCarouselPaused(true);
      }
    };
    window.addEventListener("visibilitychange",visibilityHandler);
    return () => {
      window.removeEventListener("visibilitychange", visibilityHandler);
    }
  });
  const mouseEnterHandler = () => {
    setIsCarouselPaused(true);
    // TODO: bring up handle buttons
  };
  const mouseLeaveHandler = () => {
    setIsCarouselPaused(false);
  };
// TODO: add link options

  return (
    <Styled.Container ref={containerRef as any} onMouseEnter = {() => mouseEnterHandler()} onMouseLeave = {() => mouseLeaveHandler()}>
      <Button.Prev></Button.Prev>
      <Button.Next></Button.Next>
      <Styled.ImagesHolder ref={imagesHolderRef as any}>
        {
          props.imgUrlArray ? props.imgUrlArray.map((x, index) => {
              return <SingleElement isDivElement={props.isDivElement} 
                                    isImageElement={true} 
                                    isFullWidthElement={true} 
                                    imgUrl={x.imgUrl}
                                    link={x.link}
                                    imgAlt={''}
                                    gap={0}
                                    height={props.componentHeight}
                                    roundCorner={0}
                                    key={index}
                                    _ref={itemRefs[index] as any}
                      ></SingleElement>
            }) : (props.isDivElement && props.children ? React.Children.map(props.children as any, (child: React.ReactElement, index: number) => {
              return (
                <SingleElement isDivElement={props.isDivElement} 
                              isImageElement={false} 
                              isFullWidthElement={true} 
                              gap={0}
                              height={props.componentHeight}
                              minWidth={0}// full width div item don't care
                              _ref={itemRefs[index] as any}
                              roundCorner={0} >
                                
                  {child}
                </SingleElement>
              )
            }):'Please set imgUrlArray or props.children')
        }
      </Styled.ImagesHolder>
    </Styled.Container>
  );
};

export default CarouselFullWidth;