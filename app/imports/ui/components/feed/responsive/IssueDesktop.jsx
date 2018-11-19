import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Tags from '../Tags';

/** Renders a table containing all of the Contacts documents. Use <Contact> to render each row. */
class IssueDesktop extends React.Component {
  render() {
    const menuStyle = {
      boxShadow: 'none',
    };

    return (
        <Grid.Row>
          <Menu borderless style={menuStyle}>
            <Menu.Item>
              {this.props.issue.title} <Tags issue={this.props.issue}/>
            </Menu.Item>
            <Menu.Item position='right'>
              {this.props.issue.owner}
            </Menu.Item>
            <Menu.Item position='right'>
              {this.props.issue.createdAt}
            </Menu.Item>
          </Menu>
        </Grid.Row>
    );
  }
}

IssueDesktop.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default withRouter(IssueDesktop);
