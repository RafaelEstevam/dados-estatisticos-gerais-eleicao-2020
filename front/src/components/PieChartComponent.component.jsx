import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip} from 'recharts';

const genreColors = ['#7f49d4', '#0a0118'];
const educationColor = ['#7f49d4', '#0a0118', '#d1b6fb', '#140330','#c19efa', '#1e0449', '#a26ef7'];
const breedColor = ['#7f49d4', '#0a0118', '#d1b6fb', '#140330','#c19efa', '#1e0449'];

const ChartHeader = styled('div')`
    text-align: center;
    display: block;
`

function PieChartComponent({data, title, colors, loading}){

    let COLORS = colors == 'genre' ? genreColors : colors == 'education' ? educationColor : breedColor;

    console.log(loading);

    return(
        <div>
            <ChartHeader>
                <h5>{title}</h5>
            </ChartHeader>
            {
                loading &&
                <p className="text-center">Carregando...</p>
            }
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx={240}
                            cy={200}
                            labelLine={true}
                            label
                            outerRadius={120}
                            innerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            paddingAngle={5}
                        >
                            {   data && data.length > 0 &&
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default PieChartComponent;