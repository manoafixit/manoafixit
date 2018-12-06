import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** The FooterDesktop appears at the bottom of every page. Rendered by the App Layout component. */
class FooterDesktop extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white' };

    return (
        <div className="footer-background">
          <footer>
            <div style={divStyle} className="ui center aligned container">
              <Grid columns={8} centered divided stackable>
                <Grid.Row centered verticalAlign='middle'>
                  CHECK OUR GITHUB PAGES
                  <Icon style={{paddingLeft: '10px'}} name='github' size='large'/>
                </Grid.Row>

                <Grid.Row centered textAlign='center'>
                  <Grid.Column textAlign='center'>
                    <a href='https://github.com/manoafixit/manoafixit'>
                      ManoaFixIt
                    </a>
                  </Grid.Column>

                  <Grid.Column textAlign='center'>
                    <a href='https://github.com/Au-Adrian'>
                      Adrian Au
                    </a>
                  </Grid.Column>

                  <Grid.Column textAlign='center'>
                    <a href='https://github.com/gcalica'>
                      Gian Calica
                    </a>
                  </Grid.Column>

                  <Grid.Column textAlign='center'>
                    <a href='https://github.com/gbfrancisco'>
                      Graham Francisco
                    </a>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </footer>
        </div>
    );
  }
}

export default FooterDesktop;
