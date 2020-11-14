import styled from 'styled-components';
import media from '../lib/customMediaQuery';

const Container = styled.div`
    width: 100%;
    ${media.desktop} {
        
    }
    ${media.tablet} {

    }
    ${media.phone} {

    }
`;

const ElementsHolder = styled.div`
    display: inline-flex;

    ${media.desktop} {
        
    }
    ${media.tablet} {

    }
    ${media.phone} {

    }
`;

export const Styled = {
    Container,
    ElementsHolder,
};