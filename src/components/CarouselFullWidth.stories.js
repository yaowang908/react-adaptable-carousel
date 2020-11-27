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
    { imgUrl: "https://via.placeholder.com/200x300.png?text=0", link: 'https://placeholder.com'},
    { imgUrl: "https://via.placeholder.com/400x300.png?text=1", link: 'https://placeholder.com'},
    { imgUrl: "https://via.placeholder.com/300x300.png?text=2", link: 'https://placeholder.com'},
    { imgUrl: "https://via.placeholder.com/200x300.png?text=3", link: 'https://placeholder.com'},
    { imgUrl: "https://via.placeholder.com/400x300.png?text=4", link: 'https://placeholder.com'},
    { imgUrl: "https://via.placeholder.com/300x300.png?text=5", link: 'https://placeholder.com'},
    { imgUrl: "https://via.placeholder.com/200x300.png?text=6", link: 'https://placeholder.com'},
    { imgUrl: "https://via.placeholder.com/400x300.png?text=7", link: 'https://placeholder.com'},
    { imgUrl: "https://via.placeholder.com/300x300.png?text=8", link: 'https://placeholder.com'},
  ],
  componentHeight: 400,
  buttonText: {
    isImageBg: false,
    prev: 'https://via.placeholder.com/40x100.png?text=<',
    next: 'https://via.placeholder.com/40x100.png?text=>'
  },
  themeColor: {
    button: '#961c1c', 
    buttonText: '#fff', 
    scrollBar: '#961c1c'
  },
  interval: 3000,
  pauseCarousel: 7,
};

export const AutoHeight = Template.bind({});
AutoHeight.args = {
  imgUrlArray: [
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=0", link:''},
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=1", link:''},
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=2", link:''},
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=3", link:''},
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=4", link:''},
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=5", link:''},
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=6", link:''},
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=7", link:''},
    { imgUrl:"https://via.placeholder.com/1200x630.png?text=8", link:''},
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

