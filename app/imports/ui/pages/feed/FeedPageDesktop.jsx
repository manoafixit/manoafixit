import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Header, Loader, Menu, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import FeedRow from '../../components/feed/FeedRow';
import SubmitButton from '../../components/feed/SubmitButton';
import SearchBar from '../../components/feed/SearchBar';
import SortBy from '../../components/feed/SortBy';
import FilterBy from '../../components/feed/FilterBy';
import { STATUS } from '../../../api/IssuesCollection/IssueStatuses';

class FeedPageDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 1,
      filter: 0,
    };
    this.onFilterOptionChange = this.onFilterOptionChange.bind(this);
    this.filterBy = this.filterBy.bind(this);
    this.onSortOptionChange = this.onSortOptionChange.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  onFilterOptionChange = (value) => {
    this.setState({ filter: value });
  }

  filterBy(issues) {
    switch (this.state.filter) {
      case 0:
        return issues;
      case 1:
        return _.filter(issues, (issue) => issue.status === `${STATUS.OPEN}`);
      case 2:
        return _.filter(issues, (issue) => issue.status === `${STATUS.ACKNOWLEDGED}`);
      case 3:
        return _.filter(issues, (issue) => issue.status === `${STATUS.ONGOING}`);
      case 4:
        return _.filter(issues, (issue) => issue.status === `${STATUS.RESOLVED}`);
      case 5:
        return _.filter(issues, (issue) => issue.status === `${STATUS.DUPLICATE}`);
      default:
        throw new Meteor.Error('Invalid status');
    }
  }

  onSortOptionChange = (value) => {
    this.setState({ sort: value });
  }

  sortBy() {
    let result = [];
    let filtered;
    switch (this.state.sort) {
      case 1:
        filtered = this.filterBy(this.props.issuesNewest);
        result = filtered.map((issue, index) => <FeedRow key={index} issue={issue}/>);
        break;
      case 2:
        filtered = this.filterBy(this.props.issuesOldest);
        result = filtered.map((issue, index) => <FeedRow key={index} issue={issue}/>);
        break;
      case 3:
        filtered = this.filterBy(this.props.issuesMostLiked);
        result = filtered.map((issue, index) => <FeedRow key={index} issue={issue}/>);
        break;
      case 4:
        filtered = this.filterBy(this.props.issuesLeastLiked);
        result = filtered.map((issue, index) => <FeedRow key={index} issue={issue}/>);
        break;
      default:
        throw new Meteor.Error('Error in switch() somehow');
    }
    return result;
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Issue Data</Loader>;
  }

  renderPage() {
    const wrapperStyle = {
      paddingTop: '20px',
      paddingBottom: '50px',
    };
    const menuHeaderStyle = {
      boxShadow: 'none',
      border: 'none',
    };

    return (
        <div className='wrapper' style={wrapperStyle}>
          <Container>
            <Menu borderless style={menuHeaderStyle}>
              <Menu.Item position='left'>
                <Header as="h1" textAlign="center">Feed</Header>
              </Menu.Item>
              <Menu.Item position='right'>
                <SubmitButton/>
              </Menu.Item>
            </Menu>

            <Menu borderless style={menuHeaderStyle}>
              <Menu.Item>
                <SearchBar issues={this.props.issues}/>
              </Menu.Item>
              <Menu.Item>
                <FilterBy onFilterOptionChange={this.onFilterOptionChange}/>
              </Menu.Item>
              <Menu.Item position='right'>
                <SortBy onSortOptionChange={this.onSortOptionChange}/>
              </Menu.Item>
            </Menu>

            <Table
                striped
                stackable
                fixed
                singleLine
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width='twelve'>Issue</Table.HeaderCell>
                  <Table.HeaderCell width='four'>Poster</Table.HeaderCell>
                  <Table.HeaderCell width='two'>Likes</Table.HeaderCell>
                  <Table.HeaderCell width='five'>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.sortBy()}
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

FeedPageDesktop.propTypes = {
  issues: PropTypes.array.isRequired,
  issuesNewest: PropTypes.array.isRequired,
  issuesOldest: PropTypes.array.isRequired,
  issuesMostLiked: PropTypes.array.isRequired,
  issuesLeastLiked: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  const sub2 = Meteor.subscribe('IssueRepliesCollection');
  return {
    issues: Issues.getCollectionDocuments(),
    issuesNewest: Issues.getCollectionDocuments({}, { sort: { createdAt: -1 } }),
    issuesOldest: Issues.getCollectionDocuments({}, { sort: { createdAt: 1 } }),
    issuesMostLiked: Issues.getCollectionDocuments({}, { sort: { likes: -1 } }),
    issuesLeastLiked: Issues.getCollectionDocuments({}, { sort: { likes: 1 } }),
    ready: sub.ready() && sub2.ready(),
  };
})(FeedPageDesktop);
