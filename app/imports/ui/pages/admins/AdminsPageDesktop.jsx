import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Users } from '../../../api/UsersCollection/UsersCollection';
import AdminAccountsRow from '../../components/admins/AdminAccountsRow';

class AdminsPageDesktop extends React.Component {
  render() {
    const wrapperStyle = {
      paddingTop: '20px',
      paddingBottom: '50px',
    };

    return (
        <div style={wrapperStyle}>
          <Header as="h2" textAlign="center">Admin Accounts</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.accounts.map((account, index) => <AdminAccountsRow key={index} account={account}/>)}
            </Table.Body>
          </Table>
        </div>
    );
  }
}

AdminsPageDesktop.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default withTracker(() => {
  console.log(Users.getAllUsers());
  console.log(Users.getAllUsersOnly());
  console.log(Users.getAllAdminsOnly());
  return {
    accounts: Users.getAllUsers(),
  };
})(AdminsPageDesktop);
