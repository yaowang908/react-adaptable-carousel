import styled from 'styled-components';
import media from '../lib/customMediaQuery';

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
};
// TODO: accept image as background to replace default style
const Prev = styled.div<ButtonProps>`
    font-size: 1.5em;
    width: 20px;
    padding: 0 10px;
    height: 100px;
    font-weight: 900;
    position: absolute;
    z-index: 100;
    left: 15px;
    top: 50%;
    margin-top: -50px;
    cursor: pointer;
    box-shadow: 2px 2px 6px #949494;
    display: grid;// grid
    place-items: center;
    ${props=>props.color ? `background-color: ${props.color}` : 'background-color: #961c1c'};
    ${props=>props.color ? `color: ${props.color}` : 'color: #fff'};
    & * {
      ${props=>props.color ? `color: ${props.color}` : 'color: #fff'};
    }
`;

const Next = styled(Prev)<ButtonProps>`
    right: 15px;
    left: auto;
`;

export const Button = {
  Prev,
  Next
};