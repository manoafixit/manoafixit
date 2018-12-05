import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Image, Button } from 'semantic-ui-react';
import { buttonLanding } from '../global/Styles';

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


            {this.props.currentUser === '' ? (
                <Grid.Row>
                  <Grid.Column width={2} verticalAlign='top' textAlign='center'>
                    <Link to={'/signin'}>
                      <Button style={buttonLanding} color='green' content='Sign In'/>
                    </Link>
                  </Grid.Column>
                  <Grid.Column width={2} verticalAlign='top' textAlign='center'>
                    <Link to={'/signup'}>
                      <Button style={buttonLanding} color='green' content='Sign Up'/>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
            ) : (
                <Grid.Row>
                  <Grid.Column width={4} verticalAlign='top' textAlign='center'>
                    <Link to={'/submit'}>
                      <Button style={buttonLanding} content='Submit an Issue'/>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
            )}


          </Grid>
        </div>
    );
  }
}

SegmentOne.propTypes = {
  currentUser: PropTypes.string,
};

const SegmentOneContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(SegmentOne);

export default withRouter(SegmentOneContainer);
