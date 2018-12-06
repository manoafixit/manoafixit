import React from 'react';
import { Responsive } from 'semantic-ui-react';
import FooterMobile from './footer/FooterMobile';
import FooterDesktop from './footer/FooterDesktop';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {

    return (
        <div>
          <Responsive {...Responsive.onlyMobile}>
            <FooterMobile/>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <FooterDesktop/>
          </Responsive>
        </div>
    );
  }
}

export default Footer;
