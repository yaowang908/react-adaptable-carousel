import React from 'react';
// import SingleElement from './SingleElement';
import './CarouselAutoScale.style.scss';

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

const CarouselAutoScale: React.FC<Props> = (props) => {
  const {
    // themeColor,
    // reminder,
    // buttonText,
    // componentHeight,
    // gap,
    // roundCorner,
    // isDivElement,
    urlArray,
    // divElementMinWidth,
    // children,
  } = props;

  // TODO: rebuild the CarouselQueue Component, new name: CarouselAutoScale
  // ...break into small pieces, lib and Component
  // ...need to consider back compatibility, accept same arguments

  // This new component will be a single one running alone, reconsider the structure, try not to use 3-party package.
  return (
    <div className="CAS_container">
      <div className="CAS_holder">
        {urlArray?.map((x, index) =>
          x.isVideo ? (
            <div key={index}>
              <h1>{x.url}</h1>
            </div>
          ) : (
            <div key={index}>
              <a href={x.link}>
                <img src={x.url} alt="" />
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CarouselAutoScale;
