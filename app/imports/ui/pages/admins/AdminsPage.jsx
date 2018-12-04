import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Container, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import NotImplemented from '../../components/global/NotImplemented';
import AdminsPageDesktop from './AdminsPageDesktop';

class AdminsPage extends React.Component {
  render() {
    return (
        <Container>
          <Grid stackable>
            <Responsive {...Responsive.onlyMobile}>
              <NotImplemented/>
              <AdminsPageDesktop/>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <AdminsPageDesktop/>
            </Responsive>
          </Grid>
        </Container>
    );
  }
}

AdminsPage.propTypes = {
  issues: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments({}),
    ready: sub.ready(),
  };
})(AdminsPage);
