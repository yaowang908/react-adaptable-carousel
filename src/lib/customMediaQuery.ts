// https://blog.agney.dev/styled-components-&-typescript/
const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const desktopDelimiter = 922;
export const tabletDelimiter = 768;
export const phoneDelimiter = 576;

const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(desktopDelimiter),
  tablet: customMediaQuery(tabletDelimiter),
  phone: customMediaQuery(phoneDelimiter),
};

export default media;
