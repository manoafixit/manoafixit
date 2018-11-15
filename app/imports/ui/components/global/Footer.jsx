import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', height: '250px', backgroundColor: '#27AE60'}

    return (
        <footer>
          <div style={divStyle} className="ui center aligned container" >

              FOLLOW US ON SOCIAL MEDIA <br />

            <Grid columns={3} divided>
              <Grid.Row>
              </Grid.Row>
              <Grid.Row >
                <Grid.Column>
                  <Icon name='instagram' size='huge' />
                </Grid.Column>
                <Grid.Column>
                  <Icon name='twitter' size='huge' />
                </Grid.Column>
                <Grid.Column>
                  <Icon name='facebook official' size='huge' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
