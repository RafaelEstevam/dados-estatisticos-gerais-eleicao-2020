import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Task from './Task.component';
import * as V from '../styles/variables';
import api from '../services/api.service';

const Column = styled('div')`
    height: 800px;
    width: 100%;
    background-color: ${V.draculaLight};
    border-radius: 3px;
    padding: 15px;
`

function ColumnTask({userId, title, status}){

    const [taskList, setTaskList] = useState('');

    useEffect(() => {
        async function getTasks() {
            try {
                const { data } = await api.get("/users/" + userId + "/tickets/" + status);
                setTaskList(data);
            } catch (error) {
                // alert("Ocorreu um erro ao buscar os items");
            }
        }
        getTasks();
    }, []);

    return(

        <Column>
            {
                taskList.length > 0 && taskList.map((item) =>{
                    return (
                        <Task task={item} />
                    )
                })
            }
        </Column>
        
    )
}

export default ColumnTask;