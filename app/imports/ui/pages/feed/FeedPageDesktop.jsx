import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Loader, Menu, Table, Dropdown, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Issues } from '../../../api/IssuesCollection/IssuesCollection';
import FeedRow from '../../components/feed/FeedRow';
import SubmitButton from '../../components/feed/SubmitButton';

const fakeData = [];

class FeedPageDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        isLoading: false,
      },
      sort: 1,
      filter: 0,
    };
  }

  // ---Search Bar Start--- //

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

// eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(fakeData, isMatch),
      });
    }, 300);
  }

  // ---Search Bar End--- //

  handleSortChange = (e, { value }) => this.setState({ sort: value });

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

  handleFilterChange = (e, { value }) => this.setState({ filter: value });

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

    const { isLoading } = this.state;

    const sortOptions = [
      { key: 1, text: 'Newest', value: 1 },
      { key: 2, text: 'Oldest', value: 2 },
      { key: 3, text: 'Most Liked', value: 3 },
      { key: 4, text: 'Least Liked', value: 4 },
    ];

    const filterOptions = [
      { key: 0, text: 'All Issues', value: 0 },
      { key: 1, text: 'Open Issues', value: 1 },
      { key: 2, text: 'Acknowledged Issues', value: 2 },
      { key: 3, text: 'Ongoing Issues', value: 3 },
      { key: 4, text: 'Resolved Issues', value: 4 },
      { key: 5, text: 'Removed Issues', value: 5 },
    ];

    return (
        <div className='wrapper' style={wrapperStyle}>
          <Container>
            <Menu borderless style={menuHeaderStyle}>
              <Menu.Item position='right'>
                <SubmitButton/>
              </Menu.Item>
            </Menu>

            <Menu borderless style={menuHeaderStyle}>
              <Menu.Item>
                <Search
                    loading={isLoading}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                />
              </Menu.Item>
              <Menu.Item>
                <Dropdown
                    placeholder='Filter Issues'
                    options={filterOptions}
                    onChange={this.handleFilterChange}
                />
              </Menu.Item>
              <Menu.Item position='right'>
                <Dropdown
                    placeholder='Sort By'
                    options={sortOptions}
                    onChange={this.handleSortChange}
                />
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
  issuesNewest: PropTypes.array.isRequired,
  issuesOldest: PropTypes.array.isRequired,
  issuesMostLiked: PropTypes.array.isRequired,
  issuesLeastLiked: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issuesNewest: Issues.getCollectionDocuments({}, { sort: { createdAt: -1 } }),
    issuesOldest: Issues.getCollectionDocuments({}, { sort: { createdAt: 1 } }),
    issuesMostLiked: Issues.getCollectionDocuments({}, { sort: { likes: -1 } }),
    issuesLeastLiked: Issues.getCollectionDocuments({}, { sort: { likes: 1 } }),
    ready: sub.ready(),
  };
})(FeedPageDesktop);
