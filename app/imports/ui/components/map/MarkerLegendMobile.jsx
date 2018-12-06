import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import { STATUS } from '../../../api/IssuesCollection/IssueStatuses';

export default class MarkerLegendMobile extends React.Component {
  render() {
    const wrapperStyle = {
      paddingTop: '10px',
      paddingBottom: '10px',
    };

    const imageStyle = {
      maxHeight: '20px',
    };

    return (
        <div style={wrapperStyle}>
          <Grid centered container stretched>
            <Grid.Row>
              <Image alt='Marker for Open Issue' src='/images/mapmarkers/MarkerOpen.svg' style={imageStyle}/>
              {`${STATUS.OPEN} Issues`}

              <Image alt='Marker for Acknowledged Issue' src='/images/mapmarkers/MarkerAckd.svg' style={imageStyle}/>
              {`${STATUS.ACKNOWLEDGED} Issues`}

              <Image alt='Marker for Ongoing Issue' src='/images/mapmarkers/MarkerProg.svg' style={imageStyle}/>
              {`${STATUS.ONGOING} Issues`}
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}
