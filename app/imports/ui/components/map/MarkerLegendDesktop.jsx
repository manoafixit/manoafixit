import React from 'react';
import { Image, Container, Menu } from 'semantic-ui-react';
import { STATUS } from '../../../api/IssuesCollection/IssueStatuses';

export default class MarkerLegendDesktop extends React.Component {
  render() {
    const wrapperStyle = {
      maxHeight: '30px',
      paddingBottom: '70px',
    };

    const imageStyle = {
      maxHeight: '30px',
    };

    return (
        <div style={wrapperStyle}>
            <Container textAlign='center'>
                <Menu compact borderless>
                  <Menu.Item>
                    <Image alt='Marker for Open Issue' src='/images/mapmarkers/MarkerOpen.svg' style={imageStyle}/>
                    {`${STATUS.OPEN} Issues`}
                  </Menu.Item>
                  <Menu.Item>
                    <Image alt='Marker for Acknowledged Issue' src='/images/mapmarkers/MarkerAckd.svg'
                           style={imageStyle}/>
                    {`${STATUS.ACKNOWLEDGED} Issues`}
                  </Menu.Item>
                  <Menu.Item>
                    <Image alt='Marker for Ongoing Issue' src='/images/mapmarkers/MarkerProg.svg' style={imageStyle}/>
                    {`${STATUS.ONGOING} Issues`}
                  </Menu.Item>
                </Menu>
            </Container>
        </div>
    );
  }
}
