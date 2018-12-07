import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BarChart from '../../components/dashboard/BarChart';
import LineChart from '../../components/dashboard/LineChart';
import CalendarChart from '../../components/dashboard/CalendarChart';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';

class Dashboard extends React.Component {
  render() {
    const divStyle = {
      height: '550px',
    };
    const wrapperStyle = {
      paddingTop: '20px',
      paddingBottom: '50px',
    };

    return (
        <div className="ui center aligned container" style={wrapperStyle}>
          <Header as="h1" textAlign="center">Dashboard</Header>
          <Segment style={divStyle}>
            <CalendarChart/>
          </Segment>
          <Segment style={divStyle}>
            <BarChart/>
          </Segment>
          <Segment style={divStyle}>
            <LineChart/>
          </Segment>
        </div>
    );
  }
}

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments({}),
    ready: sub.ready(),
  };
})(Dashboard);
