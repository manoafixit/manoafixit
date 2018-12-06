import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class DividerOne extends React.Component {
  render() {
    return (
        <div className="divider-background">
          <Grid textAlign='center' verticalAlign='middle' container stackable>

            <Grid.Row>
              <Grid.Column width={14}>
                <Header as='h1' style={{ fontSize: '40px' }} inverted>Manoa Fix It!</Header>
                <Header as='h2' style={{ fontSize: '20px' }} textAlign='center' inverted>
                  <p>Currently, University of Hawaii at Manoa does not have a quick and modern way to report any
                    non-security related issues that students encounter on campus. ManoaFixIt is a web app
                    that solves this problem by allowing any UHM community member to be able to report
                    any issues they encounter on the spot.</p>

                  <br/>

                  <p>Our application was designed to be mobile in mind, allowing users to be able to submit issues
                    as they walk around campus.</p>
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row only='tablet computer'>
                <Icon inverted name='mobile alternate' size='massive'/>
                <Header as='h1' inverted content='MOBILE FRIENDLY' style={{ paddingTop: '20px' }}/>

                <Icon inverted name='thumbs up outline' size='massive' style={{ paddingLeft: '20px' }}/>
                <Header as='h1' inverted content='EASY TO USE' style={{ paddingTop: '20px' }}/>
            </Grid.Row>

            <Grid.Column only='mobile'>
              <Icon inverted name='mobile alternate' size='massive'/>
              <Header as='h1' inverted content='MOBILE FRIENDLY' style={{ paddingTop: '20px' }}/>

              <Icon inverted name='thumbs up outline' size='massive' style={{ paddingLeft: '20px' }}/>
              <Header as='h1' inverted content='EASY TO USE' style={{ paddingTop: '20px' }}/>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default DividerOne;
