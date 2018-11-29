import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Likes extends React.Component {
  render() {
    return (
        <Table.Cell>
          <Icon name='heart'/> {this.props.issue.likes}
        </Table.Cell>
    );
  }
}

Likes.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(Likes);
