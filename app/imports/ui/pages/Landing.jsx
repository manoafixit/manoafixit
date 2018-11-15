import React from 'react';
import { Grid, Image, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' verticalAlign='center' container stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image size='small' circular src="/images/wrench.jpg"/>
            </Grid.Column>

            <Grid.Column width={8}>
              <Header as='h1' size='huge'>Manoa Fix It!</Header>
              <Header as='h2' size='small' textAlign='left'>Ever faced some staggering issues around campus? Ever wanted to help solve such issues but hesistate at the last moment because it's bothersome to contact the higher-ups about it? Well fear no longer! ManoaFixIt is an application that makes it easier to report problems around campus. It includes...</Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5} verticalAlign='top' textAlign='center'>
              <Icon size='huge' name="exclamation circle"/>
              <Header as='h1'>Issues Feed</Header>
              <Header as='h3'>This app shows the list of issues reported by UHM students..
              </Header>
            </Grid.Column>

            <Grid.Column width={5} verticalAlign='top' textAlign='center'>
              <Icon size='huge' name="feed"/>
              <Header as='h1'>Suggestions Feed</Header>
              <Header as='h3'>This app shows the list of issues reported by UHM students.</Header>
            </Grid.Column>

            <Grid.Column width={5} verticalAlign='top' textAlign='center'>
              <Icon size='huge' name="map marker alternate"/>
              <Header as='h1'>Heat Map</Header>
              <Header as='h3'>It can also display a map of the campus that shows the reported issues based on urgency.
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default Landing;
