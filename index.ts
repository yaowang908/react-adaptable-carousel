import CarouselFullWidth from './src/components/CarouselFullWidth';
import CarouselQueue from './src/components/CarouselQueue';

module.exports = {
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
 * @param { array } [imgUrlArray] - if not div elements, imgUrlArray has to be set
 * @param { number } [interval] - interval between slides
 */
  CarouselFullWidth: CarouselFullWidth,
  
/**
 * @param { object } themeColor - Carousel Theme color, including prev/next buttons and scroll bar
 *  @param { string } themeColor.reminder - reminder color
 *  @param { string } themeColor.reminderTxt - reminder Text Color
 * @param { object } [reminder] - both ends reminder
 *  @param { string } [reminder.firstTxt = 'First One'] - text on the reminder for first one, default first one
 *  @param { string } [reminder.lastTxt = 'Last One'] - text on the reminder for last one, default last one
 * @param { boolean } [componentHeight = 'auto'] - height of the Carousel,
 * @param { number } gap - space between children
 * @param { number } [roundCorner = 0] - round corner of child element
 * @param { boolean } isDivElement - if the children are div element
 * @param { array } [imgUrlArray] - if not div elements, imgUrlArray has to be set
 */
  CarouselQueue: CarouselQueue
};
