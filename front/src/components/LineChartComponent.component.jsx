import React from 'react';
import styled from 'styled-components';
import {LineChart, Line, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import ChartHeaderComponent from './ChartsHeader.component';
import ChartWrapperComponent from './ChartsWrapper.component';
import * as V from '../styles/variables';

const BarChartToolTipWrapper = styled('div')`
    background-color: ${V.whiteColor};
    padding: 10px;
    max-width: 100px;
`

function LineChartComponent({data, title, stroke, dataKey}){

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
          return (
            <BarChartToolTipWrapper>
              <p className="label">{`${payload[0].payload.name} : ${payload[0].value}`}</p>
            </BarChartToolTipWrapper>
          );
        }
        return null;
    };

    const renderContent = () =>{
        return(
            <div>
                <ChartHeaderComponent title={title} color={V.whiteColor} />
                <div style={{ width: '100%', height: 150 }}>
                    <ResponsiveContainer>
                        <LineChart width={300} height={100} data={data}>
                            <Line type="monotone" dataKey={dataKey} stroke={V.whiteColor} strokeWidth={2} />
                            <Legend fill={'#000'}/>
                            <Tooltip content={<CustomTooltip />}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

    return(
        <ChartWrapperComponent bgcolor={stroke} content={renderContent()}></ChartWrapperComponent>
    )
}

export default LineChartComponent;