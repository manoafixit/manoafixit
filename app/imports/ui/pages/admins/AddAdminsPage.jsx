import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Message, Segment, Form } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { ROLE } from '../../../api/Roles/Roles';
import { Users } from '../../../api/UsersCollection/UsersCollection';

export default class AddAdminsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '', error: '', redirectToRefer: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** On submit, insert the data. */
  handleSubmit() {
    const { username, email, password } = this.state;
    if (Users.createAdminAccount(username, email, password)) {
      Bert.alert({ type: 'success', message: `Created Admin Account: ${email}` });
    }
    Bert.alert({ type: 'danger', message: 'Failed to Create Admin Account' });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/admins' } };
    // if (this.state.redirectToReferer) {
    //   return <Redirect to={from}/>;
    // }
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Create an Admin Account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                      label="Username"
                      icon="user"
                      iconPosition="left"
                      name="username"
                      type="username"
                      placeholder="Username"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Email"
                      icon="mail"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Creation of Admin was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

AddAdminsPage.propTypes = {
  location: PropTypes.object,
};
