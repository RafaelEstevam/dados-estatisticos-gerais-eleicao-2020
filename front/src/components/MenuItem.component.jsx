import React from 'react';
import styled from 'styled-components';
import * as V from '../styles/variables';
import {Link} from 'react-router-dom';

const ItemMenu = styled('li')`
    display: block;

    a{
        padding: 12px 15px;
        display: block;
        text-decoration: none;
        color: ${V.whiteColor};
        transition: all linear 0.2s;
        opacity: 0.5;
        border-left: 3px solid transparent;

        i{
            padding-right: 20px;
        }

        :hover{
            background: rgba(255,255,255,0.15);
            opacity: 1;
            border-left-color: ${V.borderHoverColor};
        }
    }

`

function MenuItem({icon, label, link}){
    return(
        <ItemMenu>
            <Link to={link}> <i className={icon}></i> {label}</Link>
        </ItemMenu>
    )
}

export default MenuItem;