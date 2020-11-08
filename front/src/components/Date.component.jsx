import React from 'react';
import styled from 'styled-components';
import * as V from '../styles/variables';

const DateComponent = styled('p')`
    font-size: 14px;
    color: ${V.whiteColor};
    margin: 0px;
`

function Date({date}){
    
    return(
        <DateComponent> {date} </DateComponent>
    )
}

export default Date;