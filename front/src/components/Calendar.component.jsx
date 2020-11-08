import React from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import localePtBr from '@fullcalendar/core/locales/pt-br';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';

import * as V from '../styles/variables';

const CalendarCard = styled('div')`
    background-color: ${V.draculaLight};
    border-radius: 3px;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 800px;

    .fc-toolbar-title, .fc-theme-bootstrap a:not([href]){
        color: ${V.whiteColor};
    }

`

const CalendarTitle = styled('h3')`
    color: ${V.whiteColor};
    font-weight: 100;
    font-size: 24px;
`

const CalendarHeader = styled('div')`
    padding: 15px;
    background: ${V.draculaDark};

`

const CalendarWrapper = styled('div')`
    padding: 15px;
`

function Calendar({events, title}){

    // const history = useHistory();

    // function handleEventClick (e){
    //     const ticketId = e.event._def.publicId;
    //     const path = `/ticked/${ticketId}`;
    //     history.push(path);
    // }

    return(

        <CalendarCard>
            <CalendarHeader>
                <CalendarTitle>{title}</CalendarTitle>
            </CalendarHeader>
            <CalendarWrapper>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, bootstrapPlugin ]}
                    initialView="dayGridMonth"
                    
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}

                    events={events}
                    themeSystem={'bootstrap'}
                    // eventClick={e => handleEventClick(e)}
                    locale={localePtBr}
                />
            </CalendarWrapper>
        </CalendarCard>
    )
}

export default Calendar;