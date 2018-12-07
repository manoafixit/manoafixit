import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Issues } from '../../../../api/IssuesCollection/IssuesCollection';
import { IssueReplies } from '../../../../api/IssueRepliesCollection/IssueRepliesCollection';
import { STATUS } from '../../../../api/IssuesCollection/IssueStatuses';
import { format } from "date-fns";

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
    const date = new Date();
    const formatted_date = format(date, 'MMMM D, YYYY h:mm aa');

    if (status === STATUS.DUPLICATE) {
      return `${owner} marked this Issue as ${status} on ${formatted_date}`;
    }
    return `${owner} changed the status of this Issue to ${status} on ${formatted_date}`;

  }

  handleStatusChange = (e, { value }) => {
    this.setState({ stateValue: value });
    const owner = Meteor.user().username;
    const issue_id = this.props.issue._id;
    const createdAt = new Date();
    const admin_status = true;
    let reply;

    switch (value) {
      case 1:
        Issues.update(issue_id, { status: `${STATUS.OPEN}` }, undefined, this.updateCallback);
        reply = this.generateReply(`${STATUS.OPEN}`);
        IssueReplies.insert({ issue_id, reply, createdAt, owner, admin_status }, this.insertCallback);
        break;
      case 2:
        Issues.update(issue_id, { status: `${STATUS.ACKNOWLEDGED}` }, undefined, this.updateCallback);
        reply = this.generateReply(`${STATUS.ACKNOWLEDGED}`);
        IssueReplies.insert({ issue_id, reply, createdAt, owner, admin_status }, this.insertCallback);
        break;
      case 3:
        Issues.update(issue_id, { status: `${STATUS.ONGOING}` }, undefined, this.updateCallback);
        reply = this.generateReply(`${STATUS.ONGOING}`);
        IssueReplies.insert({ issue_id, reply, createdAt, owner, admin_status }, this.insertCallback);
        break;
      case 4:
        Issues.update(issue_id, { status: `${STATUS.RESOLVED}` }, undefined, this.updateCallback);
        reply = this.generateReply(`${STATUS.RESOLVED}`);
        IssueReplies.insert({ issue_id, reply, createdAt, owner, admin_status }, this.insertCallback);
        break;
      case 5:
        Issues.update(issue_id, { status: `${STATUS.DUPLICATE}` }, undefined, this.updateCallback);
        reply = this.generateReply(`${STATUS.DUPLICATE}`);
        IssueReplies.insert({ issue_id, reply, createdAt, owner, admin_status }, this.insertCallback);
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
