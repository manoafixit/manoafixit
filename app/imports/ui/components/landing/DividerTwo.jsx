import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class DividerTwo extends React.Component {
  render() {
    return (
        <div className="divider-background">
          <Grid textAlign='center' verticalAlign='center' container stackable>

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
                <Header as='h3' inverted>It can also display a map of the campus that shows the reported issues
                  based on urgency.
                </Header>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </div>
    );
  }
}

export default DividerTwo;
