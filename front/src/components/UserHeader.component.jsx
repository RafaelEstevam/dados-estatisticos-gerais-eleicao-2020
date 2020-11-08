import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import * as V from '../styles/variables';

const UserHeader = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    // height: ${props=> props.height};
    height: 142px;
    background:  ${V.draculaLightPurple};
`

const ApplicationName = styled('div')`
    display: block;
    max-height: 60px;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background:  ${V.draculaDark};

    h3{
        font-size: 22px;
        font-weight: 100;
        color: ${V.whiteColor};
    }
`

const UserHeaderWrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 82px;
    height: 100%;
    cursor: pointer;
    transition: linear all 0.2s;
    opacity: 0.6;

    :hover{
        opacity: 1;
    }
`

const UserPhoto = styled('div')`
    border-radius: 1000px;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${V.whiteColor};
    margin-right: 10px;
    color: ${V.whiteColor}
`

const UserHeaderDetails = styled('div')`
    color: ${V.whiteColor};
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;

`

function SelectPlanButton({name}){

    const history = useHistory();

    function handleProfile(){
        history.push(`/profile`);
    }

    return(
        <UserHeader>
            <ApplicationName>
                <h3>Naruto <strong>Help Desk</strong></h3>
            </ApplicationName>
            <UserHeaderWrapper onClick={handleProfile}>
                <UserPhoto>
                    <i class="fa fa-user"></i>
                </UserPhoto>
                <UserHeaderDetails>
                    <span>Bem-vindo <strong>{name}</strong></span>
                    <small>Perfil</small>
                </UserHeaderDetails>
            </UserHeaderWrapper>
        </UserHeader>
    )
}

export default SelectPlanButton;