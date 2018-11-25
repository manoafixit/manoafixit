import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Sidebar, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBarMobile appears at the top of every page. Rendered by the App Layout component. */
class NavBarMobile extends React.Component {
  state = { visible: false, margin: '10px' };

  /** handleHideClick = () => this.setState({ visible: false }) */
  handleShowClick = () => this.setState({ visible: true, margin: '100px' })

  handleSidebarHide = () => this.setState({ visible: false, margin: '10px' })

  render() {
    const { visible, margin } = this.state;
    return (
        <Sidebar.Pushable>
          <Sidebar
              as={Menu}
              animation='overlay'
              direction='top'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width='thin'
          >
            {this.props.currentUser ? (
                [<Menu.Item as={NavLink} activeClassName="active" exact to="/feed" key='add'>Feed</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/submit" key='submit'>Submit</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/map" key='list'>Map</Menu.Item>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
            ) : ''}
          </Sidebar>

          <Sidebar.Pusher>
          <Menu style={{ marginBottom: margin }} attached="top" borderless inverted>
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header inverted as='h1'>ManoaFixIt</Header>
            </Menu.Item>
            <Menu.Item onClick={this.handleShowClick}>
              <Icon name="sidebar" />
            </Menu.Item>
            <Menu.Item position="right">
              {this.props.currentUser === '' ? (
                  <Dropdown text="Login" pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                      <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                      <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                    </Dropdown.Menu>
                  </Dropdown>
              ) : (
                  <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                      <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                    </Dropdown.Menu>
                  </Dropdown>
              )}
            </Menu.Item>
          </Menu>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
  }
}

/** Declare the types of all properties. */
NavBarMobile.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBarMobile);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
