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
    itemsArray: [
        {}
    ]
};
