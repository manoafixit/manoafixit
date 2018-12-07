import React from 'react';
import { Header, Segment, Menu, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../../api/Roles/Roles';
import Tags from '../global/issue/Tags';
import Status from '../global/issue/Status';
import AdminStatusChange from '../global/issue/AdminStatusChange';
import Likes from '../global/issue/Likes';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OriginalPost extends React.Component {
  render() {
    const menuStyle = {
      border: 'none',
      boxShadow: 'none',
    };

    const issueTitleStyle = {
      fontSize: 'xx-large',
      fontColor: '#5C9EAD',
      fontStyle: 'italic',
      fontWeight: 'bolder',
      maxWidth: '50ch',
    };

    const date = format(this.props.issue.createdAt, 'MMMM D, YYYY, h:mm aa');

    return (
        <div>
          <Menu borderless style={menuStyle}>
            <Menu.Item>
              <Header style={issueTitleStyle} attached='top'>
                {this.props.issue.title}
                <Header.Subheader>
                  {this.props.issue.owner} opened this issue on {date}
                </Header.Subheader>
              </Header>
            </Menu.Item>
            <Menu.Item position='right'>
              <Likes issue={this.props.issue}/>
            </Menu.Item>
            <Menu.Item>
              {(Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN)
                  || Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) ?
                  <AdminStatusChange issue={this.props.issue}/>
                  : <Status issue={this.props.issue} size={'large'}/>}
            </Menu.Item>
          </Menu>

          {(this.props.issue.owner === Meteor.user().username ||
              Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN) ||
              Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) ?
              <Menu borderless attached='top' style={{ boxShadow: 'none' }}>
                <Menu.Item position='right'>
                  <Link to={`/edit/${this.props.issue._id}`}>Edit</Link>
                </Menu.Item>
              </Menu>
              : ''
          }

          <Segment attached>
            {this.props.issue.description ? this.props.issue.description : <i>This issue has no description</i>}
          </Segment>
          <Message attached='bottom'>
            {<Tags issue={this.props.issue}/>}
          </Message>
        </div>
    );
  }
}

OriginalPost.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(OriginalPost);
