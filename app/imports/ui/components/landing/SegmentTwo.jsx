import React from 'react';
import { Grid, Header, Image, Divider } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class SegmentTwo extends React.Component {
  render() {
    return (
        <div className="landing-background2">
          <Grid textAlign='center' verticalalign='middle' container stackable>

            <Grid.Row>
              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Image size='medium' src="/images/submit.png" centered rounded/>
                <Header as='h1' inverted>Submit</Header>
                <Divider inverted/>
                <Header as='h3' inverted>
                  We built our app in mind to make it easy and simple for users to submit an issue with minimal effort.
                </Header>
              </Grid.Column>

              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Image size='medium' src="/images/feed.png" centered rounded/>
                <Header as='h1' inverted>Feed</Header>
                <Divider inverted/>
                <Header as='h3' inverted>
                  View in realtime all issues that have been submitted by other users, and filter specific issues
                  that you want to see.
                </Header>
              </Grid.Column>

              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Image size='medium' src="/images/issue.png" centered rounded/>
                <Header as='h1' inverted>Issues</Header>
                <Divider inverted/>
                <Header as='h3' inverted>Read the full details of an issue by clicking on any issue from
                  the Feed. Users can also like and comment on the issue.
                </Header>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </div>
    );
  }
}

export default SegmentTwo;
