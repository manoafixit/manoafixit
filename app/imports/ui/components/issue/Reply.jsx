import React from 'react';
import { Segment, Menu, Responsive } from 'semantic-ui-react';
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
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete = (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <p>Warning</p>,
      text: 'Are you sure you want to delete this reply?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonColor: '#c60606',
      cancelButtonText: 'Cancel',
      focusCancel: true,
      reverseButtons: true,
      buttonsStyling: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.value) {
        IssueReplies.removeReply(this.props.reply._id);
        MySwal.fire({
          title: 'Deleted Reply!',
          type: 'success',
        });
      }
      if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled Deletion!',
          type: 'error',
        });
      }
    });
  }

  render() {
    const date = format(this.props.reply.createdAt, 'MMMM D, YYYY, h:mm aa');

    const segmentStyle = {
      paddingTop: '15px',
      paddingBottom: '15px',
    };

    return (
        <div style={segmentStyle}>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Menu borderless attached='top'>
              <Menu.Item>
                <b>{this.props.reply.owner} commented on {date}</b>
              </Menu.Item>
              {
                (this.props.reply.owner === Meteor.user().username ||
                    Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN) ||
                    Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) ?
                    [<Menu.Item key='editReply' position='right' onClick={this.handleEdit} content='Edit'
                                style={{ color: '#4183C4' }}/>,
                      <Menu.Item key='deleteReply' onClick={this.handleDelete} content='Delete'
                                 style={{ color: '#4183C4' }}/>]
                    : ''
              }
            </Menu>
          </Responsive>

          <Responsive {...Responsive.onlyMobile}>
            <Segment attached='top'>
              <b>{this.props.reply.owner} commented on {date}</b>
            </Segment>
          </Responsive>

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

          <Responsive {...Responsive.onlyMobile}>
            <Menu borderless attached='bottom'>
              {
                (this.props.reply.owner === Meteor.user().username ||
                    Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN) ||
                    Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) ?
                    [<Menu.Item key='editReply' position='right' onClick={this.handleEdit} content='Edit'
                                style={{ color: '#4183C4' }}/>,
                      <Menu.Item key='deleteReply' onClick={this.handleDelete} content='Delete'
                                 style={{ color: '#4183C4' }}/>]
                    : ''
              }
            </Menu>
          </Responsive>

        </div>
    );
  }
}

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
};

export default withRouter(Reply);
