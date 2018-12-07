import React from 'react';
import { Segment, Message, Menu, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../../api/Roles/Roles';
import Tags from '../global/issue/Tags';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OriginalPostMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
    };
  }

  render() {
    return (
        <div>
          {(this.props.issue.owner === Meteor.user().username ||
              Roles.userIsInRole(Meteor.userId(), ROLE.SUPERADMIN) ||
              Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) ?
              <Menu borderless attached='top' style={{ boxShadow: 'none' }}>
                <Menu.Item position='right'>
                  <Link to={`/edit/${this.props.issue._id}`}> <Button basic>Edit</Button> </Link>
                </Menu.Item>

              </Menu>
              : ''
          }

          <Segment attached>
            {this.props.issue.description ? this.props.issue.description : <i>This issue has no description</i>}
          </Segment>
          <Message attached='bottom'>
            {<Tags issue={this.props.issue} size={'mini'}/>}
          </Message>
        </div>
    );
  }
}

OriginalPostMobile.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(OriginalPostMobile);
