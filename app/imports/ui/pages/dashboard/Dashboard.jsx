import React from 'react';
import { Header, Loader, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { format } from 'date-fns';
import BarChart from '../../components/dashboard/BarChart';
import LineChart from '../../components/dashboard/LineChart';
import CalendarChart from '../../components/dashboard/CalendarChart';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';

class Dashboard extends React.Component {

  buildCalendarData() {
    const issues = this.props.issues;
    const output = [];
    _.forEach(issues, (issue) => {
      const date = issue.createdAt;
      const formatted_date = format(date, 'YYYY-MM-DD');

    });
    return output;
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    console.log(this.props.issues);
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
            <CalendarChart data={this.props.issues}/>
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

Dashboard.propTypes = {
  issues: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments({}),
    ready: sub.ready(),
  };
})(Dashboard);
