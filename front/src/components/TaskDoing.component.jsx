import React from 'react';
import styled from 'styled-components';
import * as V from '../styles/variables';
import PlayButton from './PlayButton.component';

const TaskDoingCard = styled('div')`
    border-radius: 3px;
    border: 3px solid ${V.draculaPrimary};
    background-color: ${V.draculaLight};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 15px;

    @media(max-width: ${V.viewMd}){
        margin-bottom: 15px;
    }
`

const TaskTitle = styled('h3')`
    font-size: 20px;
    color: ${V.whiteColor};
`

const TaskDoingHeader = styled('div')`
    display: block;
`

const TaskTimer = styled('p')`
    margin: 0px;
    margin-top: 10px;
    font-size: 14px;
    color: ${V.whiteColor};
`

const TaskDoingButtonsWrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        color: ${V.whiteColor};
        border-radius: 1000px;
        padding: 5px 10px;
        margin-left: 10px;
        border: 0px solid transparent;
        background: ${V.draculaPrimary}
    }

`

function TaskDoing({task}){

    return (
        <TaskDoingCard>
            <TaskDoingHeader>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskTimer>00:00:00</TaskTimer>
            </TaskDoingHeader>
            <TaskDoingButtonsWrapper>
                <button class="btn btn-rounded"><i class="fa fa-eye"></i></button>
                <PlayButton />
                <button class="btn btn-rounded"><i class="fa fa-pause"></i></button>
            </TaskDoingButtonsWrapper>
        </TaskDoingCard>
    )
}

export default TaskDoing;