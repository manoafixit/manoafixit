import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';

class IssuePageDesktop extends React.Component {
  render() {
    return (
        <Container>
          Test
        </Container>
    );
  }
}

IssuePageDesktop.propTypes = {
  issues: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments({}),
    ready: sub.ready(),
  };
})(IssuePageDesktop);
