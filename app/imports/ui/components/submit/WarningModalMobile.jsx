import React, { Component } from 'react';
import { Button, Modal, Segment, Header, Icon, List } from 'semantic-ui-react';

export default class WarningModalDesktop extends Component {
  state = {
    open: true,
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
              Instructions for iOS.
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
              Instructions for iOS.
            </Segment>

            <Segment>
              <Header as='h2'> <Icon name='firefox'/> Mozilla Firefox </Header>
              <Header as='h5'> iOS </Header>
              Instructions for iOS.
              <Header as='h5'> Android </Header>
              <List bulleted>
                <List.Item>
                  Click on <Icon name='ellipsis vertical'/> icon on the top right of your browser.
                </List.Item>
                <List.Item>
                  Click on Settings
                </List.Item>
                <List.Item>
                  Click on Clear Private Data
                </List.Item>
                <List.Item>
                  Check Site settings, and click CLEAR DATA.
                </List.Item>
              </List>
            </Segment>
            <Segment>
              <Header as='h4'> If you reset your Location Tracking permission but the popup to allow
                Location Track isn't showing, then you need to clear your browsers cookies first.</Header>
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
