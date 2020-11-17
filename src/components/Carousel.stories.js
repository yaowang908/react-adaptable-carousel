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
  children: <>
    <div>
        <img src="http://placekitten.com/200/300" alt="cat"/>
    </div>
    <div>
        <img src="http://placekitten.com/300/400" alt="cat"/>
    </div>
    <div>
        <img src="http://placekitten.com/200/300" alt="cat"/>
    </div>
    <div>
        <img src="http://placekitten.com/300/400" alt="cat"/>
    </div>
    <div>
        <img src="http://placekitten.com/200/300" alt="cat"/>
    </div>
    <div>
        <img src="http://placekitten.com/300/300" alt="cat"/>
    </div>
    <div>
        <img src="http://placekitten.com/200/300" alt="cat"/>
    </div>
    <div>
        <img src="http://placekitten.com/300/400" alt="cat"/>
    </div>
  </>,
  componentWidth: 0,
};

export const FullWidthSlide = Template.bind({});
FullWidthSlide.args = {
  children: Default.args.children,
  componentWidth: 600,
};
