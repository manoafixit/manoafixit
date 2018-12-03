import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Issues } from '../../../../api/IssuesCollection/IssuesCollection';
import { IssueReplies } from '../../../../api/IssueRepliesCollection/IssueRepliesCollection';
import { STATUS } from '../../../../api/IssuesCollection/IssueStatuses';

class AdminStatusChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateValue: 1,
    };
  }

  updateCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Failed to update Issue Status to: ${error}` });
    } else {
      Bert.alert({ type: 'success', message: 'Successfully updated Issue Status' });
    }
  }

  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Unsuccessful reply: ${error}` });
    } else {
      Bert.alert({ type: 'success', message: 'Successfully replied' });
    }
  }

  generateReply(status) {
    const owner = Meteor.user().username;
    return `${owner} changed the status of this Issue to ${status}`;
  }

  handleStatusChange = (e, { value }) => {
    this.setState({ stateValue: value });
    const owner = Meteor.user().username;

    let reply;
    const issueID = this.props.issue._id;
    const replyDate = new Date();
    // console.log(`Logging Line 47 (issueID): ${issueID}`);
    // console.log(`Logging Line 48 (replyDate): ${replyDate}`);
    // console.log('-----');
    switch (value) {
      case 1:
        Issues.update(issueID, { status: 'Open' }, undefined, this.updateCallback);
        // console.log(`Logging Line 53 (issueID): ${issueID}`);
        // console.log(`Logging Line 54 (replyDate): ${replyDate}`);
        reply = this.generateReply('Open');
        IssueReplies.insert({ issueID, reply, replyDate, owner }, this.insertCallback);
        break;
      case 2:
        Issues.update(issueID, { status: 'Acknowledged' }, undefined, this.updateCallback);
        break;
      case 3:
        Issues.update(issueID, { status: 'Ongoing' }, undefined, this.updateCallback);
        break;
      case 4:
        Issues.update(issueID, { status: 'Resolved' }, undefined, this.updateCallback);
        break;
      case 5:
        Issues.update(issueID, { status: 'Duplicate' }, undefined, this.updateCallback);
        break;
      case 6:
        Issues.update(issueID, { status: 'Removed' }, undefined, this.updateCallback);
        break;
      default:
        break;
    }
  }

  render() {
    const statusOptions = [
      { key: 1, text: `${STATUS.OPEN}`, value: 1 },
      { key: 2, text: `${STATUS.ACKNOWLEDGED}`, value: 2 },
      { key: 3, text: `${STATUS.ONGOING}`, value: 3 },
      { key: 4, text: `${STATUS.RESOLVED}`, value: 4 },
      { key: 5, text: `${STATUS.DUPLICATE}`, value: 5 },
      { key: 6, text: `${STATUS.REMOVED}`, value: 6 },
    ];

    return (
        <Dropdown
            placeholder={this.props.issue.status}
            options={statusOptions}
            onChange={this.handleStatusChange}
            clearable='true'
            defaultValue={this.state.stateValue}
        />
    );
  }
}

AdminStatusChange.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(AdminStatusChange);
