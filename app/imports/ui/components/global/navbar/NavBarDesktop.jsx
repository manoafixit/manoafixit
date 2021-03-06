import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { navbarStyle } from '../Styles';

/** The NavBarDesktop appears at the top of every page. Rendered by the App Layout component. */
class NavBarDesktop extends React.Component {
  render() {
    return (
        <Menu style={navbarStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>ManoaFixIt</Header>
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} onClick={this.handleSidebarHide} activeClassName="active" exact to="/"
                          key='landing'>Home</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/submit" key='submit'>Submit</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/feed" key='add'>Feed</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/map" key='list'>Map</Menu.Item>]
          ) : ''}
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
    );
  }
}

/** Declare the types of all properties. */
NavBarDesktop.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBarDesktop);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
