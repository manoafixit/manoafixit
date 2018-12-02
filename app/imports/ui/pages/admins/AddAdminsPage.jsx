import React from 'react';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import {
  AutoForm,
  TextField,
  SubmitField,
  ErrorsField,
} from 'uniforms-semantic/';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { ROLE } from '../../../api/Roles/Roles';

class AddAdminsPage extends React.Component {
  constructor(props) {
    super(props);
    this.createAccount = this.createAccount.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = {
      username: '',
    };
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Issue failed to submit: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Issue has been submitted' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  createAccount(data) {
    const { username, email, password } = data;
    this.setState({ username: username });
    console.log(this.state.username);
    Accounts.createUser({ username, email, password });
    if (this.props.admin._id) Roles.addUsersToRoles(this.props.admin._id, ROLE.ADMIN);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const accountSchema = new SimpleSchema(
        {
          username: { type: String },
          email: { type: String },
          password: { type: String },
        }, { tracker: Tracker },
    );
    return (
        <Grid container centered>
          <Grid.Column>
            <div>
              <Header as="h2" textAlign="center">Submit Issue</Header>
              <AutoForm ref={(ref) => {
                this.formRef = ref;
              }} schema={accountSchema} onSubmit={this.createAccount}>
                <Segment>
                  <TextField name='username'/>
                  <TextField name='email'/>
                  <TextField name='password'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </div>
          </Grid.Column>
        </Grid>
    );
  }
}

AddAdminsPage.propTypes = {
  admin: PropTypes.object.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('UsersCollection');
  console.log(Meteor.users.findOne({ username: this.state.username }));
  return {
    admin: Meteor.users.findOne({ username: this.state.username }),
  };
})(AddAdminsPage);
