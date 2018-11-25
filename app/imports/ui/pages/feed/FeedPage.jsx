import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Container, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import FeedPageDesktop from './FeedPageDesktop';

class FeedPage extends React.Component {
  render() {
    return (
        <Container>
          <Grid stackable>
            <Responsive {...Responsive.onlyMobile}>
              <div>Mobile version of Feed page has not yet been implemented. Currently using the Desktop version</div>
              <FeedPageDesktop/>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <FeedPageDesktop/>
            </Responsive>
          </Grid>
        </Container>
    );
  }
}

FeedPage.propTypes = {
  issues: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments({}),
    ready: sub.ready(),
  };
})(FeedPage);
