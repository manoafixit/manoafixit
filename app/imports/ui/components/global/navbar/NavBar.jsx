import React from 'react';
import { Responsive } from 'semantic-ui-react';
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';

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
