import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';

class Date extends React.Component {
  render() {
    const date = format(this.props.issue.createdAt, 'MMMM D, YYYY hh:mm aa');

    return (
        <Table.Cell> {date}
        </Table.Cell>
    );
  }
}

Date.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(Date);
