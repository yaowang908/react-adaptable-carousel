/* eslint-disable consistent-return */
import React from 'react';

import SingleElement from './SingleElement';
// import debounce from '../lib/debounce';
// import { scrollTo } from '../lib/smoothScrollTo';
import { Styled } from './CarouselQueue.style';

/**
 * @param { object } themeColor - Carousel Theme color, including prev/next buttons and scroll bar
 *  @param { string } themeColor.reminder - reminder color
 *  @param { string } themeColor.reminderTxt - reminder Text Color
 * @param { object } [reminder] - both ends reminder
 *  @param { string } [reminder.firstTxt = 'First One'] - text on the reminder for first one, default first one
 *  @param { string } [reminder.lastTxt = 'Last One'] - text on the reminder for last one, default last one
 * @param { boolean } [componentHeight = 'auto'] - height of the Carousel,
 * @param { number } gap - space between children
 * @param { number } [roundCorner = 0] - round corner of child element
 * @param { boolean } isDivElement - if the children are div element
 * @param { array } [imgUrlArray] - if not div elements, imgUrlArray has to be set
 * @param { number } [divElementMinWidth] - if div element, need to set divElementMinWidth
 */

interface Props {
  themeColor: { reminder: string; reminderTxt: string };
  reminder: { firstTxt: string; lastTxt: string };
  componentHeight?: number;
  gap: number; // gap is necessary
  roundCorner?: number;
  isDivElement: boolean;
  imgUrlArray?: { imgUrl: string; link?: string }[];
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

  const {
    themeColor,
    reminder,
    componentHeight,
    gap,
    roundCorner,
    isDivElement,
    imgUrlArray,
    divElementMinWidth,
    children,
  } = props;
  // const [itemsWidth, setItemsWidth] = React.useState<number[]>([]);
  // const [itemAmount, setItemAmount] = React.useState<number>(0);
  // const [isCarouselPaused, setIsCarouselPaused] = React.useState<boolean>(false);
  // const [itemRefs, setItemRefs] = React.useState<React.RefObject<HTMLDivElement>[]>([]);
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
      }
      console.error('Div Elements must have minWidth');
    }
  };

  if (imgUrlArray) {
    return (
      <Styled.Container>
        <Styled.ImagesHolderBefore
          ref={imagesHolderBeforeRef}
          gap={gap}
          show={imageHolderBeforeVisibility}
          color={setColor('reminderTxt')}
          colorBg={setColor('reminder')}
        >
          {reminderContent('firstTxt')}
        </Styled.ImagesHolderBefore>
        <Styled.ImagesHolder ref={imagesHolderRef} gap={gap}>
          {imgUrlArray.map((x, index) => {
            return (
              <SingleElement
                isDivElement={isDivElement}
                isImageElement
                isFullWidthElement={false}
                imgUrl={x.imgUrl}
                link={x.link}
                imgAlt=""
                gap={gap || 0}
                height={componentHeight}
                roundCorner={roundCorner || 0}
                key={index}
              />
            );
          })}
        </Styled.ImagesHolder>
        <Styled.ImagesHolderAfter
          ref={imagesHolderAfterRef}
          gap={gap}
          show={imageHolderAfterVisibility}
          color={setColor('reminderTxt')}
          colorBg={setColor('reminder')}
        >
          {reminderContent('lastTxt')}
        </Styled.ImagesHolderAfter>
      </Styled.Container>
    );
  }
  return (
    <Styled.Container>
      <Styled.ImagesHolderBefore
        ref={imagesHolderBeforeRef}
        gap={gap}
        show={imageHolderBeforeVisibility}
        color={setColor('reminderTxt')}
        colorBg={setColor('reminder')}
      >
        {reminderContent('firstTxt')}
      </Styled.ImagesHolderBefore>
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
                  >
                    {child}
                  </SingleElement>
                );
              }
            )
          : 'Please set imgUrlArray or children'}
      </Styled.ImagesHolder>
      <Styled.ImagesHolderAfter
        ref={imagesHolderAfterRef}
        gap={gap}
        show={imageHolderAfterVisibility}
        color={setColor('reminderTxt')}
        colorBg={setColor('reminder')}
      >
        {reminderContent('lastTxt')}
      </Styled.ImagesHolderAfter>
    </Styled.Container>
  );
};

export default CarouselQueue;
