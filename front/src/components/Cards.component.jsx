import styled from 'styled-components';
import * as V from '../styles/variables';

const ShadowCard = styled('div')`
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    width: 100%;
    max-width: 550px;
    border-radius: 10px;
    padding: 40px;
    background: ${V.whiteColor};
`;

export {ShadowCard};