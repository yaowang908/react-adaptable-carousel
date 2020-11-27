import React from 'react';
import Carousel from './components/Carousel';

function App() {
  return (
    <Carousel>
      <div>
          <img src="http://placekitten.com/200/300" alt="cat"/>
      </div>
      <div>
          <img src="http://placekitten.com/200/300" alt="cat"/>
      </div>
      <div>
          <img src="http://placekitten.com/200/300" alt="cat"/>
      </div>
      <div>
          <img src="http://placekitten.com/200/300" alt="cat"/>
      </div>
    </Carousel>
  );
}

export default App;
