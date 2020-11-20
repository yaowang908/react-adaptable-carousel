import React from 'react';

import SingleElement from './SingleElement';
import { Styled } from './Carousel.style';

interface Props {
  componentWidth: number;
  componentHeight: number;
  // set the following two for image elements
  isImageElement: boolean;
  imgUrlArray?: string[];
  
  isFullWidthItem: boolean;
  // set these two for div element
  isDivElement: boolean;
  children?: JSX.Element[] | JSX.Element;

  roundCorner?: number;
  
  divElementMinWidth?: number;//if child element is div, must set a minWidth for child container
  // space between items
  gap: number;
}

const Carousel: React.FC<Props> = (props) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [currentSliderIndex, setCurrentSliderIndex] = React.useState<number>(0);
  const [isCarouselPaused, setIsCarouselPaused] = React.useState<boolean>(false);
  const [itemAmount, setItemAmount] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderRef = React.useRef<HTMLDivElement>(null);
  const buttonPrevRef = React.useRef<HTMLDivElement>(null);
  const buttonNextRef = React.useRef<HTMLDivElement>(null);
  const [itemRefs, setItemRefs] = React.useState<React.RefObject<HTMLDivElement>[]>([]);
  const [itemsWidth, setItemsWidth] = React.useState<number[]>([]);
  const [carouselPosition, setCarouselPosition] = React.useState<number>(0);
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
        console.log(holder.scrollLeft);
        setCarouselPosition( holder.scrollLeft );
        
        //FIXME: set index base on scrollLeft
        const stepsLengthArr: number[] = [];//these are the actual number to move 
        let __position = props.gap;
        stepsLengthArr.push(__position);
        for(let i = 0; i<itemAmount-1; i++) {
          __position = __position + itemsWidth[i] + props.gap;
          stepsLengthArr.push(__position);
        }
        let __tempIndex:number = 0;
        for(let i=0; i<stepsLengthArr.length; i++) {
          if(holder && (holder.scrollLeft >= stepsLengthArr[i])) {
            __tempIndex = i;
          }
        }
        setCurrentSliderIndex(__tempIndex);
        console.log('__tempIndex: '+__tempIndex);

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
    if(props.componentWidth === 0) {
      setContainerWidth(0);
    } else {
      setContainerWidth(props.componentWidth);
    }
  },[containerWidth, props.componentWidth]);
  const debounce = (func: () =>void, wait = 1000) => {
    let h:number;
    return () => {
      clearTimeout(h);
      h = setTimeout(()=>func(), wait);
    }
  };
  // change container width when window resize
  const resizeHandler = React.useCallback(// keep the function instance the same between renders
      debounce(()=>{
        let __containerWidth : number = containerRef.current ? Number(containerRef.current.offsetWidth.toString().replace('px', '')) : 0;
        setContainerWidth(__containerWidth);
        console.log(__containerWidth);
      }, 1000),
      []
  );
  React.useEffect(() => {//set containerWidth on window resize
    // DONE: set containerWidth on window resize
    // Don't apply [] to this useEffect, otherwise offsetWidth will not equal to the real width after first render
    let _containerWidth : number = containerRef.current ? Number(containerRef.current.offsetWidth.toString().replace('px', '')) : 0;
    setContainerWidth(_containerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  },[containerWidth]);
  React.useEffect(() => {// set item amount
    if(props.isImageElement && props.imgUrlArray) {
      setItemAmount(props.imgUrlArray?.length);
    } else if (props.isDivElement) {
      setItemAmount(React.Children.count(props.children));
    }
  },[props.isImageElement,props.imgUrlArray,props.isDivElement,props.children]);
  const mouseEnterHandler = () => {//mouse over container bring up buttons
    if(null !== buttonPrevRef.current && null !== buttonNextRef.current) {
      const buttonPrev = buttonPrevRef.current;
      const buttonNext = buttonNextRef.current;
      setIsCarouselPaused(true);
      // hide buttons
      // buttonPrev.style.display = 'grid';
      // buttonNext.style.display = 'grid';
    }
  };
  const mouseLeaveHandler = () => {//mouse over container hide buttons
    if(null !== buttonPrevRef.current && null !== buttonNextRef.current) {
      const buttonPrev = buttonPrevRef.current;
      const buttonNext = buttonNextRef.current;
      setIsCarouselPaused(false);
      buttonPrev.style.display = 'none';
      buttonNext.style.display = 'none';
    }
  }
  const prevButtonClickHandler = () => {
    // console.log('prev');
    if(currentSliderIndex === 0) {
      //reached the first slide
      //do nothing
    } else {
      setCurrentSliderIndex(currentSliderIndex - 1);
    }
  };
  const nextButtonClickHandler = () => {
    console.log('next');
    if(currentSliderIndex === itemAmount) {
      //reached the last slide
      //do nothing
    } else {
      setCurrentSliderIndex(currentSliderIndex + 1);
    }
  };
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
  React.useEffect(() => { // move the slide automatically or by clicking the buttons. Not swap or drag
    //TODO:
    //take the current slide index and display it
    const auto_interval = 2000; //interval 
    const holder = imagesHolderRef.current;
    const stepsLengthArr: number[] = [];//these are the actual number to move 
    let __position = props.gap;
    const carouselWidth = props.gap + itemsWidth.reduce((acc, cur) => { return acc+cur+props.gap}, 0) - props.gap; // left margin include, but subtract the right margin
    const positionLeftLimit = carouselWidth - containerWidth - props.gap; //going to assign it with carouselWidth - containerWidth, but the result is missing one gap, compare to the real circumstance 
    stepsLengthArr.push(__position);
    for(let i = 0; i<itemAmount-1; i++) {
      __position = __position + itemsWidth[i] + props.gap;
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
    console.log('currentPosition: '+currentPosition);
    if(holder && !isCarouselPaused) {
      holder.scrollLeft = currentPosition;
    }

    // if is paused then pause
    // if is not paused
      //auto increase current slide index by 1 until reach the end then go back to 0
    const nIntervalId = setInterval(() => {
      if(isCarouselPaused) {
        //pause carousel
        console.log('paused');
      } else {
        // console.log(currentSliderIndex);
        if(currentSliderIndex === (itemAmount - 1)) {
          if(__temp) { 
            setCurrentSliderIndex(0);
          } else {
            //do nothing
          }
        } else {
          setCurrentSliderIndex(currentSliderIndex + 1);
        }
      }
    }, auto_interval);

    return () => clearInterval(nIntervalId);
  },[containerWidth, itemsWidth, currentSliderIndex, carouselPosition, props.gap, itemAmount, isCarouselPaused]);
  //  NOTE: using componentWidth control carousel width, if componentWidth = 0, layout becomes accordion like, container width = 100%
  //  DONE: under accordion layout, should have other variables control round corner and margin in-between
  //  
  /** steps
   * 1. pass in div element DONE: currently, only handles div > img 
   * 2. pass in img urls as array DONE: create singleElement.tsx
   * 3. pass in url array including videos TODO: import video array
   *        1. string[] => treat as image array
   *            1. NOTE: pure image array, reconsider how to present different size image
   *        2. object[] => { itemType:'img | video | div | text', url:'https://your-website-url'  }
   * 4. TODO: when not full width slider container width < sliderWidthSum should turn to full width slider
   * 5. TODO: when full width, should display 100% width image, change height accordingly
   * 6. auto rotate TODO:
   * 7. add link to image TODO:, meanwhile add tooltip
   * 8. DONE: touch screen
   * 9. TODO: offer option to set better prev&next button
   * 
   */

  return (
      <Styled.Container ref={containerRef as any} 
      // styled-components won't pass ref T.T 
      //https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
                        componentWidth={containerWidth} 
                        componentHeight={props.componentHeight}
                        onMouseEnter = {() => mouseEnterHandler()}
                        onMouseLeave = {() => mouseLeaveHandler()}
                        >
        <Styled.ButtonPrev ref={buttonPrevRef  as any} 
                            color='#e31b23'
                            onClick={() => prevButtonClickHandler()}>{'<'}</Styled.ButtonPrev>
        <Styled.ButtonNext ref={buttonNextRef  as any} 
                            color='#e31b23'
                            onClick={() => nextButtonClickHandler()}>{'>'}</Styled.ButtonNext>
        <Styled.ImagesHolder ref={imagesHolderRef  as any} componentWidth={containerWidth} gap={props.gap}>
          {
            props.isImageElement && props.imgUrlArray ? props.imgUrlArray.map((x, index) => {
              return <SingleElement isDivElement={props.isDivElement} 
                                    isImageElement={props.isImageElement} 
                                    isFullWidthElement={props.isFullWidthItem} 
                                    imgUrl={x}
                                    imgAlt={''}
                                    gap={props.gap}
                                    roundCorner={props.roundCorner}
                                    key={index}
                                    _ref={itemRefs[index]}
                      ></SingleElement>
            }) : (props.isDivElement && props.children ? React.Children.map(props.children, (child: React.ReactElement, index: number) => {
              return (
                <SingleElement isDivElement={props.isDivElement} 
                              isImageElement={props.isImageElement} 
                              isFullWidthElement={props.isFullWidthItem}
                              gap={props.gap}
                              minWidth={props.divElementMinWidth}
                              roundCorner={props.roundCorner}
                              _ref={itemRefs[index]}>
                                
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