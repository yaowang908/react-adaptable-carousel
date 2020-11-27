import React from 'react';
import CarouselFullWidth from './components/CarouselFullWidth';

function App() {
  return (
    <CarouselFullWidth
      imgUrlArray={
        [
          { imgUrl: "https://via.placeholder.com/200x300.png?text=0", link: 'https://placeholder.com'},
          { imgUrl: "https://via.placeholder.com/400x300.png?text=1", link: 'https://placeholder.com'},
          { imgUrl: "https://via.placeholder.com/300x300.png?text=2", link: 'https://placeholder.com'},
          { imgUrl: "https://via.placeholder.com/200x300.png?text=3", link: 'https://placeholder.com'},
          { imgUrl: "https://via.placeholder.com/400x300.png?text=4", link: 'https://placeholder.com'},
          { imgUrl: "https://via.placeholder.com/300x300.png?text=5", link: 'https://placeholder.com'},
          { imgUrl: "https://via.placeholder.com/200x300.png?text=6", link: 'https://placeholder.com'},
          { imgUrl: "https://via.placeholder.com/400x300.png?text=7", link: 'https://placeholder.com'},
          { imgUrl: "https://via.placeholder.com/300x300.png?text=8", link: 'https://placeholder.com'},
        ]
      }
      componentHeight={ 400 }
      isDivElement={false}
    ></CarouselFullWidth>
  );
}

export default App;
