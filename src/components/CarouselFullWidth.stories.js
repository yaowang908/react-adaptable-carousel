import React from 'react';
import CarouselFullWidth from './CarouselFullWidth';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: CarouselFullWidth,
  title: 'CarouselFullWidth',
};

const Template = args => <CarouselFullWidth { ...args } />;

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
};

export const AutoHeight = Template.bind({});
AutoHeight.args = {
  imgUrlArray: [
    "https://via.placeholder.com/1200x630.png?text=0",
    "https://via.placeholder.com/1200x630.png?text=1",
    "https://via.placeholder.com/1200x630.png?text=2",
    "https://via.placeholder.com/1200x630.png?text=3",
    "https://via.placeholder.com/1200x630.png?text=4",
    "https://via.placeholder.com/1200x630.png?text=5",
    "https://via.placeholder.com/1200x630.png?text=6",
    "https://via.placeholder.com/1200x630.png?text=7",
    "https://via.placeholder.com/1200x630.png?text=8",
  ],
};

export const DivElementSlide = args => (
  <CarouselFullWidth {...args} >
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
  </CarouselFullWidth>
);
DivElementSlide.args = {
  isItemFullWidth: true,
  isDivElement: true,
  componentHeight: 400,
}

