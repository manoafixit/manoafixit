import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { STATUS } from '../../../../api/IssuesCollection/IssueStatuses';

class Status extends React.Component {
  render() {
    const labelColor = () => {
      let result;
      switch (this.props.issue.status) {
        case `${STATUS.OPEN}`:
          result = 'blue';
          break;
        case `${STATUS.ACKNOWLEDGED}`:
          result = 'yellow';
          break;
        case `${STATUS.ONGOING}`:
          result = 'orange';
          break;
        case `${STATUS.RESOLVED}`:
          result = 'green';
          break;
        case `${STATUS.DUPLICATE}`:
          result = 'violet';
          break;
        case `${STATUS.REMOVED}`:
          result = 'red';
          break;
        default:
          throw new Meteor.Error('Invalid status');
      }
      return result;
    };

    return (
        <Label
            color={labelColor()}
            content={this.props.issue.status}/>
    );
  }
}

Status.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(Status);
