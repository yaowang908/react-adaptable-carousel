import React from 'react';
import CarouselQueue from './CarouselQueue';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: CarouselQueue,
  title: 'Carousel Queue',
};

const Template = args => <CarouselQueue { ...args } />;

export const Default = Template.bind({});
Default.args = {
  imgUrlArray: [
    "https://via.placeholder.com/200x300.png?text=0",
    "https://via.placeholder.com/400x300.png?text=1",
    "https://via.placeholder.com/300x300.png?text=2",
    "https://via.placeholder.com/200x300.png?text=3",
    "https://via.placeholder.com/400x300.png?text=4",
    "https://via.placeholder.com/300x300.png?text=5",
    "https://via.placeholder.com/200x300.png?text=6",
    "https://via.placeholder.com/400x300.png?text=7",
    "https://via.placeholder.com/300x300.png?text=8",
  ],
  componentHeight: 400,
  isDivElement: false,
  gap: 12,
  roundCorner: 12,
};

export const AutoHeight = Template.bind({});
AutoHeight.args = {
  imgUrlArray: [
    "https://via.placeholder.com/200x300.png?text=0",
    "https://via.placeholder.com/400x300.png?text=1",
    "https://via.placeholder.com/300x300.png?text=2",
    "https://via.placeholder.com/200x300.png?text=3",
    "https://via.placeholder.com/400x300.png?text=4",
    "https://via.placeholder.com/300x300.png?text=5",
    "https://via.placeholder.com/200x300.png?text=6",
    "https://via.placeholder.com/400x300.png?text=7",
    "https://via.placeholder.com/300x300.png?text=8",
  ],
  componentHeight: 0,//set 0 means to set image height to auto
  isDivElement: false,
  gap: 12,
};

export const DivElementSlide = args => (
  <CarouselQueue {...args} >
    <div>
      <div>Cat image 1</div>
      <img src="https://via.placeholder.com/200x300.png?text=1" alt="cat 1"/>
    </div>
    <div>
      <div>Cat image 2</div>
      <img src="https://via.placeholder.com/200x300.png?text=2" alt="cat 2"/>
    </div>
    <div>
      <div>Cat image 3</div>
      <img src="https://via.placeholder.com/200x300.png?text=3" alt="cat 3"/>
    </div>
    <div>
      <div>Cat image 3</div>
      <img src="https://via.placeholder.com/200x300.png?text=4" alt="cat 3"/>
    </div>
    <div>
      <div>Cat image 3</div>
      <img src="https://via.placeholder.com/200x300.png?text=5" alt="cat 3"/>
    </div>
  </CarouselQueue>
);
DivElementSlide.args = {
  isDivElement: true,
};