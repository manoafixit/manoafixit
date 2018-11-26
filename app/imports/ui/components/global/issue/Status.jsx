import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Status extends React.Component {
  render() {
    const labelColor = () => {
      let result;
      switch (this.props.issue.status) {
        case 'Open':
          result = 'blue';
          break;
        case 'Acknowledged':
          result = 'orange';
          break;
        case 'Ongoing':
          result = 'yellow';
          break;
        case 'Resolved':
          result = 'green';
          break;
        case 'Removed':
          result = 'red';
          break;
        case 'Duplicate':
          result = 'purple';
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
