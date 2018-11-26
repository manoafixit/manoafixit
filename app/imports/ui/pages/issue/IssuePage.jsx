import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Container, Responsive, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import IssuePageDesktop from './IssuePageDesktop';
import NotImplemented from '../../components/global/NotImplemented';

class IssuePage extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Grid stackable>
            <Responsive {...Responsive.onlyMobile}>
              <NotImplemented/>
              <IssuePageDesktop issue={this.props.issue}/>

            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <IssuePageDesktop issue={this.props.issue}/>
            </Responsive>
          </Grid>
        </Container>
    );
  }
}

// See Note #1 in the #notes channel on Discord
IssuePage.propTypes = {
  issue: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const sub = Meteor.subscribe('IssuesCollection');
  const docId = match.params._id;
  return {
    issue: Issues.findOne({ _id: docId }),
    ready: sub.ready(),
  };
})(IssuePage);
