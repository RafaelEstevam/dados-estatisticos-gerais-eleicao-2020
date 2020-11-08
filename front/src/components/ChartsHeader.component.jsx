import React from 'react';
import styled from 'styled-components';
import * as V from '../styles/variables';

const BarChartHeader = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const BarChartTitle = styled('h3')`
    color: ${props=> props.color};
    font-size: 20px;
`

const BarChartBtnContext = styled('button')`
    border: 0px;
    background: transparent;
    border-radius: 1000px;
    color: ${props=> props.color};
    padding:5px 10px;
    :hover{
        background-color: rgba(0,0,0,0.2);
    }
`

const BarChartTools = styled('div')`
    display: flex;
    align-items: center;
    small{
        color: ${props=> props.color};
        margin-right: 10px;
    }
`

function ChartsHeader({title, color}){
    
    return(
        <BarChartHeader>
            <BarChartTitle color={color}>{title}</BarChartTitle>
            <BarChartTools color={color}>
                <small>Semanal</small>
                <BarChartBtnContext color={color}><i class="fa fa-bars"></i></BarChartBtnContext>
            </BarChartTools>
        </BarChartHeader>
        
    )
}

export default ChartsHeader;