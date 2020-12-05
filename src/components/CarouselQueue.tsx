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
  // const containerRef = React.useRef<HTMLDivElement>(null);
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
  const [slideRefs, setSlideRefs] = React.useState<
    React.RefObject<HTMLDivElement>[]
  >([]);
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

  // DONE: 1. drag function
  React.useEffect(() => {
    // handler drag move carousel
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
        } else if (holder.scrollLeft <= gap) {
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
  // remove auto scroll function in Queue
  // DONE: 2. when scroll to the end
  /**
   * next drag would enable a block indicate this is the end
   * when mouse up the block will snap back
   */
  React.useEffect(() => {
    // both end reminder
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

  React.useEffect(() => {
    // DONE: when reaching ends disable buttons
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

  React.useEffect(() => {
    // initialize slideRefs
    let _tempLength = 0;
    _tempLength = urlArray?.length || 0;
    if (isDivElement) _tempLength = React.Children.toArray(children).length;
    setSlideRefs((slideRefs) =>
      Array(_tempLength)
        .fill(0)
        .map(
          (_, i) =>
            slideRefs[i] || React.createRef<React.RefObject<HTMLDivElement>>()
        )
    );
  }, []);

  const getSlidesPosition = () => {
    // slidesPositions [left, width]
    const _slidesPositions: Array<
      [number | undefined, number | undefined]
    > = [];
    slideRefs.map((x) => {
      _slidesPositions.push([x?.current?.offsetLeft, x?.current?.offsetWidth]);
      return <></>;
    });
    console.log(_slidesPositions);
    return _slidesPositions;
  };

  const resizeHandler = _.debounce(() => {
    setSlidesPosition(getSlidesPosition());
  }, 500);

  React.useEffect(() => {
    // set slidesPosition on window resize
    // DONE: set containerWidth on window resize
    // Don't apply [] to this useEffect, otherwise offsetWidth will not equal to the real width after first render
    // setSlidesPosition(getSlidesPosition());
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [slideRefs]);

  React.useEffect(() => {
    setSlidesPosition(getSlidesPosition());
  }, [currentFirstIndex, slideRefs]);

  React.useEffect(() => {
    // get current first card's index
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

  React.useEffect(() => {
    // set holder scroll left base on index
    const holder = imagesHolderRef.current;
    if (slidesPosition && slidesPosition[currentFirstIndex] && holder) {
      const targetScrollLeft = slidesPosition[currentFirstIndex][0];
      if (targetScrollLeft) holder.scrollLeft = targetScrollLeft;
      setHolderScrollLeft(holder.scrollLeft);
    }
    // console.log('set holder scroll left base on index');
  }, [currentFirstIndex]);

  React.useEffect(() => {
    // handle prev button
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
  }, [slideRefs, slidesPosition, currentFirstIndex]);
  React.useEffect(() => {
    // handle next button
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
  }, [slideRefs, slidesPosition, currentFirstIndex]);

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
    if (buttonText) {
      if (buttonText.isImageBg && buttonText[param].length >= 4) {
        return <img src={buttonText[param]} alt={param} />;
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

    if (themeColor && themeColor[param]) {
      if (/^#([0-9A-F]{3}){1,2}$/i.test(themeColor[param])) {
        // valid hex color
        return themeColor[param];
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

    if (themeColor && themeColor[param]) {
      if (/^#([0-9A-F]{3}){1,2}$/i.test(themeColor[param])) {
        // valid hex color
        return themeColor[param];
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
    if (reminder && reminder[param]) {
      return reminder[param];
    }
    return tempBtn[param];
  };
  const setDivMinWidth = () => {
    if (isDivElement) {
      if (divElementMinWidth) {
        return divElementMinWidth;
      } else {
        console.error('Div Elements must have minWidth');
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  if (urlArray) {
    return (
      <Styled.Container
        onMouseEnter={() => mouseEnterHandler()}
        onMouseLeave={() => mouseLeaveHandler()}
      >
        {buttonText?.showButton ? (
          <>
            <Button.Prev
              ref={prevButtonRef as any}
              imageButton={buttonText?.isImageBg ? buttonText.isImageBg : false}
              colorTxt={setButtonColor('buttonText')}
              colorBg={setButtonColor('button')}
              buttonWidth={buttonText ? buttonText.buttonWidth : 20}
              buttonHeight={buttonText ? buttonText.buttonHeight : 100}
            >
              {buttonContent('prev')}
            </Button.Prev>
            <Button.Next
              ref={nextButtonRef as any}
              imageButton={buttonText?.isImageBg ? buttonText.isImageBg : false}
              colorTxt={setButtonColor('buttonText')}
              colorBg={setButtonColor('button')}
              buttonWidth={buttonText ? buttonText.buttonWidth : 20}
              buttonHeight={buttonText ? buttonText.buttonHeight : 100}
            >
              {buttonContent('next')}
            </Button.Next>
          </>
        ) : (
          <></>
        )}
        {reminder?.showReminder ? (
          <Styled.ImagesHolderBefore
            ref={imagesHolderBeforeRef}
            gap={gap}
            show={imageHolderBeforeVisibility}
            color={setColor('reminderTxt')}
            colorBg={setColor('reminder')}
          >
            {reminderContent('firstTxt')}
          </Styled.ImagesHolderBefore>
        ) : (
          <></>
        )}
        <Styled.ImagesHolder ref={imagesHolderRef} gap={gap}>
          {urlArray.map((x, index) => {
            return (
              <SingleElement
                isDivElement={isDivElement}
                isImageElement
                isVideoElement={x.isVideo ? x.isVideo : false}
                minWidth={x.isVideo ? 400 : 0}
                isFullWidthElement={false}
                url={x.url}
                link={x.link}
                imgAlt=""
                gap={gap || 0}
                height={componentHeight}
                roundCorner={roundCorner || 0}
                key={index}
                _ref={slideRefs[index] as any}
              />
            );
          })}
        </Styled.ImagesHolder>
        {reminder?.showReminder ? (
          <Styled.ImagesHolderAfter
            ref={imagesHolderAfterRef}
            gap={gap}
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
    >
      {buttonText?.showButton ? (
        <>
          <Button.Prev
            ref={prevButtonRef as any}
            imageButton={buttonText?.isImageBg ? buttonText.isImageBg : false}
            colorTxt={setButtonColor('buttonText')}
            colorBg={setButtonColor('button')}
            buttonWidth={buttonText ? buttonText.buttonWidth : 20}
            buttonHeight={buttonText ? buttonText.buttonHeight : 100}
          >
            {buttonContent('prev')}
          </Button.Prev>
          <Button.Next
            ref={nextButtonRef as any}
            imageButton={buttonText?.isImageBg ? buttonText.isImageBg : false}
            colorTxt={setButtonColor('buttonText')}
            colorBg={setButtonColor('button')}
            buttonWidth={buttonText ? buttonText.buttonWidth : 20}
            buttonHeight={buttonText ? buttonText.buttonHeight : 100}
          >
            {buttonContent('next')}
          </Button.Next>
        </>
      ) : (
        <></>
      )}
      {reminder?.showReminder ? (
        <Styled.ImagesHolderBefore
          ref={imagesHolderBeforeRef}
          gap={gap}
          show={imageHolderBeforeVisibility}
          color={setColor('reminderTxt')}
          colorBg={setColor('reminder')}
        >
          {reminderContent('firstTxt')}
        </Styled.ImagesHolderBefore>
      ) : (
        <></>
      )}
      <Styled.ImagesHolder ref={imagesHolderRef} gap={gap}>
        {isDivElement && children
          ? React.Children.map(
              children as any,
              (child: React.ReactElement, index: number) => {
                return (
                  <SingleElement
                    isDivElement={isDivElement}
                    key={index}
                    isImageElement={false}
                    isFullWidthElement={false}
                    gap={gap || 0}
                    height={componentHeight}
                    minWidth={setDivMinWidth()} // full width div item don't care
                    roundCorner={roundCorner || 0}
                    _ref={slideRefs[index] as any}
                  >
                    {child}
                  </SingleElement>
                );
              }
            )
          : 'Please set urlArray or children'}
      </Styled.ImagesHolder>
      {reminder?.showReminder ? (
        <Styled.ImagesHolderAfter
          ref={imagesHolderAfterRef}
          gap={gap}
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
