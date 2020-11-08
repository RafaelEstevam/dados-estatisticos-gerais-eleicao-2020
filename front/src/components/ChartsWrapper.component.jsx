import React from 'react';
import styled from 'styled-components';
import {LineChart, Line, ResponsiveContainer} from 'recharts';
import * as V from '../styles/variables';

const ChartWrapper = styled('div')`
    display: block;
    // border: 3px solid ${props => props.bgColor};
    background-color: ${props => props.bgColor};
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 30px;

    @media(max-width: ${V.viewMd}){
        margin-bottom: 15px;
    }
`

function ChartsWrapper({content, bgcolor}){

    return(
        <ChartWrapper bgColor={bgcolor}>
            {content}
        </ChartWrapper>
    )
}

export default ChartsWrapper;