import React from 'react';
import styled from 'styled-components';
import * as V from '../styles/variables';
import Task from './Task.component.jsx';

const TaskListCard = styled('div')`
        background-color: ${V.draculaLight};
        border-radius: 3px;
        padding: 10px 15px;
        max-height: 800px;
        height: 600px;
        overflow-y: scroll;
        overflow-x: hidden;
    `

const TaskListCardTitle = styled('h3')`
    font-size: 20px;
    color: ${V.whiteColor}
`

const TaskListFilterWrapper = styled('div')`
    padding: 15px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TaskListFilterButtons = styled('button')`
    border: 0px solid transparent;
    border-radius: 3px;
    margin: 10px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;

    &.danger{
        background-color: ${V.draculaDanger};
    }

    &.success{
        background-color: ${V.draculaSuccess};
    }

    &.warning{
        background-color: ${V.draculaWarning};
    }

    &.primary{
        background-color: ${V.draculaPrimary};
    }

`

function TaskList({tasks, title}){

    return (
        <TaskListCard>
            <div>
                <TaskListCardTitle>{title}</TaskListCardTitle>
                <TaskListFilterWrapper>
                    <TaskListFilterButtons className="primary">To Do</TaskListFilterButtons>
                    <TaskListFilterButtons className="success">Done</TaskListFilterButtons>
                    <TaskListFilterButtons className="warning">In Progress</TaskListFilterButtons>
                    <TaskListFilterButtons className="danger">Blocked</TaskListFilterButtons>
                </TaskListFilterWrapper>
                {tasks.length > 0 && tasks.map((item) =>{
                    return (
                        <Task task={item} />
                    )
                })}
            </div>
        </TaskListCard>
    )
}

export default TaskList;