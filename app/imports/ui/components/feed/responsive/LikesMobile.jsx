import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class LikesMobile extends React.Component {
  render() {
    return (
        <Table.Cell>
          <Icon name='heart'/> {this.props.issue.likes}
        </Table.Cell>
    );
  }
}

LikesMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(LikesMobile);
