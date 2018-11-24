import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Menu, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import IssueDesktop from '../../components/feed/responsive/IssueDesktop';
import SubmitButton from '../../components/feed/SubmitButton';

class FeedPageDesktop extends React.Component {
  render() {
    const wrapperStyle = {
      paddingTop: '20px',
    };

    const menuHeaderStyle = {
      boxShadow: 'none',
      border: 'none',
    };

    return (
        <div className='wrapper' style={wrapperStyle}>
          <Container>
            <Menu borderless style={menuHeaderStyle}>
              <Menu.Item position='right'>
                <SubmitButton/>
              </Menu.Item>
            </Menu>
            <Table striped>
              <Table.Body>
                  {this.props.issues.map((issue, index) => <IssueDesktop key={index} issue={issue}/>)}
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

FeedPageDesktop.propTypes = {
  issues: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments(),
    ready: sub.ready(),
  };
})(FeedPageDesktop);
