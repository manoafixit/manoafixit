import React, { Component } from 'react';
import { Button, Modal, Segment, Container, Header, Icon, List } from 'semantic-ui-react';

export default class WarningModalDesktop extends Component {
  state = {
    open: true,
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
                      Click on the <Icon name='crosshairs'/> icon in your browser,
                      It is located to the right of the url address bar
                    </List.Item>
                    <List.Item>
                      Click on where it says &lsquo;clear these settings for future visits&rsquo;
                      It should be in blue text
                    </List.Item>
                    <List.Item>
                      Refresh the page, and when our application asks for permission to use your location,
                      make sure you select &lsquo;Allow&rsquo;, so that you can begin using our app
                    </List.Item>
                  </List>
                </Segment>
                <Segment>
                  <Header as='h2'> <Icon name='safari'/> Safari </Header>
                  <List bulleted>
                    <List.Item>
                      In the top panel, click on &lsquo;Safari&rsquo;
                    </List.Item>
                    <List.Item>
                      Click on &lsquo;Preferences&rsquo;
                    </List.Item>
                      <List.Item>
                        Click on &lsquo;Websites&rsquo;
                      </List.Item>
                          <List.Item>
                            Click on &lsquo;Location&rsquo;
                          </List.Item>
                              <List.Item>
                                Where it says  &lsquo;Manoafixit.meteorapp.com&rsquo; select allow
                              </List.Item>
                                  <List.Item>
                                    Refresh the page, so you can begin using our app
                                  </List.Item>
                  </List>
                </Segment>
                <Segment>
                  <Header as='h2'> <Icon name='firefox'/> Mozilla Firefox </Header>
                  <List bulleted>
                    <List.Item>
                      Click on the <Icon name='location arrow'/> icon, it is located
                      to the left of your url address bar
                    </List.Item>
                    <List.Item>
                      Where it says &lsquo;Access your location&rsquo; and &lsquo;Blocked&rsquo;
                      click on the <Icon name='x'/> icon
                    </List.Item>
                    <List.Item>
                      Refresh the page, when our application asks for permission to use your location,
                      make sure you select &lsquo;Allow location access&rsquo; so that you can begin using our app
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
