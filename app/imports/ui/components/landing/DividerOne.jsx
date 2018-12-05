import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import { Grid, Image, Button } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';

/** A simple static component to render some text for the landing page. */
class SegmentOne extends React.Component {
  render() {
    return (
        <div className="landing-background">
          <Grid textAlign='center' verticalAlign='center' container stackable>

            <Grid.Row>
              <Grid.Column width={5} veritcalAlign='center' textAlign='center'>
                <div style={{ paddingTop: '100px' }}>
                  <Image size='large' src="/images/mfi-logo2.png"/>
                </div>
              </Grid.Column>
            </Grid.Row>


            {this.props.currentUser === '' ? (
                <Grid.Row>
                  <Grid.Column width={2} verticalAlign='top' textAlign='center'>
                    <Button as={NavLink} color='green' exact to="/signin">
                      Sign In
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={2} verticalAlign='top' textAlign='center'>
                    <Button as={NavLink} color='green' exact to="/signup">
                      Sign Up
                    </Button>
                  </Grid.Column>
                </Grid.Row>
            ) : (
                <Grid.Row>
                  <Grid.Column width={4} verticalAlign='top' textAlign='center'>
                    <Button as={NavLink} color='green' exact to="/submit">
                      Submit an Issue
                    </Button>
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
