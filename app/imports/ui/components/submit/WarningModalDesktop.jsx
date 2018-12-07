import React, { Component } from 'react';
import { Button, Modal, Segment, Container, Header, Icon, List } from 'semantic-ui-react';

export default class WarningModalDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.close = this.close.bind(this);
  }

  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;

    return (
        <div>
          <Container>
            <Header>
              Warning: You have blocked permission to access your Location
            </Header>
            <Segment.Group>
              <Segment>
                In order to submit an issue, you must give permission to our web app to access your Location.
                You must reset your Location Tracking permission settings for your browser and refresh the page
                in order to submit an issue.
                <br/>
                <Header as='h1'>How to reset Location Tracking permission settings (Desktop): </Header>
              </Segment>
              <Segment.Group raised>
                <Segment>
                  <Header as='h2'> <Icon name='chrome'/> Google Chrome </Header>
                  <List bulleted>
                    <List.Item>
                      Click on the <Icon name='crosshairs'/> icon in your browser, which is located to the right of
                      your URL address bar.
                    </List.Item>
                    <List.Item>
                      Click on the text that says &lsquo;Clear these settings for future visits&rsquo;.
                    </List.Item>
                    <List.Item>
                      Refresh the page. When you are asked for permission to track your location again,
                      make sure you select &lsquo;Allow&rsquo; this time.
                    </List.Item>
                  </List>
                </Segment>
                <Segment>
                  <Header as='h2'> <Icon name='safari'/> Safari </Header>
                  <List bulleted>
                    <List.Item>
                      In the top panel, click on &lsquo;Safari&rsquo;.
                    </List.Item>
                    <List.Item>
                      Click on &lsquo;Preferences&rsquo;.
                    </List.Item>
                    <List.Item>
                      Click on &lsquo;Websites&rsquo;.
                    </List.Item>
                    <List.Item>
                      Click on &lsquo;Location&rsquo;.
                    </List.Item>
                    <List.Item>
                      Select &lsquo;Allow&rsquo; in the section where it says &lsquo;manoafixit.meteorapp.com&rsquo;.
                    </List.Item>
                    <List.Item>
                      Refresh the page.
                    </List.Item>
                  </List>
                </Segment>
                <Segment>
                  <Header as='h2'> <Icon name='firefox'/> Mozilla Firefox </Header>
                  <List bulleted>
                    <List.Item>
                      Click on the <Icon name='location arrow'/> icon, which should be located to the left of your URL
                      address bar.
                    </List.Item>
                    <List.Item>
                      Click on the <Icon name='x'/> icon in the section where it says &lsquo;Access your
                      location&rsquo; and &lsquo;Blocked&rsquo;
                    </List.Item>
                    <List.Item>
                      Refresh the page. When you are asked for permission to track your location again,
                      make sure you select &lsquo;Allow&rsquo; this time.
                    </List.Item>
                  </List>
                </Segment>
                <Segment>
                  <Header as='h4'> If you resetted your Location Tracking permission but the popup to allow
                    Location Track isnt showing, then you need to clear your browsers cookies first.</Header>
                </Segment>
              </Segment.Group>
            </Segment.Group>
          </Container>
          <Modal
              open={open}
              closeOnEscape={false}
              closeOnDimmerClick={false}
              dimmer='blurring'
              onClose={this.close}
          >
            <Modal.Header>Warning: You must give permission to access your Location</Modal.Header>
            <Modal.Content>
              In order to submit an issue, you must give permission to our web app to access your Location.
              Please allow our app to access your location if there is a popup asking. Otherwise, you must reset
              your Location Access permission settings and refresh this page to submit an issue.
            </Modal.Content>
            <Modal.Actions>
              <Button
                  onClick={this.close}
                  positive
                  labelPosition='right'
                  icon='checkmark'
                  content='Got It'
              />
            </Modal.Actions>
          </Modal>
        </div>
    );
  }
}
