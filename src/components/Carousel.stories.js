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
  componentHeight: 400,
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
  isFullWidthItem: false,
  isDivElement: false,
  isImageElement: true,
  gap: 12,
  roundCorner: 10,
};

export const FullWidthSlide = Template.bind({});
FullWidthSlide.args = {
  imgUrlArray: [
    "https://via.placeholder.com/800x300.png?text=0",
    "https://via.placeholder.com/800x300.png?text=1",
    "https://via.placeholder.com/800x300.png?text=2",
    "https://via.placeholder.com/800x300.png?text=3",
    "https://via.placeholder.com/800x300.png?text=4",
    "https://via.placeholder.com/800x300.png?text=5",
    "https://via.placeholder.com/800x300.png?text=6",
    "https://via.placeholder.com/800x300.png?text=7",
  ],
  componentWidth: 600,
  componentHeight: 400,
  isFullWidthItem: true,
  isDivElement: false,
  isImageElement: true,
  gap: 0,
};


export const DivElementSlide = args => (
  <Carousel {...args} >
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
  </Carousel>
);
DivElementSlide.args = {
  // componentWidth: 600,
  componentHeight: 600,
  isFullWidthItem: false,
  isDivElement: true,
  divElementMinWidth: 400,
  gap: 12,
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
  gap: 0,
}
