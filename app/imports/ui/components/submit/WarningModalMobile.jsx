import React, { Component } from 'react';
import { Button, Modal, Segment, Header, Icon, List } from 'semantic-ui-react';

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
          <div style={{ paddingTop: '10px' }}>
            <Header>
              Warning: You have blocked permission to access your Location
            </Header>
            <p>
              In order to submit an issue, you must give permission to our web app to access your Location.
              You must reset your Location Access permission settings for your browser and refresh the page
              in order to submit an issue.
            </p>
          </div>

          <br/>
          <Header as='h2'>How to reset Location Tracking permission settings (Mobile/Tablet): </Header>
          <Segment.Group raised>
            <Segment>
              <Header as='h2'> <Icon name='chrome'/> Google Chrome </Header>
              <Header as='h5'> iOS </Header>
              <List bulleted>
                <List.Item>
                  Tap on the &apos;Settings&apos; application on your device
                </List.Item>

                <List.Item>
                  Tap on &apos;Privacy&apos;
                </List.Item>
                <List.Item>
                  Make sure &apos;Location Services&apos; is enabled
                </List.Item>
                <List.Item>
                  Go back to &apos;Settings&apos;
                </List.Item>
                <List.Item>
                  Tap on &apos;Chrome&apos;
                </List.Item>
                <List.Item>
                  Tap on &apos;Location&apos;
                </List.Item>
                <List.Item>
                  In Allow Location Access, make sure &lsquo;While Using the App&rsquo; is selected
                </List.Item>
                <List.Item>
                  Refresh the Manoafixit page, and make sure you select &lsquo;OK&rsquo; so that you can
                  begin using our app
                </List.Item>
              </List>
              <Header as='h5'> Android </Header>
              <List bulleted>
                <List.Item>
                  Click on <Icon name='ellipsis vertical'/> icon on the top right of your browser.
                </List.Item>
                <List.Item>
                  Click on Settings
                </List.Item>
                <List.Item> Click on Site Settings </List.Item>
                <List.Item> Click on <Icon
                    name='map marker alternate'/> Location.
                </List.Item>
                <List.Item>
                  On the Blocked list, click on manoafixit.meteorapp.com and then click on Location Access. Then
                  click Allow to give permission for our app to track your Location.
                </List.Item>
              </List>
            </Segment>

            <Segment>
              <Header as='h2'> <Icon name='safari'/> Safari </Header>
              <Header as='h5'> iOS </Header>
              <List bulleted>
                <List.Item>
                  Refresh the page, and make sure you click on &lsquo;OK&rsquo; so that you can begin using our app
                </List.Item>
              </List>
            </Segment>

            <Segment>
              <Header as='h2'> <Icon name='firefox'/> Mozilla Firefox </Header>
              <Header as='h5'> iOS </Header>
              <List bulleted>
                <List.Item>
                  Tap on the &apos;Settings&apos; application on your device
                </List.Item>
                <List.Item>
                  Tap on &apos;Privacy&apos;
                </List.Item>
                <List.Item>
                  Make sure &apos;Location Services&apos; is enabled
                </List.Item>
                <List.Item>
                  Go back to &apos;Settings&apos;
                </List.Item>
                <List.Item>
                  Tap on &apos;Firefox&apos;
                </List.Item>
                <List.Item>
                  Tap on &apos;Location&apos;
                </List.Item>
                <List.Item>
                  In Allow Location Access, make sure &lsquo;While Using the App&rsquo; is selected
                </List.Item>
                <List.Item>
                  Refresh the Manoafixit page, and make sure you select &lsquo;OK&rsquo; so that you can
                  begin using our app
                </List.Item>
              </List>
              <Header as='h5'> Android </Header>
              <List bulleted>
                <List.Item>
                  Click on <Icon name='ellipsis vertical'/> icon on the top right of your browser
                </List.Item>
                <List.Item>
                  Click on Settings
                </List.Item>
                <List.Item>
                  Click on Clear Private Data
                </List.Item>
                <List.Item>
                  Check Site settings, and click CLEAR DATA
                </List.Item>
              </List>
            </Segment>
            <Segment>
              <Header as='h4'> If you reset your Location Tracking permission but the popup to allow
                Location Track isn&apos;t showing, then you need to clear your browser&apos;s cookies first.</Header>
            </Segment>
          </Segment.Group>
          <Modal
              open={open}
              closeOnEscape={false}
              closeOnDimmerClick={false}
              dimmer='blurring'
              onClose={this.close}
          >
            <Modal.Header> Warning: You must give permission to access your Location </Modal.Header>
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
