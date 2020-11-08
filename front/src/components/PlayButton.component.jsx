import React from 'react';
import styled from 'styled-components';
import * as V from '../styles/variables';

const PlayBtn = styled('button')`
    color: ${V.whiteColor};
    border-radius: 1000px;
    padding: 5px 10px;
    margin-left: 10px;
    background: ${V.draculaPrimary};
    border: 0px solid transparent;
`

function PlayButton({task}){
    
    return (
        <PlayBtn class="btn btn-rounded"><i class="fa fa-play"></i></PlayBtn>
    )
}

export default PlayButton;