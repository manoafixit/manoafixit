import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { ROLE } from '../../../../api/Roles/Roles';
import { Issues } from '../../../../api/IssuesCollection/IssuesCollection';
import { IssueReplies } from '../../../../api/IssueRepliesCollection/IssueRepliesCollection';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OwnerMobile extends React.Component {
  deleteConfirm = (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <p>Warning</p>,
      text: 'Are you sure you want to delete this issue?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonColor: '#c60606',
      cancelButtonText: 'Cancel',
      focusCancel: true,
      reverseButtons: true,
      buttonsStyling: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.value) {
        Issues.remove(this.props.issue._id);
        IssueReplies.removeIssues(this.props.issue._id);
        MySwal.fire({
          title: 'Deleted Issue!',
          type: 'success',
        });
      }
      if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled Deletion!',
          type: 'error',
        });
      }
    });
  };

  render() {
    return (
        <Grid.Column>
          {(this.props.issue.owner === Meteor.user().username ||
              Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN) ||
              Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) ?
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
