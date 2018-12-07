import React from 'react';
import { Segment, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import {
  AutoForm,
  LongTextField,
  SubmitField,
  ErrorsField,
  HiddenField,
} from 'uniforms-semantic/';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { IssueReplies, IssueRepliesSchema } from '../../../api/IssueRepliesCollection/IssueRepliesCollection';
import { ROLE } from '../../../api/Roles/Roles';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.submit = this.submit.bind(this);
    this.updateCallback = this.updateCallback.bind(this);
  }

  updateCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Failed to update Issue Status to: ${error}` });
    } else {
      Bert.alert({ type: 'success', message: 'Successfully updated Issue Status' });
    }
    this.setState({ editing: false });
  }

  submit(data) {
    const { reply } = data;
    IssueReplies.update(this.props.reply._id, { reply }, undefined, this.updateCallback);
  }

  handleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    const date = format(this.props.reply.createdAt, 'MMMM D, YYYY, h:mm aa');

    const segmentStyle = {
      paddingTop: '15px',
      paddingBottom: '15px',
    };

    return (
        <div style={segmentStyle}>
          <Menu borderless attached='top'>
            <Menu.Item>
              <b>{this.props.reply.owner} commented on {date}</b>
            </Menu.Item>
            {
              (this.props.reply.owner === Meteor.user().username ||
                  Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN)) ?
                  <Menu.Item position='right' onClick={this.handleEdit} content='Edit'
                             style={{ color: '#4183C4' }}/> : ''
            }

          </Menu>
          {this.state.editing ?
              <AutoForm ref={(ref) => {
                this.formRef = ref;
              }} schema={IssueRepliesSchema} onSubmit={this.submit}>
                <Segment>
                  <LongTextField name='reply' label={false} placeholder={this.props.reply.reply}/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='issue_id' value='fakevalue'/>
                  <HiddenField name='createdAt' value='fakevalue'/>
                  <HiddenField name='owner' value='fakevalue'/>
                  <HiddenField name='admin_status' value={false}/>
                </Segment>
              </AutoForm>
              :
              <Segment attached>
                {this.props.reply.reply}
              </Segment>
          }
        </div>
    );
  }
}

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
};

export default withRouter(Reply);
