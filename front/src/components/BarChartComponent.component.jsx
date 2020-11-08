import React from 'react';
import styled from 'styled-components';
import ChartHeaderComponent from './ChartsHeader.component';
import ChartWrapperComponent from './ChartsWrapper.component';
import {Bar, BarChart, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import * as V from '../styles/variables';

const BarChartToolTipWrapper = styled('div')`
    background-color: ${V.whiteColor};
    padding: 10px;
    max-width: 100px;
`

function BarChartComponent({data, title, bgColor, fill, dataKey}){

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
                <ChartHeaderComponent title={title} />
                <div style={{ width: '100%', height: 150 }}>
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <Bar dataKey={dataKey} fill={fill} />
                            <Legend fill={'#000'}/>
                            <Tooltip content={<CustomTooltip />}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

    return(
        <ChartWrapperComponent content={renderContent()}></ChartWrapperComponent>
    )
}

export default BarChartComponent;