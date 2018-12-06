import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../../../api/Roles/Roles';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OwnerMobile extends React.Component {
  render() {

    return (
        <Grid.Column>
          {(this.props.issue.owner === Meteor.user().username || Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN)) ?
              <Button size='mini' onClick={this.deleteConfirm} content='Delete Issue'/> :
              <div>by: {this.props.issue.owner}</div>}
        </Grid.Column>
    );
  }
}

OwnerMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(OwnerMobile);
