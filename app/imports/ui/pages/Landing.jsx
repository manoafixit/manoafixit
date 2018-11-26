import React from 'react';
import { Grid, Image, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="landing-background">
          <Grid textAlign='center' verticalAlign='center' container stackable>
            <Grid.Row>
              <Grid.Column width={5} veritcalAlign='center' textAlign='center'>
                <Image size='large' src="/images/mfi-logo2.png"/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={14}>
                <Header as='h1' size='huge' inverted>Manoa Fix It!</Header>
                <Header as='h2' size='small' textAlign='left' inverted>Ever faced some staggering issues around campus? Ever
                  wanted
                  to help solve such issues but hesistate at the last moment because it is bothersome to contact the
                  higher-ups about it? Well fear no longer! ManoaFixIt is an application that makes it easier to report
                  problems around campus. It includes...</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Icon size='huge' name="exclamation circle" inverted/>
                <Header as='h1' inverted>Issues Feed</Header>
                <Header as='h3' inverted>This app shows the list of issues reported by UHM students..
                </Header>
              </Grid.Column>

              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Icon size='huge' name="feed" inverted/>
                <Header as='h1' inverted>Suggestions Feed</Header>
                <Header as='h3' inverted>This app shows the list of issues reported by UHM students.</Header>
              </Grid.Column>

              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Icon size='huge' name="map marker alternate" inverted/>
                <Header as='h1' inverted>Heat Map</Header>
                <Header as='h3' inverted>It can also display a map of the campus that shows the reported issues based on urgency.
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Landing;
