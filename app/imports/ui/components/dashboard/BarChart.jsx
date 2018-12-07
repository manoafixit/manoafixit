import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { fakeData } from '../../pages/dashboard/TestData';

export default class BarChart extends React.Component {
  render() {
    return (
        <ResponsiveBar
            data={fakeData}
            keys={[
              'hot dog',
              'burger',
              'sandwich',
              'kebab',
              'fries',
              'donut',
            ]}
            indexBy="country"
            margin={{
              top: 50,
              right: 130,
              bottom: 50,
              left: 60,
            }}
            padding={0.3}
            colors="nivo"
            colorBy="id"
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: 'fries',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'sandwich',
                },
                id: 'lines',
              },
            ]}
            borderColor="inherit:darker(1.6)"
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'country',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'food',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate={false}
            motionStiffness={90}
            motionDamping={15}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
        />
    );
  }
}
