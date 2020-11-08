import React from 'react';
import {useHistory} from 'react-router-dom';

import styled from 'styled-components';
import * as V from '../styles/variables';
import PlayButton from './PlayButton.component';

const TaskItemWrapper = styled('div')`
        width: 100%;
    `

const TaskDetails = styled('p')`
    border: 1px solid ${V.draculaLight};
    border-radius: 100px;
    background-color: ${V.draculaDark};
    padding: 3px 10px;
    color: ${V.whiteColor};
    text-align: center;
    font-size: 12px;
    margin: 0px;
`

const TaskTitle = styled('h3')`
    font-size: 20px;
    color: ${V.whiteColor};
    margin: 0px;
`

const TaskDescription = styled('p')`
    font-size: 14px;
    color: ${V.whiteColor};
    margin: 10px 0px;
`

const TaskLink = styled('a')`
    text-decoration: none !important;
`

const TaskWrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const TaskItem = styled('div')`
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: start;
    padding: 10px 15px;
    border-right: 6px solid transparent;
    border-right-color: ${props=> props.TaskItemAlert};
    border-left: 6px solid transparent;
    border-left-color: ${props=> props.TaskItemStatus};
    border-radius: 3px;
    margin-bottom: 10px;
    background: ${V.draculaDark};

    // :nth-child(2n+1){
    //     background: ${V.draculaDark};
    // }

    :hover{
        background: ${V.draculaInverse};
    }
`

function Task({task}){

    const history = useHistory();

    function handleGoToTicketPage(task){
        history.push(`/tickets/${task.ticketId}`);
    }

    const TaskItemStatus = task.status == 'done' ? V.draculaSuccess : task.status == 'blocked' ? V.draculaDanger : task.status == 'in-progress' ? V.draculaWarning : V.draculaPrimary;
    const TaskItemAlert = task.scheduleAlert ? V.draculaSecondary : 'transparent';

    return (
        <TaskItem TaskItemStatus={TaskItemStatus} TaskItemAlert={TaskItemStatus} onClick={ e => handleGoToTicketPage(task)}>
            <TaskItemWrapper>
                <TaskLink >
                    <TaskTitle>{task.title}</TaskTitle> 
                    <TaskDescription>{task.description}</TaskDescription>
                </TaskLink>
                {/* <TaskWrapper>
                    <TaskDetails>{task.clientName}</TaskDetails>
                </TaskWrapper> */}
            </TaskItemWrapper>
        </TaskItem>
    )
}

export default Task;