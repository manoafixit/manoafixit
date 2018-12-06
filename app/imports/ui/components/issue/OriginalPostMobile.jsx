import React from 'react';
import { Segment, Message, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Tags from '../global/issue/Tags';


/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OriginalPostMobile extends React.Component {
  render() {
    return (
        <div>
          { (this.props.issue.owner === Meteor.user().username) ?
              <Menu borderless attached='top' style={{ boxShadow: 'none' }}>
                <Menu.Item position='right'>
                  <Link to={`/edit/${this.props.issue._id}`}>Edit</Link>
                </Menu.Item>
                <Menu.Item>
                  Delete
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
