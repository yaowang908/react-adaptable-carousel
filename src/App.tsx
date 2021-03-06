import React from 'react';
import CarouselFullWidth from './components/CarouselFullWidth';

const App: React.FC = () => {
  return (
    <CarouselFullWidth
      urlArray={[
        {
          url: 'https://via.placeholder.com/200x300.png?text=0',
          link: 'https://placeholder.com',
          isVideo: false,
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
        },
      ]}
      componentHeight={400}
      buttonText={{
        showButton: true,
        buttonWidth: 20,
        buttonHeight: 100,
        isImageBg: false,
        prev: 'https://via.placeholder.com/40x100.png?text=<',
        next: 'https://via.placeholder.com/40x100.png?text=>',
      }}
      themeColor={{
        button: '#961c1c',
        buttonText: '#fff',
        scrollBar: '#961c1c',
      }}
      interval={3000}
      isDivElement={false}
    />
  );
};

export default App;
