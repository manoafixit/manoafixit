import React from 'react';
import { Message } from 'semantic-ui-react';

export default class NotImplemented extends React.Component {
  render() {
    const style = {
      paddingTop: '10px',
    };

    return (
        <Message style={style} warning>
          This page has not yet been implemented for Mobile. You may notice parts of the page are not formatted
          properly. Currently using the Desktop version. Apologies for any inconvenience.
        </Message>
    );
  }
}
