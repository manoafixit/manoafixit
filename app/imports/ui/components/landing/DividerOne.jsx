import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class DividerOne extends React.Component {
  render() {
    return (
        <div className="divider-background">
          <Grid textAlign='center' verticalAlign='center' container stackable>

            <Grid.Row>
              <Grid.Column width={14}>
                <Header as='h1' style={{ fontSize: '40px' }} inverted>Manoa Fix It!</Header>
                <Header as='h2' style={{ fontSize: '20px' }} textAlign='center' inverted>Ever faced some staggering
                  issues around campus? Ever wanted to help solve such issues but hesitate at the last moment
                  because it is bothersome to contact the higher-ups about it? Well fear no longer! ManoaFixIt
                  is an application that makes it easier to report problems around campus. It includes...</Header>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </div>
    );
  }
}

export default DividerOne;
