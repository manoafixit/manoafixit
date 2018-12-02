import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Header, Loader, Menu, Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import FeedRowMobile from '../../components/feed/FeedRowMobile';
import SubmitButton from '../../components/feed/SubmitButton';
import SearchBar from '../../components/feed/SearchBar';
import SortBy from '../../components/feed/SortBy';
import FilterBy from '../../components/feed/FilterBy';

class FeedPageMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 1,
      filter: 0,
    };
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
        result = filtered.map((issue, index) => <FeedRowMobile key={index} issue={issue}/>);
        break;
      case 2:
        filtered = this.filterBy(this.props.issuesOldest);
        result = filtered.map((issue, index) => <FeedRowMobile key={index} issue={issue}/>);
        break;
      case 3:
        filtered = this.filterBy(this.props.issuesMostLiked);
        result = filtered.map((issue, index) => <FeedRowMobile key={index} issue={issue}/>);
        break;
      case 4:
        filtered = this.filterBy(this.props.issuesLeastLiked);
        result = filtered.map((issue, index) => <FeedRowMobile key={index} issue={issue}/>);
        break;
      default:
        throw new Meteor.Error('Error in switch() somehow');
    }
    return result;
  }

  onFilterOptionChange = (value) => {
    this.setState({ filter: value });
  }

  filterBy(issues) {
    switch (this.state.filter) {
      case 0:
        return issues;
      case 1:
        return _.filter(issues, (issue) => issue.status === 'Open');
      case 2:
        return _.filter(issues, (issue) => issue.status === 'Acknowledged');
      case 3:
        return _.filter(issues, (issue) => issue.status === 'Ongoing');
      case 4:
        return _.filter(issues, (issue) => issue.status === 'Resolved');
      case 5:
        return _.filter(issues, (issue) => issue.status === 'Removed');
      default:
        throw new Meteor.Error('Invalid status');
    }
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

            <Grid>

              <Grid.Row textAlign='center'>
                <Grid.Column>
                  <Header as="h2" textAlign="center">Feed</Header>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Menu borderless style={menuHeaderStyle}>
                  <Menu.Item>
                    <SearchBar issues={this.props.issues}/>
                    <SubmitButton/>
                  </Menu.Item>
                </Menu>
              </Grid.Row>

              <Grid.Row>
                <Menu borderless fluid style={menuHeaderStyle}>
                  <Menu.Item>
                    <FilterBy onFilterOptionChange={this.onFilterOptionChange}/>
                  </Menu.Item>

                  <Menu.Item position='right'>
                    <SortBy onSortOptionChange={this.onSortOptionChange}/>
                  </Menu.Item>
                </Menu>
              </Grid.Row>
            </Grid>

            <Segment vertical>
              {this.sortBy()}
            </Segment>

          </Container>
        </div>
    );
  }
}

FeedPageMobile.propTypes = {
  issues: PropTypes.array.isRequired,
  issuesNewest: PropTypes.array.isRequired,
  issuesOldest: PropTypes.array.isRequired,
  issuesMostLiked: PropTypes.array.isRequired,
  issuesLeastLiked: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments(),
    issuesNewest: Issues.getCollectionDocuments({}, { sort: { createdAt: -1 } }),
    issuesOldest: Issues.getCollectionDocuments({}, { sort: { createdAt: 1 } }),
    issuesMostLiked: Issues.getCollectionDocuments({}, { sort: { likes: -1 } }),
    issuesLeastLiked: Issues.getCollectionDocuments({}, { sort: { likes: 1 } }),
    ready: sub.ready(),
  };
})(FeedPageMobile);
