import React from 'react';
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

const CarouselAutoScale: React.FC<Props> = () => {
  // const {
  //   themeColor,
  //   reminder,
  //   buttonText,
  //   componentHeight,
  //   gap,
  //   roundCorner,
  //   isDivElement,
  //   urlArray,
  //   divElementMinWidth,
  //   children,
  // } = props;

  // TODO: rebuild the CarouselQueue Component, new name: CarouselAutoScale
  // ...break into small pieces, lib and Component
  // ...need to consider back compatibility, accept same arguments

  // This new component will be a single one running alone, reconsider the structure, try not to use 3-party package.
  return (
    <div className="CAS_container">
      <div className="CAS_holder">
        <div className="CAS_item">X</div>
      </div>
    </div>
  );
};

export default CarouselAutoScale;
