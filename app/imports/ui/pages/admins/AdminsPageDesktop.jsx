import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Header, Menu, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
          <Menu>
            <Menu.Item> <Header as="h2" textAlign="center">Admin Accounts</Header> </Menu.Item>
            <Menu.Item position='right'>
                <Link to={'/createAdmin'}> <Button color='blue' content='Create Admin Account' size='large'/> </Link>
            </Menu.Item>
          </Menu>
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
  console.log(Users.getAllAdminsOnly());
  return {
    accounts: Users.getAllAdminsOnly(),
  };
})(AdminsPageDesktop);
