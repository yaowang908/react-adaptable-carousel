# React Adaptable Carousel
> A simple and easy to use carousel.

[![NPM Version][npm-image]][https://www.npmjs.com/package/react-adaptable-carousel]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][https://www.npmjs.com/package/react-adaptable-carousel]

React Adaptable Carousel(RAC) is a react.js based TypeScript module, offers two types of carousel, normal and queue. Features includes auto-scroll, hover pause, drag/swipe, video slide.

## Installation

```sh
npm i react-adaptable-carousel
```
```sh
yarn add react-adaptable-carousel
```

## Usage example

RAC has two modules, CarouselFullWidth & CarouselQueue

### 'CarouselFullWidth'

This module will have each slide take full with of the container, in other word, one slide per time.

[Live Example](https://www.yaow.me/react-adaptable-carousel/?path=/story/carouselfullwidth--default)

```sh
import { CarouselFullWidth } from 'react-adaptable-carousel';
/**
  * @param { object } themeColor - Carousel Theme color, including prev/next buttons and scroll bar
  *  @param { string } themeColor.button - button color, hex color code
  *  @param { string } themeColor.buttonText - button Text Color, hex color code
  *  @param { string } themeColor.scrollBar - scrollbar color, hex color code
  * @param { object } [buttonText] - buttons text
  *  @param { boolean } [buttonText.isImageBg = false] - if take image as background, image size should be 40 x 100
  *  @param { string } [buttonText.prev = '<'] - prev button text / img src
  *  @param { string } [buttonText.next = '>'] - next button text / img src
  * @param { number } [componentHeight = 'auto'] - height of the Carousel,
  * @param { boolean } isDivElement - if the children are div element
  * @param { array } [urlArray] - if not div elements, urlArray has to be set
  * @param { number } [interval] - interval between slides
  * @param { number } [pauseCarousel] - leave it undefined if you want auto move, set to a number to pause on certain index
*/
const App = () => {
  const args = {
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
  ],
  componentHeight: 400,
  buttonText: {
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
  }
  return (
    <CarouselFullWidth {...args} />
  );
}
```
### 'CarouselQueue'

This module will show multiple slides per screen, base on the real size of the slides. This module currently don't take video url.

[Live Example](https://www.yaow.me/react-adaptable-carousel/?path=/story/carousel-queue--auto-height)

```sh
import { CarouselQueue } from 'react-adaptable-carousel';
/**
 * @param { object } themeColor - Carousel Theme color, including prev/next buttons and scroll bar
 *  @param { string } themeColor.reminder - reminder color
 *  @param { string } themeColor.reminderTxt - reminder Text Color
 * @param { object } [reminder] - both ends reminder
 *  @param { boolean } [showReminder = true] - whether to show reminder
 *  @param { string } [reminder.firstTxt = 'First One'] - text on the reminder for first one, default first one
 *  @param { string } [reminder.lastTxt = 'Last One'] - text on the reminder for last one, default last one
 * @param { boolean } [componentHeight = 'auto'] - height of the Carousel,
 * @param { object } [buttonText] - buttons text
 *  @param { boolean } [showButton = true] - whether show buttons
 *  @param { number } [buttonWidth = 20] - button width
 *  @param { number } [buttonHeight = 100] - button height
 *  @param { boolean } [buttonText.isImageBg = false] - whether take image as background, image size should be 40 x 100
 *  @param { string } [buttonText.prev = '<'] - prev button text / img src
 *  @param { string } [buttonText.next = '>'] - next button text / img src
 * @param { number } gap - space between children
 * @param { number } [roundCorner = 0] - round corner of child element
 * @param { boolean } isDivElement - if the children are div element
 * @param { array } [urlArray] - if not div elements, urlArray has to be set
 * @param { number } [divElementMinWidth] - if div element, need to set divElementMinWidth
 */
const App = () => {
  const args = {
    urlArray: [
      { url: 'https://via.placeholder.com/200x300.png?text=0', link: '' },
      { url: 'https://via.placeholder.com/400x300.png?text=1', link: '' },
      { url: 'https://via.placeholder.com/300x300.png?text=2', link: '' },
      { url: 'https://via.placeholder.com/200x300.png?text=3', link: '' },
      { url: 'https://via.placeholder.com/400x300.png?text=4', link: '' },
      { url: 'https://via.placeholder.com/300x300.png?text=5', link: '' },
      { url: 'https://via.placeholder.com/200x300.png?text=6', link: '' },
      { url: 'https://via.placeholder.com/400x300.png?text=7', link: '' },
      { url: 'https://via.placeholder.com/300x300.png?text=8', link: '' },
    ],
    componentHeight: 0, // set 0 means to set image height to auto
    isDivElement: false,
    gap: 12,
    reminder: {
      showReminder: false,
    },
    buttonText: {
      showButton: true,
      buttonWidth: 40,
      buttonHeight: 80,
      isImageBg: true,
      prev: 'https://via.placeholder.com/40x80.png?text=<',
      next: 'https://via.placeholder.com/40x80.png?text=>',
    },
  };
  return (
    <CarouselFullWidth {...args} />
  );
}
```

## Meta

