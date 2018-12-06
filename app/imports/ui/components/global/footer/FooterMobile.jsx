import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** The FooterMobile appears at the bottom of every page. Rendered by the App Layout component. */
class FooterMobile extends React.Component {
  render() {
    const divStyle = { paddingTop: '25px', color: 'white' };
    const fontStyle = { color: '#fff' };
    const iconStyle = { paddingLeft: '10px' };

    return (
        <div className="footer-background2">
          <footer>
            <div style={divStyle} className="ui center aligned container">
              <Grid columns={8} centered divided stackable>
                <Grid.Row centered verticalAlign='middle'>
                  <a href='https://manoafixit.github.io/' style={fontStyle}>
                    CHECK OUR GITHUB PAGES
                    <Icon style={iconStyle} name='github alternate' size='large'/>
                  </a>
                </Grid.Row>

                <Grid.Row centered textAlign='center'>
                  <Grid.Column textAlign='center' verticalAlign='top'>
                    <a href='https://github.com/manoafixit/manoafixit' style={fontStyle}>
                      ManoaFixit Repo <Icon style={iconStyle} name='github'/>
                    </a>
                    <br/>
                    <br/>
                    <a href='https://github.com/Au-Adrian' style={fontStyle}>
                      Adrian Au <Icon style={iconStyle} name='github'/>
                    </a>
                    <br/>
                    <br/>
                    <a href='https://github.com/gcalica' style={fontStyle}>
                      Gian Calica <Icon style={iconStyle} name='github'/>
                    </a>
                    <br/>
                    <br/>
                    <a href='https://github.com/gbfrancisco' style={fontStyle}>
                      Graham Francisco <Icon style={iconStyle} name='github'/>
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
