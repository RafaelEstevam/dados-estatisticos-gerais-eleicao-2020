import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem.component';
import {getStorageLogin} from '../services/auth.service';
import * as R from '../services/routes.service';
import UserHeader from './UserHeader.component';

const MainMenuComponent = styled('ul')`
    list-style: none;
    padding: 0px;
`

function MainMenu(){

    const {userType, name} = getStorageLogin();
    const menuRoute = userType == 1 ? R.managerRoutes : userType == 2 ? R.employeeRoutes : userType == 3 ? R.clientRoutes : R.clientRoutes;

    return(
        <div>
            <UserHeader name={name}/>
            <MainMenuComponent>

                {menuRoute.map((item) =>{
                    return(
                        item.render && 
                        <MenuItem key={item.route} icon={item.icon} label={item.label} link={item.route} />
                    )
                })}
            </MainMenuComponent>
        </div>
    )
}

export default MainMenu;