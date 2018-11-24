import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class Date extends React.Component {
  render() {

    return (
        <Table.Cell> {this.props.issue.createdAt}
        </Table.Cell>
    );
  }
}

Date.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(Date);
