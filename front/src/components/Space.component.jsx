import React from 'react';
import styled from 'styled-components';
import * as V from '../styles/variables';

const Space = styled('div')`
    display: block;
    width: 100%;
    height: ${props=> props.height};
`

function SelectPlanButton({height}){
    return(
        <Space height={height}></Space>
    )
}

export default SelectPlanButton;