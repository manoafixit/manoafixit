import React from 'react';
import { Dropdown, Label  } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Issues } from '../../../../api/IssuesCollection/IssuesCollection';

class AdminStatusChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1,
    };
  }

  updateCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Failed to update Issue Status to: ${error}` });
    } else {
      Bert.alert({ type: 'success', message: 'Successfully updated Issue Status' });
    }
  }

  handleStatusChange = (e, { value }) => {
    switch (value) {
      case 1:
        Issues.update(this.props.issue._id, { status: 'Open' }, undefined, this.updateCallback);
        break;
      case 2:
        Issues.update(this.props.issue._id, { status: 'Acknowledged' }, undefined, this.updateCallback);
        break;
      case 3:
        Issues.update(this.props.issue._id, { status: 'Ongoing' }, undefined, this.updateCallback);
        break;
      case 4:
        Issues.update(this.props.issue._id, { status: 'Resolved' }, undefined, this.updateCallback);
        break;
      case 5:
        Issues.update(this.props.issue._id, { status: 'Duplicate' }, undefined, this.updateCallback);
        break;
      case 6:
        Issues.update(this.props.issue._id, { status: 'Removed' }, undefined, this.updateCallback);
        break;
      default:
        break;
    }
  }

  render() {
    const statusOptions = [
      { key: 1, text: 'Open', value: 1 },
      { key: 2, text: 'Acknowledged', value: 2 },
      { key: 3, text: 'Ongoing', value: 3 },
      { key: 4, text: 'Resolved', value: 4 },
      { key: 5, text: 'Duplicate', value: 5 },
      { key: 6, text: 'Removed', value: 6 },
    ];

    return (
        <Dropdown
            placeholder={this.props.issue.status}
            options={statusOptions}
            onChange={this.handleStatusChange}
        />
    );
  }
}

AdminStatusChange.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(AdminStatusChange);
