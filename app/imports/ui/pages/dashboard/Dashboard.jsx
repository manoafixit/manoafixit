import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsiveLine } from '@nivo/line';
import { Header, Segment } from 'semantic-ui-react';
import { fakeData, fakeData2, fakeData3 } from './TestData';

class Dashboard extends React.Component {
  render() {
    const divStyle = {
      height: '550px',
    };
    const wrapperStyle = {
      paddingTop: '20px',
      paddingBottom: '50px',
    };

    return (
        <div className="ui center aligned container" style={wrapperStyle}>
          <Header as="h1" textAlign="center">Dashboard</Header>
          <Segment style={divStyle}>
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
          </Segment>
          <Segment style={divStyle}>
            <ResponsiveLine
                data={fakeData2}
                margin={{
                  top: 50,
                  right: 110,
                  bottom: 50,
                  left: 60,
                }}
                xScale={{
                  type: 'point',
                }}
                yScale={{
                  type: 'linear',
                  stacked: true,
                  min: 'auto',
                  max: 'auto',
                }}
                axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'transportation',
                  legendOffset: 36,
                  legendPosition: 'middle',
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'count',
                  legendOffset: -40,
                  legendPosition: 'middle',
                }}
                dotSize={10}
                dotColor="inherit:darker(0.3)"
                dotBorderWidth={2}
                dotBorderColor="#ffffff"
                enableDotLabel={true}
                dotLabel="y"
                dotLabelYOffset={-12}
                animate={false}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
            />
          </Segment>
          <Segment style={divStyle}>
            <ResponsiveCalendar
                data={fakeData3}
                from="2015-03-01"
                to="2016-07-12"
                emptyColor="#eeeeee"
                colors={[
                  '#61cdbb',
                  '#97e3d5',
                  '#e8c1a0',
                  '#f47560',
                ]}
                margin={{
                  top: 100,
                  right: 30,
                  bottom: 60,
                  left: 30,
                }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                monthLegendOffset={10}
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 34,
                    itemHeight: 36,
                    itemDirection: 'top-to-bottom',
                  },
                ]}
            />
          </Segment>
        </div>
    );
  }
}

export default Dashboard;
