import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Sidebar, Icon } from 'semantic-ui-react';
import { navbarStyle } from '../Styles';

/** The NavBarMobile appears at the top of every page. Rendered by the App Layout component. */
class NavBarMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleShowClick = this.handleShowClick.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
  }

  /** handleHideClick = () => this.setState({ visible: false }) */
  handleShowClick = () => this.setState({ visible: true })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state;
    return (
        <div>
          <Menu style={navbarStyle} attached="top" borderless inverted>
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header inverted as='h1'>ManoaFixIt</Header>
            </Menu.Item>
            {this.props.currentUser === '' ? (
                <Menu.Item position="right">
                  <Dropdown text="Login" pointing="top right" icon={'user'}>
                    <Dropdown.Menu>
                      <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                      <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
            ) : (<Menu.Item onClick={this.handleShowClick} position="right">
              <Icon name="sidebar"/>
            </Menu.Item>)}
          </Menu>

          <Sidebar
              as={Menu}
              animation='overlay'
              direction='top'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              style={navbarStyle}
              vertical
              visible={visible}
              width='thin'
          >
            {this.props.currentUser ? (
                [<Menu.Item as={NavLink} onClick={this.handleSidebarHide} activeClassName="active" exact to="/"
                            key='landing'>Home</Menu.Item>,
                  <Menu.Item as={NavLink} onClick={this.handleSidebarHide} activeClassName="active" exact to="/submit"
                             key='submit'>Submit</Menu.Item>,
                  <Menu.Item as={NavLink} onClick={this.handleSidebarHide} activeClassName="active" exact to="/feed"
                             key='add'>Feed</Menu.Item>,
                  <Menu.Item as={NavLink} onClick={this.handleSidebarHide} activeClassName="active" exact to="/map"
                             key='list'>Map</Menu.Item>,
                  <Menu.Item as={NavLink} onClick={this.handleSidebarHide} activeClassName="active" exact to="/signout"
                             key='signout'>Sign
                    Out</Menu.Item>]
            ) : ''}
          </Sidebar>
        </div>
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
