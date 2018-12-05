import React from 'react';
import { Header, Segment, Menu, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../../../api/Roles/Roles';
import Tags from '../../global/issue/Tags';
import Likes from '../../global/issue/Likes';
import Status from '../../global/issue/Status';
import AdminStatusChange from '../../global/issue/AdminStatusChange';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OriginalPostMobile extends React.Component {
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
      maxWidth: '50ch',
    };

    return (
        <div>
          <Header style={issueTitleStyle} attached='top'>
            {this.props.issue.title}
            <Header.Subheader>
              {this.props.issue.owner} opened this issue on {date}
            </Header.Subheader>
          </Header>
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

OriginalPostMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(OriginalPostMobile);
