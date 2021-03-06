import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import FeedPageDesktop from './FeedPageDesktop';
import FeedPageMobile from './FeedPageMobile';

class FeedPage extends React.Component {
  render() {
    return (
        <div>
          <Responsive {...Responsive.onlyMobile}>
            <FeedPageMobile/>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <FeedPageDesktop/>
          </Responsive>
        </div>
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
