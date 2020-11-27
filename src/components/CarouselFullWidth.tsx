import React from 'react';

import SingleElement from './SingleElement';
import debounce from '../lib/debounce';
import { scrollTo } from '../lib/smoothScrollTo';
import { Styled } from './CarouselFullWidth.style';
import { Button } from './Button.style';

/**
 * @param { object } themeColor - Carousel Theme color, including prev/next buttons and scroll bar
 *  @param { string } themeColor.button - button color, hex color code
 *  @param { string } themeColor.buttonText - button Text Color, hex color code
 *  @param { string } themeColor.scrollBar - scrollbar color, hex color code
 * @param { object } [buttonText] - buttons text
 *  @param { boolean } [buttonText.isImageBg = false] - if take image as background, image size should be 40 x 100
 *  @param { string } [buttonText.prev = '<'] - prev button text / img src
 *  @param { string } [buttonText.next = '>'] - next button text / img src
 * @param { boolean } [componentHeight = 'auto'] - height of the Carousel,
 * @param { boolean } isDivElement - if the children are div element
 * @param { array } [imgUrlArray] - if not div elements, imgUrlArray has to be set
 */

interface Props {
  isDivElement: boolean;
  imgUrlArray?: {imgUrl: string, link?: string;}[];
  componentHeight?: number;// if height = null, set height to auto
  themeColor: {button: string, buttonText: string, scrollBar: string};
  buttonText?: {isImageBg: boolean, prev: string, next: string};
};

const CarouselFullWidth: React.FC<Props> = (props) => {
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [currentSliderIndex, setCurrentSliderIndex] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderRef = React.useRef<HTMLDivElement>(null);
  const [itemsWidth, setItemsWidth] = React.useState<number[]>([]);
  const [itemAmount, setItemAmount] = React.useState<number>(0);
  const [isCarouselPaused, setIsCarouselPaused] = React.useState<boolean>(false);
  const [itemRefs, setItemRefs] = React.useState<React.RefObject<HTMLDivElement>[]>([]);
  const [scrollDirection, setScrollDirection] = React.useState<number>(1);
  const prevButtonRef = React.useRef<HTMLButtonElement>(null);
  const nextButtonRef = React.useRef<HTMLButtonElement>(null);
  const [stepsLengthArr, setStepsLengthArr] = React.useState<number[]>([]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeHandler = React.useCallback(// keep the function instance the same between renders
      debounce(()=>{
        let __containerWidth : number = containerRef.current ? Number(containerRef.current.offsetWidth.toString().replace('px', '')) : 0;
        setContainerWidth(__containerWidth);
        console.log(__containerWidth);
      }, 500), []);
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
        if(currentSliderIndex === (itemAmount-1)) {
          //  right end
          // setCurrentSliderIndex(0);
          setScrollDirection(-1);
          setCurrentSliderIndex(currentSliderIndex - 1);
        } else if(currentSliderIndex === 0) {
          // left end
          setCurrentSliderIndex(currentSliderIndex + 1);
          if(scrollDirection === -1) setScrollDirection(1);
        } else {
          // middle
          setCurrentSliderIndex(currentSliderIndex + (scrollDirection * 1));
        }
        // DONE: when reach the end, instead of going to 0, go back 1 per step until 0 then go forward by 1 a time

        /**
         * 1. left end 
         *    1. d = 1 => index + 1
         *    2. d = -1 => d = 1, index +1
         * 2. middle 
         *    1. d = 1 => index + 1
         *    2. d = -1 => index - 1
         * 3. right end
         *    1. d = 1 => d = -1, index - 1
         *    2. (in theory but don't exit in reality) d = -1 => d = 1, index - 1
         */
      }
    }, auto_interval);

    return () => clearInterval(nIntervalId);
  },[currentSliderIndex, isCarouselPaused, itemAmount, scrollDirection]);
  React.useEffect(() => { //set stepsLengthArr
    const _stepsLengthArr: number[] = [];//these are the actual number to move 
    let __position = 0;
    _stepsLengthArr.push(__position);
    for(let i = 0; i<itemAmount-1; i++) {
      __position = __position + itemsWidth[i]; //__position is accumulated number not for each slide
      _stepsLengthArr.push(__position);
    }
    setStepsLengthArr(_stepsLengthArr);
  },[containerWidth, itemAmount, itemsWidth]);
  React.useEffect(() => { // move the slide automatically or by clicking the buttons. Not swap or drag
    //DONE: smooth swipe
    //take the current slide index and display it
    const holder = imagesHolderRef.current;
    
    let currentPosition: number = 0;// the number to set scrollLeft
    /**
     * NOTE: only full width carousel has auto scroll feature,
     */
    currentPosition = stepsLengthArr[currentSliderIndex];
    if(holder && !isCarouselPaused) {
      holder.style['scroll-snap-type' as any] = 'none';
      scrollTo.left(holder, holder.scrollLeft, currentPosition, 500);
    }
  },[containerWidth, itemsWidth, currentSliderIndex, itemAmount, isCarouselPaused, stepsLengthArr]);
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
    if(prevButtonRef.current && nextButtonRef.current) {
      prevButtonRef.current.style.display = 'grid';
      nextButtonRef.current.style.display = 'grid';
    }
  };
  const mouseLeaveHandler = () => {
    setIsCarouselPaused(false);
    if(prevButtonRef.current && nextButtonRef.current) {
      prevButtonRef.current.style.display = 'none';
      nextButtonRef.current.style.display = 'none';
    }
  };
  React.useEffect(() => { //set prev next buttons listeners
    if(prevButtonRef.current && nextButtonRef.current && imagesHolderRef.current) {
      const prevButton = prevButtonRef.current;
      const nextButton = nextButtonRef.current;
      const holder = imagesHolderRef.current;
      let currentPosition: number = 0;
      const prevMouseDownHandler = (e: MouseEvent) => {
        e.stopPropagation();
        if(currentSliderIndex === 0) {
          //do nothing
        } else {
          currentPosition = stepsLengthArr[currentSliderIndex - 1];
          holder.style['scroll-snap-type' as any] = 'none';
          scrollTo.left(holder, holder.scrollLeft, currentPosition, 500);
          setCurrentSliderIndex(currentSliderIndex - 1);
        }
        prevButton.addEventListener('mouseup', prevMouseUpHandler);
      };
      const prevMouseUpHandler = (e: MouseEvent) => {
        // setIsCarouselPaused(true);
        prevButton.removeEventListener('mouseup', prevMouseUpHandler);
      };

      const nextMouseDownHandler = (e: MouseEvent) => {
        e.stopPropagation();
        if(currentSliderIndex === (itemAmount - 1)) {
          //do nothing
        } else {
          // console.log('down handler => currentSliderIndex: '+currentSliderIndex);
          currentPosition = stepsLengthArr[currentSliderIndex + 1];
          holder.style['scroll-snap-type' as any] = 'none';
          scrollTo.left(holder, holder.scrollLeft, currentPosition, 500);
          setCurrentSliderIndex(currentSliderIndex + 1);
        }
        nextButton.addEventListener('mouseup', nextMouseUpHandler);
      };
      const nextMouseUpHandler = (e: MouseEvent) => {
        // setIsCarouselPaused(true);
        // console.log('up handler => currentSliderIndex: '+currentSliderIndex);
        nextButton.removeEventListener('mouseup', nextMouseUpHandler);
      };

      prevButton.addEventListener('mousedown', prevMouseDownHandler);
      nextButton.addEventListener('mousedown', nextMouseDownHandler);
      
      return () => {
        prevButton.removeEventListener('mousedown', prevMouseDownHandler);
        nextButton.removeEventListener('mousedown', nextMouseDownHandler);
        prevButton.removeEventListener('mouseup', nextMouseUpHandler);
        nextButton.removeEventListener('mouseup', nextMouseUpHandler);
      }
    }
  }, [currentSliderIndex, itemAmount, stepsLengthArr]);
  React.useEffect(() => {
    // DONE: when reaching ends disable buttons
    if(prevButtonRef.current && nextButtonRef.current) {
      const prevButton = prevButtonRef.current;
      const nextButton = nextButtonRef.current;
      if(currentSliderIndex === 0) {
        // left end, disable prev
        prevButton.style.filter = 'grayscale(1)';
        prevButton.style.cursor = 'not-allowed';
      } else if(currentSliderIndex === (itemAmount-1)) {
        //right end, disable next
        nextButton.style.filter = 'grayscale(1)';
        nextButton.style.cursor = 'not-allowed';
      } else {
        prevButton.style.filter = 'none';
        nextButton.style.filter = 'none';
        prevButton.style.cursor = 'pointer';
        nextButton.style.cursor = 'pointer';
      }
    }
  });

  const buttonContent = (param: 'prev' | 'next') => {
    const tempBtn = {
      'prev': '<',
      'next': '>'
    };
    if(props.buttonText) {
      if(props.buttonText.isImageBg && props.buttonText[param].length >= 4) {
        return <img src={props.buttonText[param]} alt={param}/>
      } else {
        return tempBtn[param];
      }
    } else {
      return tempBtn[param];
    }
  };

  const setColor = (param: 'buttonText' | 'button' | 'scrollBar') => {
    const tempColor = {
      'buttonText': '#fff',
      'button': '#961c1c',
      'scrollBar': 'darkgrey'
    };

    if (props.themeColor && props.themeColor[param]) {
      if (/^#([0-9A-F]{3}){1,2}$/i.test(props.themeColor[param])) {
        //valid hex color
        return props.themeColor[param];
      } else {
        console.error(`themeColor.${param} need to be valid hex color code`);
        return tempColor[param];
      }
    } else {
      return tempColor[param];
    }
  };

  return (
    <Styled.Container ref={containerRef as any} onMouseEnter = {() => mouseEnterHandler()} onMouseLeave = {() => mouseLeaveHandler()}>
      <Button.Prev ref={prevButtonRef as any} 
                  imageButton={props.buttonText?.isImageBg? props.buttonText.isImageBg : false }
                  colorTxt={setColor('buttonText')}
                  colorBg={setColor('button')}
                  >{buttonContent('prev')}</Button.Prev>
      <Button.Next ref={nextButtonRef as any} 
                  imageButton={props.buttonText?.isImageBg? props.buttonText.isImageBg : false }
                  colorTxt={setColor('buttonText')}
                  colorBg={setColor('button')}
                  >{buttonContent('next')}</Button.Next>
      <Styled.ImagesHolder ref={imagesHolderRef as any} 
                            colorScrollbar={setColor('scrollBar')}>
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