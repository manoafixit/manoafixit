import React from 'react';
import { Header, Segment, Menu, Icon, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import Tags from '../global/issue/Tags';
import Status from '../global/issue/Status';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class OriginalPost extends React.Component {
  render() {
    const date = format(this.props.issue.createdAt, 'MMMM D, YYYY, hh:mm aa');

    const headerStyle = {
      border: 'none',
      boxShadow: 'none',
    };

    return (
        <div>
          <Menu borderless style={headerStyle}>
            <Menu.Item>
              <Header attached='top'>
                {this.props.issue.title}
                <Header.Subheader>
                  {this.props.issue.owner} opened this issue on {date}
                </Header.Subheader>
              </Header>
            </Menu.Item>
            <Menu.Item position='right'>
              <Icon name='like'/> {this.props.issue.likes}
            </Menu.Item>
            <Menu.Item> <Status issue={this.props.issue}/> </Menu.Item>
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
