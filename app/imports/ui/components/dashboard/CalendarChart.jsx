import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { fakeData3 } from '../../pages/dashboard/TestData';

export default class CalendarChart extends React.Component {
  render() {
    return (
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
    );
  }
}
