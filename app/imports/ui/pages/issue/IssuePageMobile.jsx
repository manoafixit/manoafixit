import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Header, Menu, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../../api/Roles/Roles';
import OriginalPostMobile from '../../components/issue/responsive/OriginalPostMobile';
import ReplyBox from '../../components/issue/ReplyBox';
import Replies from '../../components/issue/Replies';
import Status from '../../components/global/issue/Status';
import Likes from '../../components/global/issue/Likes';
import AdminStatusChange from '../../components/global/issue/AdminStatusChange';

class IssuePageMobile extends React.Component {
  render() {
    const wrapperStyle = {
      paddingTop: '30px',
      paddingBottom: '30px',
      wordWrap: 'break-word',
    };

    const wordWrapperStyle = {
      wordWrap: 'break-word',
      maxWidth: '320px',
    };

    const menuStyle = {
      border: 'none',
      boxShadow: 'none',
    };

    const date = format(this.props.issue.createdAt, 'MMMM D, YYYY, h:mm aa');

    return (
        <div style={wrapperStyle}>
          <Grid.Row>
            <Menu borderless style={menuStyle}>
              <Menu.Item>
                {(Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN)
                    || Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) ?
                    <AdminStatusChange issue={this.props.issue}/>
                    : <Status issue={this.props.issue}/>}
              </Menu.Item>
              <Menu.Item position='right'>
                <Likes issue={this.props.issue}/>
              </Menu.Item>
            </Menu>
          </Grid.Row>

          <Grid.Row>
            <div style={wordWrapperStyle}>
              <Header attached='top'>
                {this.props.issue.title}
                <Header.Subheader>
                  {this.props.issue.owner} opened this issue on {date}
                </Header.Subheader>
              </Header>
            </div>
          </Grid.Row>

          <Grid.Row>
            <div style={wordWrapperStyle}>
              <OriginalPostMobile issue={this.props.issue}/>
            </div>
          </Grid.Row>

          <Grid.Row>
            <ReplyBox issue={this.props.issue}/>
          </Grid.Row>

          <Grid.Row>
            <Replies issue={this.props.issue} replies={this.props.replies}/>
          </Grid.Row>
        </div>
    );
  }
}

IssuePageMobile.propTypes = {
  issue: PropTypes.object,
  replies: PropTypes.array,
};

export default withRouter(IssuePageMobile);
