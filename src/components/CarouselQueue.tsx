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
  gap?: number;
};

const CarouselQueue: React.FC<Props> = (props) => {
  return (
    <Styled.Container>
      <Styled.ImagesHolder>
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
    </Styled.Container>
  );
}

export default CarouselQueue