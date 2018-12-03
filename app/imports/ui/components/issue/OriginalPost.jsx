import React from 'react';
import { Header, Segment, Menu, Icon, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Tags from '../global/issue/Tags';
import Status from '../global/issue/Status';
import { ROLE } from '../../../api/Roles/Roles';
import AdminStatusChange from '../global/issue/AdminStatusChange';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OriginalPost extends React.Component {
  render() {
    const date = format(this.props.issue.createdAt, 'MMMM D, YYYY, h:mm aa');

    const headerStyle = {
      border: 'none',
      boxShadow: 'none',

    };

    const issueTitleStyle = {
      fontSize: 'xx-large',
      fontColor: '#5C9EAD',
      fontStyle: 'italic',
      fontWeight: 'bolder',
    };

    return (
        <div>
          <Menu borderless style={headerStyle}>
            <Menu.Item>
              <Header style={issueTitleStyle} attached='top'>
                {this.props.issue.title}
                <Header.Subheader>
                  {this.props.issue.owner} opened this issue on {date}
                </Header.Subheader>
              </Header>
            </Menu.Item>
            <Menu.Item position='right'>
              <Icon name='like'/> {this.props.issue.likes}
            </Menu.Item>
            <Menu.Item>
              { (Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN)
                  && Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) ?
                  <AdminStatusChange issue={this.props.issue}/>
                  : <Status issue={this.props.issue}/>}
            </Menu.Item>
          </Menu>
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
