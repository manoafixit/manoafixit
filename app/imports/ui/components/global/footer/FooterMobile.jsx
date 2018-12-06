import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** The FooterMobile appears at the bottom of every page. Rendered by the App Layout component. */
class FooterMobile extends React.Component {
  render() {
    const divStyle = { paddingTop: '25px', color: 'white' };
    const fontStyle = { color: '#fff' };

    return (
        <div className="footer-background2">
          <footer>
            <div style={divStyle} className="ui center aligned container">
              <Grid columns={8} centered divided stackable>
                <Grid.Row centered verticalAlign='middle'>
                  CHECK OUR GITHUB PAGES
                  <Icon style={{paddingLeft: '10px'}} name='github' size='large'/>
                </Grid.Row>

                <Grid.Row centered textAlign='center'>
                  <Grid.Column textAlign='center' verticalAlign='top'>
                    <a href='https://github.com/manoafixit/manoafixit' style={fontStyle}>
                      ManoaFixit
                    </a>
                    <br/>
                    <br/>
                    <a href='https://github.com/Au-Adrian'>
                      Adrian Au
                    </a>
                    <br/>
                    <br/>
                    <a href='https://github.com/gcalica'>
                      Gian Calica
                    </a>
                    <br/>
                    <br/>
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

export default FooterMobile;
