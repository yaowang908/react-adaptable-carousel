// https://blog.agney.dev/styled-components-&-typescript/
const customMediaQuery = (maxWidth: number) =>
    `@media (max-width: ${maxWidth}px)`;

const media = {
    custom: customMediaQuery,
    desktop: customMediaQuery(922),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(576),
};

export default media;