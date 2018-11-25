import React from 'react';
import { Responsive } from 'semantic-ui-react';
import WarningModalDesktop from './WarningModalDesktop';
import WarningModalMobile from './WarningModalMobile';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
export default class WarningModal extends React.Component {
  render() {
    return (
        <div>
          <Responsive {...Responsive.onlyMobile}>
            <WarningModalMobile/>
          </Responsive>
          <Responsive minWidth={Responsive.onlyComputer.minWidth}>
            <WarningModalDesktop/>
          </Responsive>
        </div>
    );
  }
}
