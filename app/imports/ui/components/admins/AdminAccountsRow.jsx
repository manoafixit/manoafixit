import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class AdminAccountsRow extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell> {this.props.account.username} </Table.Cell>
          <Table.Cell> {this.props.account.emails[0].address} </Table.Cell>
        </Table.Row>
    );
  }
}

AdminAccountsRow.propTypes = {
  account: PropTypes.object.isRequired,
};

export default withRouter(AdminAccountsRow);
