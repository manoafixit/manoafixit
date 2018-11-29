import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class SegmentOne extends React.Component {
  render() {
    return (
        <div className="landing-background">
          <Grid textAlign='center' verticalalign='middle' container stackable>

            <Grid.Row>
              <Grid.Column width={5} verticalalign='middle' textAlign='center'>
                <div style={{ paddingTop: '100px' }}>
                <Image size='large' src="/images/mfi-logo2.png"/>
                </div>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </div>
    );
  }
}

export default SegmentOne;
