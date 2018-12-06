import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** The FooterDesktop appears at the bottom of every page. Rendered by the App Layout component. */
class FooterDesktop extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white' };
    const fontStyle = { color: '#fff' };
    const iconStyle = { paddingLeft: '10px' };

    return (
        <div className="footer-background">
          <footer>
            <div style={divStyle} className="ui center aligned container">
              <Grid columns={7} centered divided stackable>
                <Grid.Row centered verticalAlign='middle'>
                  <a href='https://manoafixit.github.io/' style={fontStyle}>
                    CHECK OUR GITHUB PAGES
                    <Icon style={iconStyle} name='github alternate' size='large'/>
                  </a>
                </Grid.Row>

                <Grid.Row centered textAlign='center'>
                  <Grid.Column textAlign='center'>
                    <a href='https://github.com/manoafixit/manoafixit' style={fontStyle}>
                      ManoaFixIt Repo <Icon style={iconStyle} name='github'/>
                    </a>
                  </Grid.Column>

                  <Grid.Column textAlign='center'>
                    <a href='https://github.com/Au-Adrian' style={fontStyle}>
                      Adrian Au
                      <Icon style={iconStyle} name='github'/>
                    </a>
                  </Grid.Column>

                  <Grid.Column textAlign='center'>
                    <a href='https://github.com/gcalica' style={fontStyle}>
                      Gian Calica
                      <Icon style={iconStyle} name='github'/>
                    </a>
                  </Grid.Column>

                  <Grid.Column textAlign='center'>
                    <a href='https://github.com/gbfrancisco' style={fontStyle}>
                      Graham Francisco
                      <Icon style={iconStyle} name='github'/>
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
