import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Tags from '../Tags';

class TitleTags extends React.Component {
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
        <Table.Cell>
          <Label
              color={labelColor()}
              content={this.props.issue.status}/>
          <Link to={`/issue/${this.props.issue._id}`}> {this.props.issue.title} </Link>
          <Tags issue={this.props.issue}/>
        </Table.Cell>
    );
  }
}

TitleTags.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(TitleTags);
