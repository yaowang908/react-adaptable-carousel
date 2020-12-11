/* eslint-disable no-else-return */
import React from 'react';
import _ from 'lodash';

import SingleElement from './SingleElement';
// import debounce from '../lib/debounce';
// import { scrollTo } from '../lib/smoothScrollTo';
import { Styled } from './CarouselQueue.style';
import { Button } from './Button.style';
import { tabletDelimiter } from '../lib/customMediaQuery';

/**
 * @param { object } themeColor - Carousel Theme color, including prev/next buttons and scroll bar
 *  @param { string } themeColor.reminder - reminder color
 *  @param { string } themeColor.reminderTxt - reminder Text Color
 * @param { object } [reminder] - both ends reminder
 *  @param { boolean } [showReminder = true] - whether to show reminder
 *  @param { string } [reminder.firstTxt = 'First One'] - text on the reminder for first one, default first one
 *  @param { string } [reminder.lastTxt = 'Last One'] - text on the reminder for last one, default last one
 * @param { boolean } [componentHeight = 'auto'] - height of the Carousel,
 * @param { object } [buttonText] - buttons text
 *  @param { boolean } [showButton = true] - whether show buttons
 *  @param { number } [buttonWidth = 20] - button width
 *  @param { number } [buttonHeight = 100] - button height
 *  @param { boolean } [buttonText.isImageBg = false] - whether take image as background, image size should be 40 x 100
 *  @param { string } [buttonText.prev = '<'] - prev button text / img src
 *  @param { string } [buttonText.next = '>'] - next button text / img src
 * @param { number } gap - space between children
 * @param { number } [roundCorner = 0] - round corner of child element
 * @param { boolean } isDivElement - if the children are div element
 * @param { array } [urlArray] - if not div elements, urlArray has to be set
 * @param { number } [divElementMinWidth] - if div element, need to set divElementMinWidth
 */

interface Props {
  themeColor: { reminder: string; reminderTxt: string };
  reminder: { showReminder: boolean; firstTxt: string; lastTxt: string };
  buttonText?: {
    showButton: boolean;
    buttonWidth: number;
    buttonHeight: number;
    isImageBg: boolean;
    prev: string;
    next: string;
  };
  componentHeight?: number;
  gap: number; // gap is necessary
  roundCorner?: number;
  isDivElement: boolean;
  urlArray?: { url: string; link?: string; isVideo?: boolean }[];
  divElementMinWidth?: number;
}

interface Position {
  position: 'left-end' | 'right-end' | 'middle';
}

// TODO: fixed amount children(not exactly!!!)
/**
 * when imageHolder is shorter than container
 * e.g.: only have one slide, but the container is ready to show 2
 * solution: imageHolder occupy 100%, hold the elements as normal
 *
 */

const CarouselQueue: React.FC<Props> = (props) => {
  // const [containerWidth, setContainerWidth] = React.useState<number>(0);
  // const [currentSliderIndex, setCurrentSliderIndex] = React.useState<number>(0);
  const [carouselPosition, setCarouselPosition] = React.useState<Position>({
    position: 'left-end',
  });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderBeforeRef = React.useRef<HTMLDivElement>(null);
  const imagesHolderAfterRef = React.useRef<HTMLDivElement>(null);
  const [
    imageHolderBeforeVisibility,
    setImageHolderBeforeVisibility,
  ] = React.useState<boolean>(false);
  const [
    imageHolderAfterVisibility,
    setImageHolderAfterVisibility,
  ] = React.useState<boolean>(false);
  const prevButtonRef = React.useRef<HTMLButtonElement>(null);
  const nextButtonRef = React.useRef<HTMLButtonElement>(null);
  // const [slideRefs, setSlideRefs] = React.useState<
  //   Array<(ele: HTMLElement) => void>
  // >([]);
  const [slidesPosition, setSlidesPosition] = React.useState<
    Array<[number | undefined, number | undefined]>
  >();
  const [currentFirstIndex, setCurrentFirstIndex] = React.useState(0);
  const [holderScrollLeft, setHolderScrollLeft] = React.useState(0);

  const {
    themeColor,
    reminder,
    buttonText,
    componentHeight,
    gap,
    roundCorner,
    isDivElement,
    urlArray,
    divElementMinWidth,
    children,
  } = props;

  const [thisUrlArray, setThisUrlArray] = React.useState(
    urlArray || [{ url: '', link: '', isVideo: false }]
  );
  const [thisThemeColor, setThisThemeColor] = React.useState(
    themeColor || { reminder: '', reminderTxt: '' }
  );
  const [thisReminder, setThisReminder] = React.useState(
    reminder || {
      showReminder: true,
      firstTxt: 'First One',
      lastTxt: 'Last One',
    }
  );
  const [thisButtonText, setThisButtonText] = React.useState(
    buttonText || {
      showButton: false,
      buttonWidth: 20,
      buttonHeight: 40,
      isImageBg: false,
      prev: '<',
      next: '>',
    }
  );
  const [thisComponentHeight, setThisComponentHeight] = React.useState(
    componentHeight || 0
  );
  const [thisGap, setThisGap] = React.useState(gap);
  const [thisRoundCorner, setThisRoundCorner] = React.useState(
    roundCorner || 12
  );
  const [thisIsDivElement, setThisIsDivElement] = React.useState(
    isDivElement || false
  );
  const [thisDivElementMinWidth, setThisDivElementMinWidth] = React.useState(
    divElementMinWidth || 200
  );
  const [thisChildren, setThisChildren] = React.useState(children);

  // const [slidesBoundingInfo, setSlidesBoundingInfo] = React.useState({});

  // set new state when get new prop
  React.useEffect(() => {
    if (props.urlArray) setThisUrlArray(props.urlArray);
    if (props.themeColor) setThisThemeColor(props.themeColor);
    if (props.reminder) setThisReminder(props.reminder);
    if (props.buttonText) setThisButtonText(props.buttonText);
    if (props.componentHeight) setThisComponentHeight(props.componentHeight);
    if (props.gap) setThisGap(props.gap);
    if (props.roundCorner) setThisRoundCorner(props.roundCorner);
    if (props.isDivElement) setThisIsDivElement(props.isDivElement);
    if (props.divElementMinWidth)
      setThisDivElementMinWidth(props.divElementMinWidth);
    if (props.children) setThisChildren(props.children);
  }, [props]);
  // handler drag move carousel
  React.useEffect(() => {
    if (imagesHolderRef.current !== null) {
      const holder = imagesHolderRef.current;
      holder.style.cursor = 'grab';
      let pos = { top: 0, left: 0, x: 0, y: 0 };
      const mouseDownHandler = (e: MouseEvent) => {
        e.stopPropagation();
        // console.log('Mouse down');
        holder.style.cursor = 'grabbing';
        holder.style.userSelect = 'none';
        holder.style.removeProperty('scroll-snap-type');
        holder.style.margin = '0'; // scroll snap will conflict with preset margin

        pos = {
          left: holder.scrollLeft,
          top: holder.scrollTop,
          x: e.clientX,
          y: e.clientY,
        };

        holder.addEventListener('mousemove', mouseMoveHandler);
        holder.addEventListener('mouseup', mouseUpHandler);
      };
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
        // console.log('ScrollLeft: '+holder.scrollLeft);
        // console.log('width: '+holder.offsetWidth);
        // console.log('ScrollWidth: '+holder.scrollWidth);
        if (holder.scrollWidth - holder.offsetWidth <= holder.scrollLeft) {
          setCarouselPosition({ position: 'right-end' });
        } else if (holder.scrollLeft <= thisGap) {
          setCarouselPosition({ position: 'left-end' });
        } else {
          setCarouselPosition({ position: 'middle' });
        }
        setHolderScrollLeft(holder.scrollLeft);
        const _tempIndexArray = slidesPosition
          ?.map((x, index) => {
            if (x[0] === holder.scrollLeft) {
              return index;
            }
            if (index === 0 && holder.scrollLeft === 0) {
              return 0;
            }
            return null;
          })
          .filter((x) => x !== null);
        const _currentFirstIndex = _tempIndexArray ? _tempIndexArray[0] : 0;
        if (_currentFirstIndex) setCurrentFirstIndex(_currentFirstIndex);
        holder.removeEventListener('mousemove', mouseMoveHandler);
        holder.removeEventListener('mouseup', mouseUpHandler);
      };
      holder.addEventListener('mousedown', mouseDownHandler);
      return () => {
        holder.removeEventListener('mousedown', mouseDownHandler);
        holder.removeEventListener('mousemove', mouseMoveHandler);
        holder.removeEventListener('mouseup', mouseUpHandler);
      };
    } else {
      return () => {};
    }
  }, [slidesPosition]);
  // both end reminder
  React.useEffect(() => {
    const _before = imagesHolderBeforeRef.current;
    const _after = imagesHolderAfterRef.current;
    // console.log('ScrollLeft: '+holder.scrollLeft);
    // console.log('width: '+holder.offsetWidth);
    // console.log('ScrollWidth: '+holder.scrollWidth);
    if (_before && _after) {
      if (carouselPosition.position === 'left-end') {
        setImageHolderBeforeVisibility(true);
        setTimeout(() => {
          setImageHolderBeforeVisibility(false);
        }, 2000);
      } else if (carouselPosition.position === 'right-end') {
        setImageHolderAfterVisibility(true);
        setTimeout(() => {
          setImageHolderAfterVisibility(false);
        }, 2000);
      } else {
        setImageHolderAfterVisibility(false);
        setImageHolderBeforeVisibility(false);
      }
    }
  }, [carouselPosition]);

  // when reaching ends disable buttons
  React.useEffect(() => {
    if (prevButtonRef.current && nextButtonRef.current) {
      const prevButton = prevButtonRef.current;
      const nextButton = nextButtonRef.current;
      if (carouselPosition.position === 'left-end') {
        // left end, disable prev
        prevButton.style.filter = 'grayscale(1)';
        prevButton.style.cursor = 'not-allowed';
      } else if (carouselPosition.position === 'right-end') {
        // right end, disable next
        nextButton.style.filter = 'grayscale(1)';
        nextButton.style.cursor = 'not-allowed';
      } else {
        prevButton.style.filter = 'none';
        nextButton.style.filter = 'none';
        prevButton.style.cursor = 'pointer';
        nextButton.style.cursor = 'pointer';
      }
    }
  }, [carouselPosition]);

  // initialize slideRefs
  // React.useEffect(() => {
  //   let _tempLength = 0;
  //   _tempLength = thisUrlArray?.length || 0;
  //   if (thisIsDivElement)
  //     _tempLength = React.Children.toArray(thisChildren).length;
  //   setSlideRefs((slideRefs) =>
  //     Array(_tempLength)
  //       .fill(0)
  //       .map(
  //         (_, i) =>
  //           slideRefs[i] || React.createRef<React.RefObject<HTMLDivElement>>()
  //       )
  //   );
  // }, [thisUrlArray]);

  // initialize callback refs
  // measure children with callback refs
  let _tempLength = 0;
  if (thisUrlArray[0].url) {
    // thisUrlArray has a default value {url:"",link:"", isVideo:false}
    _tempLength = thisUrlArray.length;
  } else if (React.Children) {
    _tempLength = React.Children.toArray(thisChildren).length;
  }
  let slidesBoundingInfo = {};
  let offsetLeftWidthInfo = {};
  // console.dir(thisUrlArray);
  const callbackRefsArray = Array(_tempLength)
    .fill(0)
    .map((_, i) => {
      // console.dir('This is a callback ref');
      return (ele) => {
        const thisIndex = i;
        if (ele) {
          // console.dir(ele);
          // console.dir(ele.offsetLeft);
          offsetLeftWidthInfo = {
            ...offsetLeftWidthInfo,
            [thisIndex]: [ele.offsetLeft, ele.offsetWidth],
          };
          slidesBoundingInfo = {
            ...slidesBoundingInfo,
            [thisIndex]: ele.getBoundingClientRect(),
          };
          // console.log(`Number ${thisIndex} is added!`);
        }
      };
    });
  // console.dir(callbackRefsArray);

  React.useEffect(() => {
    const _tempSlidesPosition: Array<[number, number]> = Array(
      Object.keys(offsetLeftWidthInfo).length
    )
      .fill([0, 0])
      .map((_, index) => {
        return [offsetLeftWidthInfo[index][0], offsetLeftWidthInfo[index][1]];
      });
    // console.dir(_tempSlidesPosition);
    setSlidesPosition(_tempSlidesPosition);
  }, [thisUrlArray]);

  const resizeHandler = _.debounce(() => {
    // setSlidesPosition(getSlidesPosition());
    setSlidesPosition([]);
  }, 500);

  // set slidesPosition on window resize
  React.useEffect(() => {
    // set containerWidth on window resize
    // Don't apply [] to this useEffect, otherwise offsetWidth will not equal to the real width after first render
    const _tempSlidesPosition: Array<[number, number]> = Array(
      Object.keys(offsetLeftWidthInfo).length
    )
      .fill([0, 0])
      .map((_, index) => {
        return [offsetLeftWidthInfo[index][0], offsetLeftWidthInfo[index][1]];
      });
    // console.dir(_tempSlidesPosition);
    setSlidesPosition(_tempSlidesPosition);
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  React.useEffect(() => {
    setSlidesPosition([]);
    // console.dir(slidesBoundingInfo);
  }, [currentFirstIndex, thisUrlArray]);

  // get current first card's index
  React.useEffect(() => {
    const _tempIndexArray = slidesPosition
      ?.map((x, index) => {
        if (x[0] === holderScrollLeft) {
          return index;
        }
        if (index === 0 && holderScrollLeft === 0) {
          return 0;
        }
        return null;
      })
      .filter((x) => x !== null);
    const _currentFirstIndex = _tempIndexArray ? _tempIndexArray[0] : 0;
    if (_currentFirstIndex) setCurrentFirstIndex(_currentFirstIndex);
  }, []);

  // set holder scroll left base on index
  React.useEffect(() => {
    const _tempSlidesPosition: Array<[number, number]> = Array(
      Object.keys(offsetLeftWidthInfo).length
    )
      .fill([0, 0])
      .map((_, index) => {
        return [offsetLeftWidthInfo[index][0], offsetLeftWidthInfo[index][1]];
      });

    const holder = imagesHolderRef.current;
    // console.dir(_tempSlidesPosition);
    if (
      _tempSlidesPosition &&
      _tempSlidesPosition[currentFirstIndex] &&
      holder
    ) {
      const targetScrollLeft = _tempSlidesPosition[currentFirstIndex][0];
      if (targetScrollLeft) holder.scrollLeft = targetScrollLeft;
      setHolderScrollLeft(holder.scrollLeft);
    }
    // console.log('set holder scroll left base on index');
  }, [currentFirstIndex]);

  // handle prev button
  React.useEffect(() => {
    if (prevButtonRef.current !== null && imagesHolderRef.current !== null) {
      const prevButton = prevButtonRef.current;
      const holder = imagesHolderRef.current;
      const mouseDownHandler = (e: MouseEvent) => {
        e.stopPropagation();
        let _currentFirstIndex = currentFirstIndex;
        if (holder.scrollWidth - holder.offsetWidth <= holder.scrollLeft) {
          setCarouselPosition({ position: 'right-end' });
          // keep moving
          _currentFirstIndex -= 1;
        } else if (_currentFirstIndex === 0) {
          setCarouselPosition({ position: 'left-end' });
          // reaching left end, do nothing
        } else {
          setCarouselPosition({ position: 'middle' });
          // keep moving
          _currentFirstIndex -= 1;
          if (_currentFirstIndex === 0)
            setCarouselPosition({ position: 'left-end' });
        }
        setCurrentFirstIndex(_currentFirstIndex);
      };
      prevButton.addEventListener('mousedown', mouseDownHandler);
      return () => {
        prevButton.removeEventListener('mousedown', mouseDownHandler);
      };
    } else {
      return () => {};
    }
  }, [slidesPosition, currentFirstIndex]);
  // handle next button
  React.useEffect(() => {
    if (nextButtonRef.current !== null && imagesHolderRef.current !== null) {
      const nextButton = nextButtonRef.current;
      const holder = imagesHolderRef.current;
      const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        // console.log(`currentFirstIndex: ${currentFirstIndex}`);
        let _currentFirstIndex = currentFirstIndex;
        if (holder.scrollLeft >= holder.scrollWidth - holder.offsetWidth) {
          setCarouselPosition({ position: 'right-end' });
          // reaching right end, do nothing
          // console.dir('right-end');
        } else if (_currentFirstIndex === 0) {
          // keep moving
          _currentFirstIndex += 1;
          setCarouselPosition({ position: 'middle' });
        } else {
          // console.dir('middle');
          setCarouselPosition({ position: 'middle' });
          // keep moving
          _currentFirstIndex += 1;
        }
        // console.log(`_currentFirstIndex: ${_currentFirstIndex}`);
        setCurrentFirstIndex(_currentFirstIndex);
      };
      nextButton.addEventListener('click', clickHandler);
      return () => {
        nextButton.removeEventListener('click', clickHandler);
      };
    } else {
      return () => {};
    }
  }, [slidesPosition, currentFirstIndex]);

  // TODO: disable buttons when imageHolder is shorter than container
  React.useEffect(() => {
    const _tempSlidesPosition: Array<[number, number]> = Array(
      Object.keys(offsetLeftWidthInfo).length
    )
      .fill([0, 0])
      .map((_, index) => {
        return [offsetLeftWidthInfo[index][0], offsetLeftWidthInfo[index][1]];
      });
    let contentLength = 0;
    _tempSlidesPosition.map((x) => {
      contentLength = contentLength + thisGap + x[1];
      return <></>;
    });
    // console.dir(_tempSlidesPosition);
    // console.dir(imagesHolderRef.current?.offsetWidth);
    // console.dir(contentLength);
    const containerLength = imagesHolderRef.current?.offsetWidth;
    if (containerLength && contentLength < containerLength) {
      setThisButtonText({
        ...thisButtonText,
        showButton: false,
      });
    }
  }, []);

  const mouseEnterHandler = () => {
    // DONE: hide buttons when tablet
    const mql = window.matchMedia(`(max-width: ${tabletDelimiter}px)`);
    if (mql.matches) return;
    if (prevButtonRef.current && nextButtonRef.current) {
      prevButtonRef.current.style.display = 'grid';
      nextButtonRef.current.style.display = 'grid';
    }
  };
  const mouseLeaveHandler = () => {
    if (prevButtonRef.current && nextButtonRef.current) {
      prevButtonRef.current.style.display = 'none';
      nextButtonRef.current.style.display = 'none';
    }
  };
  const buttonContent = (param: 'prev' | 'next') => {
    const tempBtn = {
      prev: '<',
      next: '>',
    };
    if (thisButtonText) {
      if (thisButtonText.isImageBg && thisButtonText[param].length >= 4) {
        return <img src={thisButtonText[param]} alt={param} />;
      }
      return tempBtn[param];
    }
    return tempBtn[param];
  };
  const setColor = (param: 'reminder' | 'reminderTxt') => {
    const tempColor = {
      reminder: '#000000',
      reminderTxt: '#fff',
    };

    if (thisThemeColor && thisThemeColor[param]) {
      if (/^#([0-9A-F]{3}){1,2}$/i.test(thisThemeColor[param])) {
        // valid hex color
        return thisThemeColor[param];
      }
      console.error(`themeColor.${param} need to be valid hex color code`);
      return tempColor[param];
    }
    return tempColor[param];
  };
  const setButtonColor = (param: 'buttonText' | 'button' | 'scrollBar') => {
    const tempColor = {
      buttonText: '#fff',
      button: '#961c1c',
      scrollBar: 'darkgrey',
    };

    if (thisThemeColor && thisThemeColor[param]) {
      if (/^#([0-9A-F]{3}){1,2}$/i.test(thisThemeColor[param])) {
        // valid hex color
        return thisThemeColor[param];
      }
      console.error(`themeColor.${param} need to be valid hex color code`);
      return tempColor[param];
    }
    return tempColor[param];
  };
  const reminderContent = (param: 'firstTxt' | 'lastTxt') => {
    const tempBtn = {
      firstTxt: 'First One',
      lastTxt: 'Last One',
    };
    if (thisReminder && thisReminder[param]) {
      return thisReminder[param];
    }
    return tempBtn[param];
  };
  const setDivMinWidth = () => {
    if (thisIsDivElement) {
      if (thisDivElementMinWidth) {
        return thisDivElementMinWidth;
      } else {
        console.error('Div Elements must have minWidth');
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  if (thisUrlArray[0].url) {
    return (
      <Styled.Container
        onMouseEnter={() => mouseEnterHandler()}
        onMouseLeave={() => mouseLeaveHandler()}
        ref={containerRef}
      >
        {thisButtonText?.showButton ? (
          <>
            <Button.Prev
              ref={prevButtonRef as any}
              imageButton={
                thisButtonText?.isImageBg ? thisButtonText.isImageBg : false
              }
              colorTxt={setButtonColor('buttonText')}
              colorBg={setButtonColor('button')}
              buttonWidth={thisButtonText ? thisButtonText.buttonWidth : 20}
              buttonHeight={thisButtonText ? thisButtonText.buttonHeight : 100}
            >
              {buttonContent('prev')}
            </Button.Prev>
            <Button.Next
              ref={nextButtonRef as any}
              imageButton={
                thisButtonText?.isImageBg ? thisButtonText.isImageBg : false
              }
              colorTxt={setButtonColor('buttonText')}
              colorBg={setButtonColor('button')}
              buttonWidth={thisButtonText ? thisButtonText.buttonWidth : 20}
              buttonHeight={thisButtonText ? thisButtonText.buttonHeight : 100}
            >
              {buttonContent('next')}
            </Button.Next>
          </>
        ) : (
          <></>
        )}
        {thisReminder?.showReminder ? (
          <Styled.ImagesHolderBefore
            ref={imagesHolderBeforeRef}
            gap={thisGap}
            show={imageHolderBeforeVisibility}
            color={setColor('reminderTxt')}
            colorBg={setColor('reminder')}
          >
            {reminderContent('firstTxt')}
          </Styled.ImagesHolderBefore>
        ) : (
          <></>
        )}
        <Styled.ImagesHolder ref={imagesHolderRef} gap={thisGap}>
          {thisUrlArray.map((x, index) => {
            // console.dir(callbackRefsArray?.[index]?.toString());
            return (
              <SingleElement
                isDivElement={thisIsDivElement}
                isImageElement
                isVideoElement={x.isVideo ? x.isVideo : false}
                minWidth={x.isVideo ? 400 : 0}
                isFullWidthElement={false}
                url={x.url}
                link={x.link}
                imgAlt=""
                gap={thisGap || 0}
                height={thisComponentHeight}
                roundCorner={thisRoundCorner || 0}
                key={index}
                _ref={callbackRefsArray[index] as any}
                // _ref={(ele: any) => console.dir(ele) as any}
              />
            );
          })}
        </Styled.ImagesHolder>
        {thisReminder?.showReminder ? (
          <Styled.ImagesHolderAfter
            ref={imagesHolderAfterRef}
            gap={thisGap}
            show={imageHolderAfterVisibility}
            color={setColor('reminderTxt')}
            colorBg={setColor('reminder')}
          >
            {reminderContent('lastTxt')}
          </Styled.ImagesHolderAfter>
        ) : (
          <></>
        )}
      </Styled.Container>
    );
  }
  return (
    <Styled.Container
      onMouseEnter={() => mouseEnterHandler()}
      onMouseLeave={() => mouseLeaveHandler()}
      ref={containerRef}
    >
      {thisButtonText?.showButton ? (
        <>
          <Button.Prev
            ref={prevButtonRef as any}
            imageButton={
              thisButtonText?.isImageBg ? thisButtonText.isImageBg : false
            }
            colorTxt={setButtonColor('buttonText')}
            colorBg={setButtonColor('button')}
            buttonWidth={thisButtonText ? thisButtonText.buttonWidth : 20}
            buttonHeight={thisButtonText ? thisButtonText.buttonHeight : 100}
          >
            {buttonContent('prev')}
          </Button.Prev>
          <Button.Next
            ref={nextButtonRef as any}
            imageButton={
              thisButtonText?.isImageBg ? thisButtonText.isImageBg : false
            }
            colorTxt={setButtonColor('buttonText')}
            colorBg={setButtonColor('button')}
            buttonWidth={thisButtonText ? thisButtonText.buttonWidth : 20}
            buttonHeight={thisButtonText ? thisButtonText.buttonHeight : 100}
          >
            {buttonContent('next')}
          </Button.Next>
        </>
      ) : (
        <></>
      )}
      {thisReminder?.showReminder ? (
        <Styled.ImagesHolderBefore
          ref={imagesHolderBeforeRef}
          gap={thisGap}
          show={imageHolderBeforeVisibility}
          color={setColor('reminderTxt')}
          colorBg={setColor('reminder')}
        >
          {reminderContent('firstTxt')}
        </Styled.ImagesHolderBefore>
      ) : (
        <></>
      )}
      <Styled.ImagesHolder ref={imagesHolderRef} gap={thisGap}>
        {thisIsDivElement && thisChildren
          ? React.Children.map(
              thisChildren as any,
              (child: React.ReactElement, index: number) => {
                return (
                  <SingleElement
                    isDivElement={thisIsDivElement}
                    key={index}
                    isImageElement={false}
                    isFullWidthElement={false}
                    gap={thisGap || 0}
                    height={thisComponentHeight}
                    minWidth={setDivMinWidth()} // full width div item don't care
                    roundCorner={thisRoundCorner || 0}
                    _ref={callbackRefsArray[index] as any}
                  >
                    {child}
                  </SingleElement>
                );
              }
            )
          : 'Please set thisUrlArray or children'}
      </Styled.ImagesHolder>
      {thisReminder?.showReminder ? (
        <Styled.ImagesHolderAfter
          ref={imagesHolderAfterRef}
          gap={thisGap}
          show={imageHolderAfterVisibility}
          color={setColor('reminderTxt')}
          colorBg={setColor('reminder')}
        >
          {reminderContent('lastTxt')}
        </Styled.ImagesHolderAfter>
      ) : (
        <></>
      )}
    </Styled.Container>
  );
};

export default CarouselQueue;
