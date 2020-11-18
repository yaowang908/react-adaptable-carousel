import React from 'react';
import Carousel from './Carousel';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: Carousel,
  title: 'Carousel',
};

const Template = args => <Carousel { ...args } />;

export const Default = Template.bind({});
Default.args = {
  componentWidth: 0,
  imgUrlArray: [
    "http://placekitten.com/200/300",
    "http://placekitten.com/400/300",
    "http://placekitten.com/300/300",
    "http://placekitten.com/200/300",
    "http://placekitten.com/400/300",
    "http://placekitten.com/300/300",
    "http://placekitten.com/200/300",
    "http://placekitten.com/400/300",
    "http://placekitten.com/300/300",
  ],
  isFullWidthItem: false,
  isDivElement: false,
  isImageElement: true,
  gap: 12,
};

export const FullWidthSlide = Template.bind({});
FullWidthSlide.args = {
  imgUrlArray: [
    "http://placekitten.com/800/300",
    "http://placekitten.com/800/300",
    "http://placekitten.com/800/300",
    "http://placekitten.com/800/300",
    "http://placekitten.com/800/300",
    "http://placekitten.com/800/300",
    "http://placekitten.com/800/300",
    "http://placekitten.com/800/300",
    "http://placekitten.com/800/300",
  ],
  componentWidth: 600,
  isFullWidthItem: true,
  isDivElement: false,
  isImageElement: true,
};


export const DivElementSlide = args => (
  <Carousel {...args} >
    <div>
      <div>Cat image 1</div>
      <img src="http://placekitten.com/200/300" alt="cat 1"/>
    </div>
    <div>
      <div>Cat image 2</div>
      <img src="http://placekitten.com/200/300" alt="cat 2"/>
    </div>
    <div>
      <div>Cat image 3</div>
      <img src="http://placekitten.com/200/300" alt="cat 3"/>
    </div>
  </Carousel>
);
DivElementSlide.args = {
  isFullWidthItem: false,
  isDivElement: true,
  isImageElement: false,
}

export const DivElementSlideFullWidth = args => (
  <Carousel {...args} >
    <div>
      <div>Cat image 1</div>
      <img src="http://placekitten.com/800/300" alt="cat 1"/>
    </div>
    <div>
      <div>Cat image 2</div>
      <img src="http://placekitten.com/900/300" alt="cat 2"/>
    </div>
    <div>
      <div>Cat image 3</div>
      <img src="http://placekitten.com/1000/300" alt="cat 3"/>
    </div>
  </Carousel>
);
DivElementSlideFullWidth.args = {
  isFullWidthItem: true,
  isDivElement: true,
  isImageElement: false,
}
