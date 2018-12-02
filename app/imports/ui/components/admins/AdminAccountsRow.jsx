import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ROLE } from '../../../api/Roles/Roles';
import { Users } from '../../../api/UsersCollection/UsersCollection';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class AdminAccountsRow extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    Users.addUserToRole(this.props.account._id, ROLE.ADMIN);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell> {this.props.account.username} </Table.Cell>
          <Table.Cell> {this.props.account.emails[0].address} </Table.Cell>
          <Table.Cell>
            <Button onClick={this.handleClick}> Give Admin </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

AdminAccountsRow.propTypes = {
  account: PropTypes.object.isRequired,
};

export default withRouter(AdminAccountsRow);
