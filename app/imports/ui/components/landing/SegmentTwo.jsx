import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class SegmentTwo extends React.Component {
  render() {
    return (
        <div className="landing-background2">
          <Grid textAlign='center' verticalalign='middle' container stackable>

            <Grid.Row>
              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Image size='medium' src="/images/submit.png" centered rounded/>
                <Header as='h1' inverted>Submit Issues</Header>
                <Header as='h3' inverted>With this app, you can easily submit any issues you find around campus. You can
                  easily do it on desktop or on mobile!</Header>
              </Grid.Column>

              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Image size='medium' src="/images/feed.png" centered rounded/>
                <Header as='h1' inverted>Issues Feed</Header>
                <Header as='h3' inverted>Your submission will appear on a feed page which everybody can see. The more
                  awareness towards the issue, the quicker it will be fixed.
                </Header>
              </Grid.Column>

              <Grid.Column width={5} verticalAlign='top' textAlign='center'>
                <Image size='medium' src="/images/issue.png" centered rounded/>
                <Header as='h1' inverted>Issue Page</Header>
                <Header as='h3' inverted>By clicking on a certain issue on the feed, you will be redirected to a page
                  containing the issue's location and description. People can also comment on the issue in this page.
                </Header>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </div>
    );
  }
}

export default SegmentTwo;
