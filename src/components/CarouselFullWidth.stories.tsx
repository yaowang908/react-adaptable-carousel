import React from 'react';
import CarouselFullWidth from './CarouselFullWidth';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: CarouselFullWidth,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1080px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'CarouselFullWidth',
};

const Template = (args) => <CarouselFullWidth {...args} />;

export const Default = Template.bind({});
Default.args = {
  urlArray: [
    {
      url: 'https://via.placeholder.com/200x300.png?text=0',
      link: 'https://placeholder.com',
    },
    {
      url: 'https://youtu.be/kjZ2ZbPNtA4',
      link: '',
      isVideo: true,
    },
    {
      url: 'https://via.placeholder.com/400x300.png?text=1',
      link: 'https://placeholder.com',
    },
    {
      url: 'https://via.placeholder.com/300x300.png?text=2',
      link: 'https://placeholder.com',
    },
    {
      url: 'https://via.placeholder.com/200x300.png?text=3',
      link: 'https://placeholder.com',
    },
    {
      url: 'https://via.placeholder.com/400x300.png?text=4',
      link: 'https://placeholder.com',
    },
    {
      url: 'https://via.placeholder.com/300x300.png?text=5',
      link: 'https://placeholder.com',
    },
    {
      url: 'https://via.placeholder.com/200x300.png?text=6',
      link: 'https://placeholder.com',
    },
    {
      url: 'https://via.placeholder.com/400x300.png?text=7',
      link: 'https://placeholder.com',
    },
    {
      url: 'https://via.placeholder.com/300x300.png?text=8',
      link: 'https://placeholder.com',
      isVideo: false,
    },
  ],
  componentHeight: 400,
  buttonText: {
    showButton: true,
    buttonWidth: 20,
    buttonHeight: 100,
    isImageBg: false,
    prev: 'https://via.placeholder.com/40x100.png?text=<',
    next: 'https://via.placeholder.com/40x100.png?text=>',
  },
  themeColor: {
    button: '#961c1c',
    buttonText: '#fff',
    scrollBar: '#961c1c',
  },
  interval: 3000,
  pauseCarousel: 7,
};

export const AutoHeight = Template.bind({});
AutoHeight.args = {
  urlArray: [
    { url: 'https://via.placeholder.com/1200x630.png?text=0', link: '' },
    { url: 'https://via.placeholder.com/1200x630.png?text=1', link: '' },
    { url: 'https://via.placeholder.com/1200x630.png?text=2', link: '' },
    { url: 'https://via.placeholder.com/1200x630.png?text=3', link: '' },
    { url: 'https://via.placeholder.com/1200x630.png?text=4', link: '' },
    { url: 'https://via.placeholder.com/1200x630.png?text=5', link: '' },
    { url: 'https://via.placeholder.com/1200x630.png?text=6', link: '' },
    { url: 'https://via.placeholder.com/1200x630.png?text=7', link: '' },
    { url: 'https://via.placeholder.com/1200x630.png?text=8', link: '' },
    {
      url: 'https://youtu.be/kjZ2ZbPNtA4',
      link: '',
      isVideo: true,
    },
  ],
  componentHeight: 0,
  buttonText: {
    showButton: true,
    buttonWidth: 40,
    buttonHeight: 80,
    isImageBg: true,
    prev:
      'https://www.chinainstitute.org/site/wp-content/uploads/2020/11/mainsliderprevious.png',
    next:
      'https://www.chinainstitute.org/site/wp-content/uploads/2020/11/mainslidernext.png',
  },
};

export const DivElementSlide = (args) => (
  <CarouselFullWidth {...args}>
    <div>
      <div>Cat image 1</div>
      <img src="https://via.placeholder.com/200x300.png?text=1" alt="cat 1" />
    </div>
    <div>
      <div>Cat image 2</div>
      <img src="https://via.placeholder.com/200x300.png?text=2" alt="cat 2" />
    </div>
    <div>
      <div>Cat image 3</div>
      <img src="https://via.placeholder.com/200x300.png?text=3" alt="cat 3" />
    </div>
    <div>
      <div>Cat image 3</div>
      <img src="https://via.placeholder.com/200x300.png?text=4" alt="cat 3" />
    </div>
    <div>
      <div>Cat image 3</div>
      <img src="https://via.placeholder.com/200x300.png?text=5" alt="cat 3" />
    </div>
  </CarouselFullWidth>
);
DivElementSlide.args = {
  isItemFullWidth: true,
  isDivElement: true,
  componentHeight: 400,
  buttonText: {
    showButton: false,
  },
};
