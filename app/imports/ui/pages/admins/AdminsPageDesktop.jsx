import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';

class AdminsPageDesktop extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Issue Data</Loader>;
  }

  renderPage() {
    const wrapperStyle = {
      paddingTop: '20px',
      paddingBottom: '50px',
    };

    return (
        <div style={wrapperStyle}>Test</div>
    );
  }
}

AdminsPageDesktop.propTypes = {
  issues: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments(),
    ready: sub.ready(),
  };
})(AdminsPageDesktop);
