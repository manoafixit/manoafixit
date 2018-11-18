import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Responsive } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import NavBarDesktop from '../../components/global/responsive/NavBarDesktop';
import NavBarMobile from '../../components/global/responsive/NavBarMobile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
export default class NavBar extends React.Component {
  render() {
    return (
        <div>
          <Responsive {...Responsive.onlyMobile}>
            <NavBarMobile/>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <NavBarDesktop/>
          </Responsive>
        </div>
    );
  }
}