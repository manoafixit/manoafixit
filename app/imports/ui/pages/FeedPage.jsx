import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Container, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../api/IssuesCollection/IssuesCollection';
import IssueDesktop from '../components/feed/responsive/IssueDesktop';

class FeedPage extends React.Component {
  render() {
    return (
        <Container>
          <Grid stackable celled padded>
            <Responsive {...Responsive.onlyMobile}>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              {this.props.issues.map((issue, index) => <IssueDesktop key={index} issue={issue}/>)}
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
    issues: Issues.getCollectionDocuments(),
    ready: sub.ready(),
  };
})(FeedPage);
