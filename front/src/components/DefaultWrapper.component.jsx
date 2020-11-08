import React from 'react';
import {ToolBarWrapper, FlexWrapper, ContentWrapper, MainContentWrapper} from './Wrappers.component';
import Header from './Header.component';
import MainMenu from './MainMenu.component';

function DefaultWrapper ({content}){

    return(
        <FlexWrapper>
            <ToolBarWrapper>
                <MainMenu />
            </ToolBarWrapper>
            <ContentWrapper>
                <Header />
                <MainContentWrapper>
                    {content}
                </MainContentWrapper>
            </ContentWrapper>
        </FlexWrapper>
    )
} 

export default DefaultWrapper;