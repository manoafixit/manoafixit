import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white' }

    return (
        <div className="footer-background">
          <footer>
            <div style={divStyle} className="ui center aligned container">
              <Grid columns={8} divided centered>
                <Grid.Row centered>
                  FOLLOW US ON SOCIAL MEDIA
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign='center'>
                    <Icon name='instagram' size='large'/>
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Icon name='twitter' size='large'/>
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Icon name='facebook official' size='large'/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </footer>
        </div>
    );
  }
}

export default Footer;
