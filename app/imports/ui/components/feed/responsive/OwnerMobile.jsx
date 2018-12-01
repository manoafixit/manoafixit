import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OwnerMobile extends React.Component {
  render() {

    return (
        <Table.Cell> {this.props.issue.owner}
        </Table.Cell>
    );
  }
}

OwnerMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(OwnerMobile);
