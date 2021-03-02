import React from 'react';

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
  return <div>Placeholder</div>;
};

export default CarouselAutoScale;
